import { describe, expect, it } from "vitest";
import type { AgentMeConfig } from "../config/config.js";
import { DEFAULT_ASSISTANT_IDENTITY, resolveAssistantIdentity } from "./assistant-identity.js";

describe("resolveAssistantIdentity avatar normalization", () => {
  it("prefers agent-specific identity over global ui.assistant identity", () => {
    const cfg: AgentMeConfig = {
      ui: {
        assistant: {
          name: "EMC2",
          avatar: "🤖",
        },
      },
      agents: {
        list: [
          {
            id: "social-manager",
            identity: {
              name: "Social Manager",
              emoji: "📣",
            },
          },
        ],
      },
    };

    const identity = resolveAssistantIdentity({ cfg, agentId: "social-manager", workspaceDir: "" });
    expect(identity.name).toBe("Social Manager");
    expect(identity.emoji).toBe("📣");
  });
  it("drops sentence-like avatar placeholders", () => {
    const cfg: AgentMeConfig = {
      ui: {
        assistant: {
          avatar: "workspace-relative path, http(s) URL, or data URI",
        },
      },
    };

    expect(resolveAssistantIdentity({ cfg, workspaceDir: "" }).avatar).toBe(
      DEFAULT_ASSISTANT_IDENTITY.avatar,
    );
  });

  it("keeps short text avatars", () => {
    const cfg: AgentMeConfig = {
      ui: {
        assistant: {
          avatar: "PS",
        },
      },
    };

    expect(resolveAssistantIdentity({ cfg, workspaceDir: "" }).avatar).toBe("PS");
  });

  it("keeps path avatars", () => {
    const cfg: AgentMeConfig = {
      ui: {
        assistant: {
          avatar: "avatars/agentme.png",
        },
      },
    };

    expect(resolveAssistantIdentity({ cfg, workspaceDir: "" }).avatar).toBe("avatars/agentme.png");
  });
});
