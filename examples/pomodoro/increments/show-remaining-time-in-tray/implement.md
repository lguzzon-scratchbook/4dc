# Implementation Plan: Show Remaining Time in Tray

## Context and Inputs

- Increment: `examples/pomodoro/increments/show-remaining-time-in-tray/increment.md` — show remaining minutes in the tray while a Pomodoro (25m) or break (5m) runs; update every 10s; no pause; cancel restores default.  
- Design: `examples/pomodoro/increments/show-remaining-time-in-tray/design.md` — poll `App.Remaining()` every 10s from the tray, format `Xm`, call `systray.SetTitle` from the systray thread, add testable updater helper, add `Remaining()` to `App`.  
- Assumptions: standard repo CI runs `go test ./...`; we have no feature-flagging infra in this demo; macOS manual smoke tests are available to the reviewer.

## High-Level Approach

Workstreams:
- App API & tests — add `Remaining()` and timer bookkeeping in `internal/app`.
- Tray updater helper & tests — add `internal/tray/updater.go` and unit tests using injected tick channels and setters.
- Tray integration & wiring — hook updater inside `systray.Run` in `internal/tray/systray_impl.go` and ensure systray API calls run on correct thread.
- Docs & acceptance — update `examples/pomodoro/README.md` acceptance steps.

Follow the two-PR strategy (recommended):
- PR 1: App changes + tests (small, safe).  
- PR 2: Updater helper + tray wiring + tests + README change.

If you prefer one PR, combine steps but keep commits focused and small.

## Workstreams and Steps

Workstream A — App API & tests

1) Modify `internal/app/app.go` (small PR #1)
  - Add `Remaining() time.Duration` to the `App` interface.  
  - Add fields to `timerApp` to record timer end time (e.g., `end time.Time`) and any necessary state. Use the existing `mu` mutex to protect access.
  - On `StartPomodoro()` and `StartBreak()`, set `end = time.Now().Add(duration)`. On cancel/finish clear `end` (zero time) and set state to `Idle` as current logic does.
  - Implement `Remaining()` to compute `d := end.Sub(time.Now()); if d < 0 { return 0 } else { return d }` while holding the mutex.
  - Why: keeps timer ownership in domain and provides a simple read API for UI.
  - Validation: code builds; run `go test ./...` — existing tests should pass.

2) Add unit tests to `internal/app/app_test.go` (in same PR)
  - Use `app.New( shortDurations )` to create test-friendly durations (constructor already supports this).  
  - Test cases:
    - Immediately after `StartPomodoro()`, `Remaining()` is approximately the configured duration (allow small delta).  
    - After a small sleep (e.g., 10ms in test durations), `Remaining()` decreases appropriately.  
    - After cancel (`Shutdown` or simulated cancel), `Remaining()` returns 0.
  - Testing guidance: avoid long sleeps — rely on the constructor supporting millisecond durations.
  - Validation: `go test ./...` passes and tests run quickly.

Workstream B — Tray updater helper & tests

3) Create `internal/tray/updater.go` (PR #2)
  - Implement helper `manageTitleUpdates(app.App, setTitle func(string), clearTitle func(), newTicker func(time.Duration) <-chan time.Time, stop <-chan struct{})` or similar signature.
  - Responsibilities:
    - Subscribe to `App.OnStateChange` (the function can be passed an `onState` channel or the helper can accept an external channel to control lifecycle in tests).
    - When state is `PomodoroRunning` or `BreakRunning`, use `newTicker(10*time.Second)` to receive ticks; on each tick call `app.Remaining()`, format minutes (`Xm`), and call `setTitle` with the formatted string.
    - On state `Idle`, call `clearTitle` and stop the ticker.
  - Testability: the helper must accept injected ticker channel and setter functions so unit tests do not depend on real time or `systray`.
  - Validation: linter and unit tests compile.

4) Add `internal/tray/updater_test.go` (PR #2)
  - Provide a fake `app.App` stub implementing `Remaining()` and `OnStateChange` to simulate state transitions.  
  - Provide fake `setTitle` and `clearTitle` that record calls to in-memory slices.  
  - Provide a fake ticker channel (make it a `chan time.Time`) to drive ticks deterministically.  
  - Test cases:
    - Starting a `PomodoroRunning` state then driving ticks yields `setTitle` calls with `Xm` values matching stubbed `Remaining()` outputs.
    - Transitioning to `Idle` calls `clearTitle` and stops further `setTitle` calls.
  - Validation: tests are deterministic and fast; `go test ./...` includes these tests.

Workstream C — Tray integration & wiring

5) Wire helper into `internal/tray/systray_impl.go` (PR #2)
  - Inside the `systray.Run` callback (where the systray thread is guaranteed), create `setTitle` and `clearTitle` wrappers that call `systray.SetTitle(...)` (or `SetTooltip` fallback).
  - Create a `newTicker` function for production that returns `time.Tick(10 * time.Second)` (or `time.NewTicker` with proper stop handling). Pass a stop channel to the helper to shut it down when `systray` exits.
  - Start the helper so that it subscribes to `App.OnStateChange` and the systray-thread setters are used.
  - Ensure cleanup: on `systray` exit, close stop channels and restore default title.
  - Add two short info logs: when updater starts for a session and when it stops.
  - Validation: code builds and lints; run local smoke test on macOS to verify behavior.

6) Add a non-GUI integration unit test using `MockTray` (PR #2)
  - Instead of invoking `systray.Run`, test `manageTitleUpdates` directly by supplying a fake `setTitle` and a fake ticker and a fake `app` object and simulating state transitions via `OnStateChange` callbacks. This verifies logic while avoiding GUI threading issues.
  - Validation: `go test ./...` passes.

Workstream D — Docs & acceptance updates

7) Update `examples/pomodoro/README.md` acceptance checklist (PR #2)
  - Add steps to build and run locally and instructions to verify: start Pomodoro → tray shows `25m`, after a minute it shows reduced minutes, cancel → tray returns to default.  
  - Validation: reviewer can run smoke commands below and confirm behavior.

## Testing Plan

- Unit tests: `internal/app` and `internal/tray` helper tests run in `go test ./...`. Keep tests deterministic by injecting fake tick channels and using short durations via `New(...)`.
- Manual smoke test (macOS):
  - Build and run the demo:
    ```bash
    cd examples/pomodoro
    go build -o bin/pomodoro ./cmd/pomodoro
    ./bin/pomodoro
    ```
  - Start `Pomodoro` from the tray and verify the title shows `25m`, updates roughly every 10s (or shows `24m` once one minute passed based on rounding), and cancels restore default.

## CI/CD and Rollout

- CI: No pipeline changes. New tests must pass in default `go test` runs.
- PR strategy: Prefer two PRs (App then Updater) to make review and rollback easier. If urgent, combine into one PR with small commits.
- Rollout: Merge PRs after tests and manual smoke pass. Rollback by reverting PR or short-circuiting the updater by making `setTitle` a no-op in `systray_impl.go`.

## Observability and Post-Deployment Checks

- Logging: two info logs (updater start/stop) to aid diagnosis; do not log per-tick.
- Post-deploy checks:
  - Confirm tray shows `Xm` during a session on macOS.  
  - Confirm `go test ./...` passes in CI.  
  - Review logs for updater start/stop messages.

## Risks, Dependencies, and Coordination

- Risk: `App` interface change — keep PR small and internal.  
- Risk: systray calls must run on the main OS thread — implement inside `systray.Run` callback.  
- Dependency: none external.  
- Coordination: standard PR review; no cross-team coordination expected.

## Follow-up and Cleanup

- After stable rollout: consider adding a user toggle to disable tray-time, localization, or shorter formats if truncation happens.  
- Remove any temporary test hooks or fallback code once stable.
