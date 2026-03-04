#!/usr/bin/env bash
set -euo pipefail

# Cross-platform launcher for first-time AgentMe install from source repo.
# Supports: macOS, Linux (incl. WSL), Raspberry Pi OS.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

case "$(uname -s)" in
  Darwin)
    exec "$SCRIPT_DIR/install-agentme-macos.sh" "$@"
    ;;
  Linux)
    # Prefer dedicated Pi bootstrap when on Raspberry Pi hardware/OS
    if grep -qiE 'raspberry pi|raspbian' /proc/cpuinfo /etc/os-release 2>/dev/null; then
      exec "$SCRIPT_DIR/install-agentme-pi.sh" "$@"
    fi
    exec "$SCRIPT_DIR/install-agentme-linux.sh" "$@"
    ;;
  *)
    echo "Unsupported OS: $(uname -s)" >&2
    echo "Use Linux/macOS installer scripts directly, or on Windows use: scripts/install-agentme.ps1" >&2
    exit 1
    ;;
esac
