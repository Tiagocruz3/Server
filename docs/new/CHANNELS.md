# Channels Guide

AgentMe supports multiple messaging channels for your AI agents.

## Supported Channels

### Telegram

1. Create a bot with [@BotFather](https://t.me/botfather)
2. Copy the bot token
3. Configure in AgentMe:

```bash
agentme config set channels.telegram.enabled true
agentme config set channels.telegram.botToken "your-bot-token"
```

Or via Web UI:

1. Go to **Channels**
2. Click **Add Telegram**
3. Enter bot token

### WhatsApp

WhatsApp Business API integration:

1. Set up WhatsApp Business account
2. Get API credentials from Meta Developer Portal
3. Configure webhook URL
4. Add credentials to AgentMe config

### WebChat

Built-in web chat widget:

1. Enable in config:

```json
{
  "channels": {
    "webchat": {
      "enabled": true,
      "port": 18790
    }
  }
}
```

2. Embed on your website:

```html
<script src="http://localhost:18790/widget.js"></script>
```

### Slack

1. Create a Slack app at [api.slack.com](https://api.slack.com)
2. Add Bot Token Scopes: `chat:write`, `im:history`
3. Install app to workspace
4. Copy Bot User OAuth Token
5. Configure in AgentMe

### Discord

1. Create a Discord bot at [Discord Developer Portal](https://discord.com/developers/applications)
2. Copy the bot token
3. Enable Message Content Intent
4. Add token to AgentMe config

### iMessage (macOS only)

Requires macOS with accessibility permissions:

```bash
agentme config set channels.imessage.enabled true
```

## Channel Binding

Bind channels to specific agents:

```json
{
  "agents": {
    "list": [
      {
        "id": "support",
        "channels": {
          "telegram": {
            "enabled": true
          }
        }
      }
    ]
  }
}
```

## Testing Channels

Send a test message:

```bash
agentme message send --to +1234567890 --message "Hello!"
```

## Troubleshooting

- Check channel status in **Overview** page
- Review logs in **Settings** → **Logs**
- Use `agentme doctor` to diagnose issues
