import { html, nothing } from "lit";
import type { TaskResult, RecentItem, AgentApp } from "../types.ts";

export type DashboardProps = {
  connected: boolean;
  agentCount: number;
  recentActivity: RecentItem[];
  taskResults: TaskResult[];
  dashboardNotice: { text: string; tone: "info" | "success" | "error" | "warning" } | null;
  agentsList: { agents: AgentApp[]; count: number } | null;
  agentSearch: string;
  agentSort: "name" | "id";
  agentModal: string | null;
  agentAvatarDraft: string;
  onEditAgentAvatar: (agentId: string, currentAvatar: string) => void;
  onClearNotice: () => void;
  onOpenTab: (tab: string) => void;
  onAddAgent: () => void;
  onAgentSearchChange: (v: string) => void;
  onAgentSortChange: (v: "name" | "id") => void;
  onEditAgentProfile: (agentId: string) => void;
  onEditAgentAvatar: (agentId: string, currentAvatar: string) => void;
  onAgentAvatarDraftChange: (v: string) => void;
  onAgentSaveAvatar: () => void;
  onCloseAgentModal: () => void;
};

function toDisplayText(label: string): string {
  return label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function renderDashboard(props: DashboardProps) {
  const agents = props.agentsList?.agents ?? [];

  const filteredAgents = agents
    .filter((a) => {
      if (!props.agentSearch.trim()) {
        return true;
      }
      const q = props.agentSearch.toLowerCase();
      return a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q);
    })
    .toSorted((a, b) => {
      if (props.agentSort === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.id.localeCompare(b.id);
    });

  const statsForAgent = (agentId: string) => {
    const relevant = props.taskResults.filter((r) => r.appId === agentId);
    const latest = relevant[0];
    return {
      runs: relevant.length,
      lastStatus: latest?.status ?? "idle",
    };
  };

  return html`
    <section class="dashboard-hero card" style="margin-bottom:14px;">
      <div>
        <div class="card-title">Agent Dashboard</div>
        <div class="card-sub">Manage your AI workforce — ${props.agentCount} agent${props.agentCount !== 1 ? "s" : ""} configured</div>
      </div>
    </section>

    ${
      props.dashboardNotice
        ? html`<div class="callout ${props.dashboardNotice.tone}" style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <span>${props.dashboardNotice.text}</span>
          <button class="btn" @click=${props.onClearNotice}>Dismiss</button>
        </div>`
        : nothing
    }

    <!-- AI Agents Profile Cards -->
    <section class="card" style="margin-bottom:14px;">
      <div class="agents-dashboard__header-content" style="margin-bottom: 16px;">
        <div>
          <div class="card-title">AI Agents</div>
          <div class="card-sub">Manage your AI workforce — ${props.agentCount} agent${props.agentCount !== 1 ? "s" : ""} configured</div>
        </div>
        <div class="agents-dashboard__header-actions">
          <button class="btn primary" @click=${props.onAddAgent}>
            <span style="margin-right: 4px;">+</span> Add Agent
          </button>
        </div>
      </div>

      <div class="agents-dashboard__filters" style="margin-bottom: 12px;">
        <input 
          class="input agents-dashboard__search" 
          placeholder="Search agents by name or ID..." 
          .value=${props.agentSearch}
          @input=${(e: Event) => props.onAgentSearchChange((e.target as HTMLInputElement).value)}
        />
        <label class="field" style="min-width: 130px; margin: 0;">
          <span>Sort</span>
          <select .value=${props.agentSort} @change=${(e: Event) => props.onAgentSortChange((e.target as HTMLSelectElement).value as "name" | "id")}>
            <option value="name">Name</option>
            <option value="id">ID</option>
          </select>
        </label>
      </div>

      <div class="agents-dashboard__grid">
        ${
          filteredAgents.length === 0
            ? html`
          <div class="card agents-dashboard__empty" style="grid-column: 1 / -1; text-align: center; padding: 48px 32px;">
            <div style="font-size: 48px; margin-bottom: 16px;">🤖</div>
            <div class="card-title">No agents found</div>
            <div class="card-sub" style="margin-bottom: 20px;">
              ${props.agentSearch ? "No agents match your search." : "Get started by creating your first AI agent."}
            </div>
            ${!props.agentSearch ? html`<button class="btn primary" @click=${props.onAddAgent}>Create First Agent</button>` : ""}
          </div>
        `
            : filteredAgents.map((app) => {
                const stats = statsForAgent(app.id);
                const isDefault = app.id === "main";
                return html`
            <article class="agent-profile-card">
              <div class="agent-profile-card__header">
                <div class="agent-profile-card__avatar">${app.icon}</div>
                <div class="agent-profile-card__status" style="--status-color: #22c55e">
                  <span class="agent-profile-card__status-dot"></span>
                  Active
                </div>
                ${
                  isDefault
                    ? html`
                        <span class="agent-profile-card__badge">Default</span>
                      `
                    : ""
                }
              </div>
              
              <div class="agent-profile-card__body">
                <h3 class="agent-profile-card__name">${app.name}</h3>
                <p class="agent-profile-card__role">${app.role}</p>
                
                <div class="agent-profile-card__stats">
                  <div class="agent-profile-card__stat">
                    <span class="agent-profile-card__stat-value">${stats.runs}</span>
                    <span class="agent-profile-card__stat-label">Runs</span>
                  </div>
                  <div class="agent-profile-card__stat">
                    <span class="agent-profile-card__stat-value agent-profile-card__stat-value--${stats.lastStatus}">${stats.lastStatus}</span>
                    <span class="agent-profile-card__stat-label">Last</span>
                  </div>
                </div>
              </div>
              
              <div class="agent-profile-card__footer">
                <button 
                  class="btn agent-profile-card__action-btn" 
                  @click=${() => props.onEditAgentAvatar(app.id, app.icon)}
                  title="Edit avatar"
                >
                  🎨 Avatar
                </button>
                <button 
                  class="btn agent-profile-card__action-btn agent-profile-card__action-btn--primary" 
                  @click=${() => props.onEditAgentProfile(app.id)}
                >
                  Configure →
                </button>
              </div>
            </article>
          `;
              })
        }
      </div>
    </section>

    ${
      props.agentModal
        ? html`
            <section class="card" style="margin-top:14px; border-color: #6b5cf0;">
              <div class="card-title">Edit Agent Profile Picture</div>
              <div class="card-sub">Agent: ${props.agentModal}</div>
              <label class="field" style="margin-top:10px;">
                <span>Avatar (emoji, URL, or workspace path)</span>
                <input
                  class="input"
                  .value=${props.agentAvatarDraft}
                  placeholder="🤖 or https://... or avatars/emc2.png"
                  @input=${(e: Event) =>
                    props.onAgentAvatarDraftChange((e.target as HTMLInputElement).value)}
                />
              </label>
              <div class="row" style="margin-top:10px; gap:8px;">
                <button class="btn primary" @click=${props.onAgentSaveAvatar}>Save avatar</button>
                <button class="btn" @click=${props.onCloseAgentModal}>Cancel</button>
                <button class="btn" @click=${() => props.onEditAgentProfile(props.agentModal!)}>
                  Open full profile
                </button>
              </div>
            </section>
          `
        : nothing
    }

  `;
}
