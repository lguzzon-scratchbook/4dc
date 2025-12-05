# Design: Show Remaining Time in Tray

## Context and Problem

The increment `Show Remaining Time in Tray` requires the Pomodoro demo to display a concise remaining-time indicator in the macOS tray while a Pomodoro (25m) or break (5m) is running. The tray display should update at a coarse cadence (every 10s) and show minutes in the form `21m`. When no timer is active the tray must return to its default label/menu state.

Relevant existing code and behavior:
- `internal/app` (`app.go`) implements a small timer state machine and exposes `StartPomodoro()`, `StartBreak()`, `Shutdown(ctx) error`, `OnStateChange(fn func(State))`, and `State() State`. The timer logic currently uses `time.After(duration)` and does not expose remaining time.
- `internal/tray/systray_impl.go` constructs the tray via `github.com/getlantern/systray`, adding `Pomodoro`, `Break`, and `Quit` menu items and invoking `app` actions on clicks. It does not update the tray title while timers run.
- `internal/tray/mock.go` and tests exercise integration between tray triggers and `app` state transitions.

Constraints from `CONSTITUTION.md` and `increment.md`:
- Keep change small, single-binary, and minimal dependency impact.  
- Make changes testable and reversible.  
- Do not add telemetry or external services.  
- Update cadence: 10s; format: minutes (rounded down); no pause/resume.

This design describes a small, testable, and low-risk approach that respects these constraints.

## Proposed Solution (Technical Overview)

High-level approach:

1. Add a read-only method to the `App` interface to allow UI code to query remaining time: `Remaining() time.Duration`.
   - Implement it in `internal/app` by tracking the current timer's start and end times under the existing mutex.
   - `Remaining()` returns `0` when no timer is running.

2. Implement a tray-side title updater inside `internal/tray/systray_impl.go` that runs within the `systray.Run` callback (so systray API calls happen on the required thread). Responsibilities:
   - Subscribe to app state changes using `App.OnStateChange`.
   - When state becomes running, start a 10s ticker that queries `App.Remaining()` and formats a short label like `21m` (minutes rounded down). Send formatted labels to a single title-updater executed on the systray thread using `systray.SetTitle` (or `systray.SetTooltip` if desired).
   - When state returns to `Idle`, stop the ticker and clear the title (or restore default menu appearance).

3. Factor the polling/formatting logic into a small, testable helper (e.g., `manageTitleUpdates`) that can be unit-tested by injecting a fake ticker channel and fake `setTitle`/`clearTitle` functions.

Why this approach:
- Keeps timer ownership in `internal/app` and presentation in `internal/tray`.  
- Adds only a small API surface (`Remaining()`) and no external dependencies.  
- Polling at 10s is simple and avoids pushing periodic events through the domain API or changing callback shapes.  
- Testability: the helper can be tested deterministically by injecting tick channels and mocks.

## Scope and Non-Scope (Technical)

In-scope:
- Add `Remaining() time.Duration` to the `App` interface and implement it in `internal/app`.  
- Add small fields to `timerApp` (e.g., `end time.Time` or `start time.Time`) protected by the existing mutex.  
- Implement tray-side polling/formatting logic and call `systray.SetTitle` inside `systray.Run`.  
- Add unit tests for `Remaining()` and the title-updater helper.  
- Update `README.md` acceptance checklist for manual verification.

Out-of-scope:
- Adding pause/resume, configuration UI for session lengths, localization, telemetry, or heavy UI refactors.  
- Full end-to-end GUI tests requiring a real systray environment—those are manual smoke checks.

## Architecture and Boundaries

Components and interactions:

- internal/app
  - Owns timer lifecycle and state. New responsibility: record timer start or end time so remaining time can be computed on demand.
  - Concurrency: reuse existing `mu` mutex for new time fields.

- internal/tray (systray_impl.go + new updater helper)
  - Subscribes to `App.OnStateChange` and manages a 10s polling ticker while a timer is running.  
  - Calls `systray.SetTitle` (and optionally `systray.SetTooltip`) from the systray thread.  
  - Contains a helper that encapsulates ticker injection and formatting logic so core behavior is testable without invoking `systray.Run`.

Data/control flow (short):
1. User clicks `Pomodoro` menu → systray handler calls `app.StartPomodoro()` → `app` sets state and records start/end times and invokes configured `OnStateChange` callback.  
2. Tray's `OnStateChange` handler sees `PomodoroRunning` and starts the 10s ticker; each tick queries `App.Remaining()` and formats `Xm`, sending it to the systray updater on the systray thread.  
3. When `Remaining()` reaches 0 or `Shutdown`/cancel occurs, `app` returns to `Idle`; tray stops ticker and clears the title.

Guardrails respected:
- Single-binary: no external services or opt-in telemetry are added.  
- Minimal dependency addition: none required.  
- Testing: unit tests for domain and helper; smoke/manual test for UI.

## Contracts and Data

App interface change (small):

Before:
```
type App interface {
    StartPomodoro()
    StartBreak()
    Shutdown(ctx context.Context) error
    OnStateChange(fn func(State))
    State() State
}
```

After (add):
```
    Remaining() time.Duration // returns remaining duration, 0 if idle
```

Notes on implementation:
- `timerApp` will hold an `end time.Time` (or `start` + `duration`) and compute remaining with `max(0, end.Sub(time.Now()))`. Protect access with the existing mutex.
- `Remaining()` must be cheap and safe to call concurrently; use the mutex to read stored timestamps.
- No persistent data storage changes are required.

Compatibility:
- The `App` interface is internal to this demo; adding a read-only accessor is acceptable. If other packages implement `App`, they will need minor updates; current codebase uses the internal implementation.

## Testing and Safety Net

Unit tests:
- `internal/app`: add tests that construct `New(shortDurations...)`, call `StartPomodoro()` / `StartBreak()`, and verify `Remaining()` returns expected durations at specific times. Use small test durations (the constructor already supports this). Verify that `Remaining()` returns `0` after cancel/finish.
- `internal/tray` helper: test formatting logic and control flow by injecting a fake ticker channel and fake `setTitle`/`clearTitle` functions. Verify that `setTitle` is called with expected strings like `5m`, `4m` and that `clearTitle` is called on idle.

Integration / smoke:
- Manual test on macOS: build and run `./bin/pomodoro`, start a Pomodoro from the tray, observe `25m` label and updates every ~10s, then cancel and verify title clears.

Regression and flakiness mitigations:
- Avoid time-based flakiness in unit tests by injecting controlled tick channels and using the `New(durations...)` constructor with short durations.
- Guard concurrent access with the existing mutex.

## CI/CD and Rollout

CI impact:
- No new CI jobs required. New unit tests are included in `go test ./...` runs. Ensure tests are fast and deterministic.

Rollout plan:
1. Create a small PR implementing `Remaining()` and tray updater helper with targeted unit tests.
2. Run unit tests and perform a local smoke run on macOS (`./bin/pomodoro`) to verify tray behavior.
3. Merge once tests and smoke checks pass.

Rollback:
- Revert the PR if unexpected regressions are found. The change is small and isolated to `internal/app` and `internal/tray`.
- Alternatively, short-circuit the updater in `systray_impl.go` (no-op setter) as a quick mitigation.

## Observability and Operations

Logging:
- Keep existing info logs on menu clicks. Add a single info log when the tray updater starts for a session and when it stops. Do not log on every tick to avoid noise.

Metrics / Alerts:
- This demo does not require metrics or alerts for this feature. If adopted in a larger product, consider metrics for feature usage.

Diagnostics:
- Manual verification steps and unit tests are the primary validation. Logs for start/stop are available for troubleshooting.

## Risks, Trade-offs, and Alternatives

Risks:
- Making `Remaining()` part of `App` changes the interface; if other implementations exist they must be updated. In this demo the change is acceptable.
- `systray.SetTitle` must be executed on the main OS thread — ensure title updates are issued from inside the `systray.Run` callback or an updater running on that thread.
- Text length/truncation on some macOS setups: acceptance testing required; if truncation is observed prefer a shorter label or use tooltip.

Trade-offs and alternatives considered:
- Polling (chosen): tray polls `App.Remaining()` every 10s. Pros: simple, clear ownership. Cons: small polling overhead.
- Push/events (alternative): extend `OnStateChange` or add a dedicated `OnTick` callback so `app` pushes remaining updates. Pros: avoids polling. Cons: increases domain responsibility and requires more intrusive changes to `app` (timer goroutine would need to drive ticks), increasing surface area and test complexity.

The polling approach is selected for minimal surface change and clearer separation of concerns.

## Follow-up Work

- Add a toggle to disable tray-time display (user preference).  
- Add localization/formatting options and shorter formats if truncation is an issue.  
- If adoption grows, add lightweight metrics for usage of tray-time display.

## References

- `examples/pomodoro/CONSTITUTION.md`  
- `examples/pomodoro/increments/show-remaining-time-in-tray/increment.md`  
- `examples/pomodoro/internal/app/app.go`  
- `examples/pomodoro/internal/tray/systray_impl.go`
