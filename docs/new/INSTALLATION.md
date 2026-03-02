# Installation Guide

## Requirements

- **Node.js** ≥ 22
- **npm**, **pnpm**, or **bun**
- **Git**

## Install from npm (Recommended)

```bash
npm install -g agentme@latest
```

Or with pnpm:

```bash
pnpm add -g agentme@latest
```

## Install from Source

```bash
git clone https://github.com/Agentme-AI/Server.git
cd Server

# Install dependencies
pnpm install

# Build the UI
pnpm ui:build

# Build the server
pnpm build

# Run onboarding
pnpm agentme onboard --install-daemon
```

## Platform-Specific Installation

### macOS

```bash
# Install via Homebrew (optional)
brew install node

# Install AgentMe
npm install -g agentme@latest

# Run onboarding
agentme onboard --install-daemon
```

The daemon will be installed as a launchd service.

### Linux

```bash
# Run the install script
curl -fsSL https://raw.githubusercontent.com/Agentme-AI/Server/main/scripts/install-agentme-linux.sh | bash
```

Or manually:

```bash
npm install -g agentme@latest
agentme onboard --install-daemon
```

The daemon will be installed as a systemd user service.

### Raspberry Pi

```bash
# Run the Pi-specific install script
curl -fsSL https://raw.githubusercontent.com/Agentme-AI/Server/main/scripts/install-agentme-pi.sh | bash
```

### Docker

```bash
docker run -p 18789:18789 \
  -v ~/.agentme:/root/.agentme \
  -e OPENAI_API_KEY=your_key \
  agentme/server:latest
```

## Verify Installation

```bash
agentme --version
agentme doctor
```

## Update AgentMe

```bash
npm update -g agentme@latest
# or
agentme update
```

## Uninstall

```bash
npm uninstall -g agentme
```
