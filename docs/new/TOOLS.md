# Tools Guide

AgentMe supports extensible tools and skills for your AI agents.

## Built-in Tools

### Memory

Store and retrieve information:

```
User: Remember my favorite color is blue
Agent: I'll remember that your favorite color is blue.

User: What's my favorite color?
Agent: Your favorite color is blue.
```

### File Operations

Read and write files in the agent's workspace:

```
User: Read the file notes.txt
Agent: [Reads contents of notes.txt]
```

### Web Search

Search the web (requires configuration):

```
User: Search for latest Node.js version
Agent: [Performs web search and returns results]
```

### Browser

Control a browser for web automation:

```
User: Go to example.com and take a screenshot
Agent: [Opens browser, navigates, captures screenshot]
```

## Installing Skills

Browse available skills in the **Skills** section of the Web UI.

Or install via CLI:

```bash
agentme skills install memory-search
agentme skills install web-browser
```

## Creating Custom Skills

Create a `SKILL.md` file:

```markdown
# My Custom Tool

## Description

Does something useful

## Usage

my-tool <argument>

## Example

my-tool hello
```

Place in `~/.agentme/skills/my-tool/`.

## Tool Permissions

Configure tool permissions per agent:

```json
{
  "agents": {
    "list": [
      {
        "id": "main",
        "tools": {
          "sandbox": {
            "enabled": true,
            "tools": {
              "allow": ["memory", "file-read"],
              "deny": ["file-write"]
            }
          }
        }
      }
    ]
  }
}
```

## Elevated Tools

Sensitive tools require approval:

```
User: Delete file important.txt
Agent: This requires elevated permissions. Approve? (yes/no)
```

## Node System

Create visual tool workflows:

1. Go to **Nodes** in the Web UI
2. Create a new node graph
3. Connect tools and configure parameters
4. Bind to an agent

## Plugin Development

Develop custom plugins:

```typescript
// my-plugin.ts
export default {
  name: "my-plugin",
  tools: [
    {
      name: "my-tool",
      handler: async (args) => {
        return { result: "Hello!" };
      },
    },
  ],
};
```

## Security

- Review all tools before enabling
- Use sandbox mode for untrusted tools
- Regularly audit tool permissions
