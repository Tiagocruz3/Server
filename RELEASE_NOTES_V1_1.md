# Agent Me v1.1 Release Notes

## Highlights

- Scheduler upgraded with week/day **time-slot grid** interactions.
- Drag/drop reschedule prefill in scheduler slots.
- Dashboard cards now surface lightweight real metrics (runs + last status).
- Dashboard actions now provide clear in-UI notices for key operations.
- Global UI reliability improved with error boundary handling and dismissible UI error indicator.
- Added Operations Log panel with quick retry shortcuts (chat/scheduler/restore).
- Backup/Restore flow hardened with restore preview + apply UX and clearer safety messaging.
- Control UI now ships with route-focused code splitting for better initial load performance.

## Engineering status

- ✅ `pnpm lint`
- ✅ `pnpm build`
- ✅ `pnpm ui:build`

## Notable UX improvements

- Agent branding/logo integrated in topbar and login card.
- Agent Dashboard cleaned of noisy sections while preserving focused flows in dedicated views.
- Navigation cleanup (duplicate routes removed, menu order refined, logo click routes to chat).

## Known limits (planned for v1.2)

1. One-click automatic rollback to previous known-good restore snapshot.
2. Restore dry-run/diff before apply.
3. Optional full workspace archive restore mode.
4. Direct persisted reschedule-on-drop in scheduler (currently prefill-first UX).
