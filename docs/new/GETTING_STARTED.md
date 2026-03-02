# Getting Started with AgentMe

Welcome to AgentMe! This guide will help you set up your personal AI assistant server.

## What is AgentMe?

AgentMe is a multi-channel AI gateway that lets you run autonomous AI agents across various messaging platforms including WhatsApp, Telegram, WebChat, and more.

## Quick Start

### 1. Install AgentMe

```bash
npm install -g agentme@latest
```

### 2. Run the Onboarding Wizard

```bash
agentme onboard --install-daemon
```

The wizard will guide you through:

- Setting up the gateway
- Configuring your workspace
- Connecting channels
- Setting up AI model providers

### 3. Start the Gateway

```bash
agentme gateway --port 18789
```

### 4. Access the Web UI

Open your browser and navigate to: `http://localhost:18789`

## Next Steps

- [Installation Guide](./INSTALLATION.md) - Detailed installation options
- [Configuration Guide](./CONFIGURATION.md) - Configure channels and models
- [Channels Guide](./CHANNELS.md) - Set up messaging channels
- [Tools Guide](./TOOLS.md) - Extend with skills and tools

## Need Help?

- Check the [FAQ](#) for common questions
- Visit our [GitHub Discussions](https://github.com/Agentme-AI/Server/discussions)
