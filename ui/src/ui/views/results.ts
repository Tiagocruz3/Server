import { html, nothing } from "lit";
import type { TaskResult } from "../types.ts";

export type ResultsProps = {
  taskResults: TaskResult[];
  onViewResult: (appId: string) => void;
  onRunTask: (appId: string) => void;
  onFixSchema: (appId: string) => void;
  onOpenTab: (tab: string) => void;
};

function toDisplayText(label: string): string {
  return label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function renderResults(props: ResultsProps) {
  return html`
    <section class="dashboard-hero card" style="margin-bottom:14px;">
      <div>
        <div class="card-title">Task Results</div>
        <div class="card-sub">Task results envelope store</div>
      </div>
    </section>

    <section class="card" style="margin-bottom:14px;">
      <div class="card-title">Results</div>
      <div class="list" style="margin-top:10px;">
        ${(props.taskResults.length
          ? props.taskResults
          : [
              {
                app: "system",
                appId: "emc2",
                summary: "No task results yet.",
                status: "success" as const,
              },
            ]
        )
          .slice(0, 5)
          .map(
            (item) => html`
              <div class="list-item" style="grid-template-columns: 1fr auto; gap: 10px; align-items: center;">
                <span>
                  <strong>${item.app}</strong>
                  <span class="result-status result-status--${item.status}">${item.status}</span>
                  ${
                    item.schemaMismatch
                      ? html`
                          <span class="result-status result-status--mismatch">schema mismatch</span>
                        `
                      : ""
                  }
                  — ${toDisplayText(item.summary)}
                  <span class="muted" style="margin-left:8px;">${item.ts || ""}</span>
                </span>
                <span class="row" style="gap:6px;">
                  <button class="btn" @click=${() => props.onViewResult(item.appId)}>Open</button>
                  <button class="btn" @click=${() => props.onRunTask(item.appId)}>Re-run</button>
                  ${
                    item.schemaMismatch
                      ? html`<button class="btn" @click=${() => props.onFixSchema(item.appId)}>Fix format</button>`
                      : ""
                  }
                </span>
              </div>
            `,
          )}
      </div>
    </section>
  `;
}
