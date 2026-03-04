$ErrorActionPreference = 'Stop'

# One-shot Windows installer (PowerShell) for AgentMe from source.
# - Installs Node 22 (winget/choco fallback)
# - Installs pnpm
# - Clones/updates repo
# - Builds and links CLI
# - Writes secure local gateway config with generated token

$RepoUrl = $env:AGENTME_REPO_URL
if ([string]::IsNullOrWhiteSpace($RepoUrl)) { $RepoUrl = 'https://github.com/Agentme-AI/Server.git' }
$RepoDir = $env:AGENTME_REPO_DIR
if ([string]::IsNullOrWhiteSpace($RepoDir)) { $RepoDir = Join-Path $HOME 'agent-me-server' }
$Port = $env:AGENTME_PORT
if ([string]::IsNullOrWhiteSpace($Port)) { $Port = '18789' }

function Has-Cmd($name) {
  return $null -ne (Get-Command $name -ErrorAction SilentlyContinue)
}

function Ensure-Node22 {
  $needsInstall = $true
  if (Has-Cmd 'node') {
    $major = [int]((node -v).TrimStart('v').Split('.')[0])
    if ($major -ge 22) { $needsInstall = $false }
  }

  if (-not $needsInstall) { return }

  if (Has-Cmd 'winget') {
    winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements --silent | Out-Null
  } elseif (Has-Cmd 'choco') {
    choco install nodejs-lts -y | Out-Null
  } else {
    throw 'Install Node.js 22+ first (winget/choco unavailable)'
  }
}

Ensure-Node22
npm install -g pnpm@10 | Out-Null

if (-not (Test-Path (Join-Path $RepoDir '.git'))) {
  git clone $RepoUrl $RepoDir
} else {
  git -C $RepoDir fetch --all --prune
  git -C $RepoDir checkout main
  git -C $RepoDir pull --ff-only
}

Set-Location $RepoDir
pnpm install
pnpm ui:build
pnpm build
pnpm link --global

$token = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Maximum 256 })) .ToLower()
$agentmeHome = Join-Path $HOME '.agentme'
$credentialsDir = Join-Path $agentmeHome 'credentials'
$configPath = Join-Path $agentmeHome 'agentme.json'

New-Item -ItemType Directory -Path $credentialsDir -Force | Out-Null

$config = @{
  gateway = @{
    mode = 'local'
    port = [int]$Port
    bind = 'loopback'
    auth = @{ mode = 'token'; token = $token }
    remote = @{ token = $token }
    trustedProxies = @('127.0.0.1', '::1', 'localhost')
    controlUi = @{ root = (Join-Path $RepoDir 'dist/control-ui') }
  }
} | ConvertTo-Json -Depth 10

Set-Content -Path $configPath -Value $config -Encoding UTF8

agentme gateway install
agentme gateway start
agentme gateway probe

Write-Host "✅ AgentMe installed"
Write-Host "Repo: $RepoDir"
Write-Host "Dashboard: http://127.0.0.1:$Port/"
Write-Host "Token: $token"
