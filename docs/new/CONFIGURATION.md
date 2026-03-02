# Configuration Guide

## Environment Variables

Create a `.env` file in your project root:

```env
# Required: AI Model Provider
OPENAI_API_KEY=sk-your-openai-key

# Optional: Alternative Providers
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-key

# Optional: Channel Tokens
TELEGRAM_BOT_TOKEN=your-telegram-token
WHATSAPP_API_KEY=your-whatsapp-key

# Server Configuration
PORT=18789
HOST=0.0.0.0
```

## Configuration Wizard

Run the interactive configuration wizard:

```bash
agentme onboard
```

## Manual Configuration

Edit the configuration file at `~/.agentme/config.json`:

```json
{
  "agents": {
    "defaults": {
      "model": "gpt-4o"
    },
    "list": [
      {
        "id": "main",
        "name": "Main Agent",
        "workspace": "./workspace/main"
      }
    ]
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "${TELEGRAM_BOT_TOKEN}"
    }
  }
}
```

## Web UI Configuration

Access the configuration editor at `http://localhost:18789`:

1. Navigate to **Settings** → **Config**
2. Edit configuration values
3. Click **Save** to apply changes

## Agent Identity

Configure agent identity in `IDENTITY.md` within each agent's workspace:

```markdown
# Agent Identity

- Name: My Assistant
- Emoji: 🤖
- Avatar: https://example.com/avatar.png
```

## Model Configuration

Configure AI models per agent:

```bash
# Set default model for an agent
agentme config set agents.list[0].model gpt-4o

# Configure model parameters
agentme config set agents.defaults.temperature 0.7
```

## Security

- Keep your `.env` file secure and never commit it
- Use strong API keys
- Enable authentication for production deployments
- Review the [Security Guide](../security/THREAT-MODEL.md)
