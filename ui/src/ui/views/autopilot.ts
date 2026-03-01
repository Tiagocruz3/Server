import { html, nothing } from "lit";
import type { RecentItem } from "../types.ts";

export type AutopilotProps = {
  connected: boolean;
  autopilotMode: "off" | "assisted" | "full";
  recentActivity: RecentItem[];
  queuedCount: number;
  onSetAutopilotMode: (m: "off" | "assisted" | "full") => void;
  onEmergencyStop: () => void;
  onOpenTab: (tab: string) => void;
};

function toDisplayText(label: string): string {
  return label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function renderAutopilot(props: AutopilotProps) {
  return html`
    <section class="dashboard-hero card" style="margin-bottom:14px;">
      <div>
        <div class="card-title">Autopilot</div>
        <div class="card-sub">Autopilot and emergency controls</div>
      </div>
      <div class="dashboard-hero__chips">
        <span class="result-status ${props.connected ? "result-status--success" : "result-status--error"}">
          ${props.connected ? "Connected" : "Disconnected"}
        </span>
        <span class="result-status result-status--running">Autopilot ${props.autopilotMode.toUpperCase()}</span>
      </div>
    </section>

    <section class="card" style="margin-bottom:14px;">
      <div class="card-title">Controls</div>
      <div class="row" style="margin-top:10px; align-items:center; gap:8px; flex-wrap: wrap;">
        <span class="muted">Autopilot:</span>
        <button class="btn ${props.autopilotMode === "off" ? "primary" : ""}" @click=${() => props.onSetAutopilotMode("off")}>Off</button>
        <button class="btn ${props.autopilotMode === "assisted" ? "primary" : ""}" @click=${() => props.onSetAutopilotMode("assisted")}>Assisted</button>
        <button class="btn ${props.autopilotMode === "full" ? "primary" : ""}" @click=${() => props.onSetAutopilotMode("full")}>Full</button>
        <button class="btn danger" @click=${() => props.onEmergencyStop()}>Emergency Stop</button>
      </div>
      <div class="row" style="margin-top:12px; gap:8px; flex-wrap:wrap;">
        <button class="btn" @click=${() => props.onOpenTab("channels")}>Channels</button>
        <button class="btn" @click=${() => props.onOpenTab("cron")}>Scheduler</button>
        <button class="btn" @click=${() => props.onOpenTab("logs")}>Logs</button>
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-bottom: 14px; align-items: start;">
      <div class="card">
        <div class="card-title">Live Activity Feed</div>
        <div class="list" style="margin-top:10px;">
          ${(props.recentActivity.length ? props.recentActivity : [{ label: "No activity yet" }])
            .slice(0, 6)
            .map(
              (item) =>
                html`<div class="list-item"><span>${toDisplayText(item.label)}</span><span class="muted">${item.ts || ""}</span></div>`,
            )}
        </div>
      </div>
      <div class="card">
        <div class="card-title">Task Queue</div>
        <div class="card-sub">Queued chat tasks waiting to run</div>
        <div class="metric">${props.queuedCount}</div>
        <div class="row" style="margin-top: 8px;">
          <button class="btn" @click=${() => props.onOpenTab("chat")}>Open Queue</button>
          <button class="btn" @click=${() => props.onOpenTab("logs")}>View Logs</button>
        </div>
      </div>
    </section>
  `;
}
