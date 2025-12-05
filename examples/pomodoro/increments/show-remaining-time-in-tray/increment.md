# Increment: Show Remaining Time in Tray

## Context

The Pomodoro demo is a minimal macOS menu-bar app with `Pomodoro`, `Break`, and `Quit` actions. Currently users must open the app or rely on logs to know how much time remains in an active session. For a tray-based tool, glanceable time information reduces friction and increases usefulness without expanding the app's surface area.

This project values small, local changes, a single-binary deliverable, and minimal dependencies. Any change must be reversible, testable, and compatible with the existing build and release flow.

Important constraints for this increment: Pomodoro sessions are 25 minutes, breaks are 5 minutes; the tray display should update at most every 10 seconds to balance freshness and UI churn; there is no pause feature—running timers can only be cancelled or allowed to finish.

## Goal

Outcome / Hypothesis:
- While a Pomodoro or break is running, users can see a concise remaining-time indicator in the tray next to the app icon (for example, `21m`). This makes the timer glanceable and reduces context switching.

Scope:
- Show remaining time in minutes (rounded down) when a Pomodoro (25m) or break (5m) is active. Update the display every 10 seconds. When no timer is active (idle, cancelled, or finished), return the tray to its default label/menu state.

Non-Goals:
- We will not add pause/resume functionality in this increment.
- We will not change session lengths or add a configuration UI for durations in this change.
- We will not add analytics, cloud services, or large new dependencies.

Why this is a good increment:
- Small and focused: a single visible improvement to the tray UX.  
- Quickly testable and reversible: behavior can be validated manually and by small unit tests for timer/state-to-label mapping.  
- Low risk: uses in-process UI updates at a coarse cadence (10s) to limit CPU/UI churn and remains compatible with single-binary constraints.

## Tasks

- Task: Tray shows remaining minutes while a timer is running (format like `21m`).
  - User/Stakeholder Impact: macOS users can glance at the tray and immediately know how many minutes remain in the active Pomodoro or break session.
  - Acceptance Clues: Start a Pomodoro → tray label displays `25m`; after ~5 minutes the label displays `20m` (or similar rounded minutes). When the session finishes or is cancelled, the tray returns to the default label/menu.

- Task: Indicate session type (Pomodoro vs Break) in a glanceable way.
  - User/Stakeholder Impact: Users can tell whether the remaining time refers to a work session or a break without opening additional UI.
  - Acceptance Clues: Starting a break displays `5m` in the tray and is visually distinguishable from a Pomodoro (for example, via an adjacent short label or the existing menu state). The distinction is clear during manual verification.

- Task: Update the displayed remaining time every 10 seconds.
  - User/Stakeholder Impact: Users see reasonably current remaining time while avoiding excessive updates that could increase CPU usage or create visual jitter.
  - Acceptance Clues: During a running session the displayed minutes change at roughly 10s intervals and do not update more frequently.

- Task: Preserve existing cancel behavior — cancelling a running timer restores the default tray state immediately.
  - User/Stakeholder Impact: Users can cancel a session and return to the normal tray state without residual labels.
  - Acceptance Clues: Trigger cancel → tray returns to default labeling/menu instantly.

- Task: Provide tests that cover timer-to-label formatting and basic state transitions (start → running → finish/cancel).
  - User/Stakeholder Impact: Maintainers have confidence the label logic won't regress and can be validated by CI.
  - Acceptance Clues: Tests that exercise formatting and state transitions exist and pass in local and CI runs.

- Task: Update the demo's acceptance checklist and quick-run instructions so reviewers can verify the tray-time behavior.
  - User/Stakeholder Impact: Contributors and reviewers know how to manually verify the change on macOS.
  - Acceptance Clues: README (or demo acceptance section) includes steps to build, run, start a session, and observe the tray updates.

- Task: Emit short, human-readable log lines when timers start, finish, or are cancelled to aid local diagnosis.
  - User/Stakeholder Impact: Support and maintainers can quickly gather evidence for reproducing or triaging issues.
  - Acceptance Clues: Starting/finishing/cancelling a session produces an informational log entry with basic context.

## Risks and Assumptions

- Assumption: The tray library used in the demo supports updating displayed text dynamically on macOS without adding heavy dependencies.
- Risk: Frequent UI updates could increase CPU usage; mitigated by using a 10-second update cadence and rounding to minutes for display.
- Risk: Tray/menu text length might be truncated on some macOS setups; acceptance testing should verify legibility and adjust the displayed format if truncation is a problem.
- Assumption: The single-binary constraint must be preserved; no external services or opt-in telemetry are added.
- Mitigation: Keep the change local, small, and covered by unit tests and smoke checks so it is easy to revert if any regressions appear.

## Success Criteria and Observability

- Functional success:
  - When a Pomodoro is started, the tray shows `25m` and then decreases in minute steps (rounded down) at roughly 10s update intervals until the timer finishes or is cancelled.
  - When a break is started, the tray shows `5m` and behaves similarly.
  - Cancelling or finishing a session returns the tray to its idle/default state.

- Observability:
  - Manual check: build and run the demo on macOS, start a Pomodoro, and verify the tray label updates as described.  
  - Tests: Unit tests exist for formatting and state transitions and run in CI as part of the normal build pipeline.  
  - Logs: Info-level log lines appear when sessions start, finish, or are cancelled to help reproduce or diagnose issues.

## Process Notes

- Keep the change small and in a single PR with clear, focused commits.  
- The PR should include unit tests for the formatting/state behavior and a short manual test plan (screenshot or steps) in the PR description.  
- The change should pass existing build + lint checks and the project's smoke check before merging.  
- Rollback plan: revert the PR if regressions occur; the change is intentionally small to make rollbacks low-risk.

## Follow-up Increments (optional)

- Allow user-configurable display options (seconds vs minutes, toggle to disable tray-time).  
- Add an option to show seconds for an active session or a compact `MM:SS` hover tooltip.  
- Add localization or formatting preferences for different locales if demand arises.  
- Add a small accessibility note or menu item to read remaining time aloud for assistive workflows.
