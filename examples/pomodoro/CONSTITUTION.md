# Pomodoro — CONSTITUTION

This CONSTITUTION captures the engineering principles, constraints and decision guides for the `examples/pomodoro` project (a compact macOS menu‑bar Pomodoro timer written in Go). It is a living document: use it to guide increments, designs, and implementation choices.

Purpose
- Deliver a tiny, dependable Pomodoro timer that lives in the macOS menu bar with minimal friction for users.
- Prioritize simplicity, privacy (local‑only behavior), and reliability over feature breadth.

Audience
- Single users on macOS looking for a no‑fuss timer.

Scope & Non‑Negotiables
- Local‑only behavior by default: no telemetry, no remote storage, and no background network dependencies unless explicitly permitted.
- Small distribution size and minimal native dependencies: prefer the Go stdlib and a tiny set of well‑maintained libraries.
- Responsiveness and accuracy: timers must not drift noticeably and UI must remain responsive.

Team Values and Constraints
- Simplicity First: prefer the minimal solution that satisfies the user need.
- Fast iteration: small increments with quick local verification over long design-heavy upfront work.
- Safety & privacy: avoid data collection; if telemetry is added, make it opt‑in and documented.

The 6 Pillars (how they apply here)

1) Delivery Velocity
- What it means: small, testable increments that can be built and validated locally in minutes to hours.
- Signal you're succeeding: short commits, clear changelogs in `examples/pomodoro/`, and quick manual verification steps documented in an `implement.md` task.
- Violation: large PRs that bundle unrelated changes or require heavy CI for trivial updates.

2) Test Strategy
- What it means: unit tests for core timer logic and integration smoke checks for UI build/start. Prefer deterministic tests for timing logic (inject a clock when possible).
- Signal: tests run locally (fast), and a simple `make test` or `go test ./...` succeeds.
- Violation: relying solely on manual testing for timer math or introducing flaky timing tests.

3) Design Integrity
- What it means: keep the architecture minimal but separated: timer logic (core) vs UI (tray integration). Favor small, well‑documented interfaces.
- Signal: clear package boundaries, small surface area for the timekeeping API, and short design.md when non‑trivial decisions arise.
- Violation: mixing UI concerns and timer logic in one file making correctness and tests hard to reason about.

4) Simplicity First
- What it means: default to the least‑complex implementation that meets acceptance criteria. Defer optimizations until justified by measurement or user need.
- Signal: feature implementations that are readable and obvious; alternatives documented when complexity increases.
- Violation: premature optimization, heavy frameworks, or adding cross‑platform abstractions before proving demand.

5) Technical Debt Boundaries
- What it means: explicitly document intentional shortcuts in `implement.md` and schedule a remediation in a future `improve.md` if they affect maintainability.
- Signal: every non-trivial TODO has an associated ticket or `improve` entry with a timeline.
- Violation: leaving hacks without trace or indefinitely deferring cleanup.

6) Dependency Discipline
- What it means: prefer standard library and small, maintained Go libraries. Evaluate third‑party native bindings for macOS tray integration carefully; prefer well‑supported, small libraries.
- Signal: PRs include short notes explaining why each new dependency is needed and its maintenance status.
- Violation: adding heavy, poorly maintained dependencies for marginal convenience.

Trade‑off Rules
- Velocity vs Design: favor velocity for trivial UI/bug fixes; require a short `design.md` when change affects core timer semantics or introduces native bindings.
- Simplicity vs Performance: favor simplicity unless a clear, measurable performance issue affects correctness (e.g., timer accuracy or UI jank).
- Local privacy vs telemetry: local privacy wins by default. Telemetry must be opt‑in, documented, and reversible.

Operational Guidance for the 4DC Loop

- Increment (WHAT): keep increments small — one user‑visible change or one correctness fix per increment. Use job stories and clear acceptance criteria. Example: "Add menu item to pause/resume timer — acceptance: click pauses, resume restores remaining time."

- Design (HOW): mandatory when the increment touches core timer semantics or introduces native integrations. Keep designs short (1–2 pages), focusing on boundaries, chosen libraries, and rollback plan.

- Implement (DO): prefer test‑first for timer logic. Break tasks into small commits; each commit should be verifiable locally (build + smoke run). Record any shortcuts in `implement.md`.

- Improve (LEARN): after an increment, run a quick retrospective: what worked, what didn't, and whether any ADRs are needed. Consolidate recurring patterns into the repo-level CONSTITUTION.

Documentation & Releases
- Keep a short `README.md` with build and install steps for macOS (codesign / notarization notes if applicable). Tag releases for user distribution and keep release notes minimal and focused.

Amendments
- This CONSTITUTION is editable. If the team repeatedly encounters friction, open an `adr-constitution-update.md` under `examples/pomodoro/docs/` with proposed changes and rationale.

Open Questions (for future refinement)
- Do we plan to publish signed installers/releases for macOS users, or distribute as a local binary only?
- Do we want optional telemetry or update checks (opt‑in)? If yes, define allowed providers and data scope.

Use this document when authoring `increment.md`, `design.md`, `implement.md`, and `improve.md` for the `examples/pomodoro` example.

---
Last updated: 2025-12-02
# Pomodoro Project Constitution

## Vision
Provide a lightweight, unobtrusive Pomodoro timer that helps people focus through simple cycles of work and break, living quietly in the system tray.

## Mission
Deliver a reliable desktop timer with accurate intervals, minimal UI, and smooth tray interactions, favoring simplicity and small, safe iterations.

## Core Values
- Focus: Prioritize core timing accuracy over feature breadth.
- Simplicity: Keep interactions minimal and predictable.
- Reliability: Favor stability and low resource usage.
- Adaptability: Wrap platform specifics to remain replaceable.

## Architectural Principles

### 1. Small, Safe Iterations _(Pillar: Delivery Velocity)_
**Statement:** Prefer small, incremental changes that keep the app usable and enable fast feedback.
**Rationale:** Balanced speed with stability suits a timer app; quick feedback reduces risk.
**In Practice:**
- Aim for PRs < 300 LOC diff with at least one test touching changed code.
- Use conservative defaults and feature flags for risky behavior.

### 2. Protect the Timer’s Core _(Pillar: Test Strategy)_
**Statement:** Ensure critical timing, state transitions (work/break), and tray actions have tests; non-critical UI paths get smoke tests.
**Rationale:** Timer accuracy and state logic are the product’s core value.
**In Practice:**
- Unit tests around duration tracking, pause/resume, and completion events.
- Integration test for tray menu actions where feasible.

### 3. Pragmatic Boundaries _(Pillar: Design Integrity)_
**Statement:** Keep timer logic in a core module; isolate OS/tray integrations behind adapters; allow pragmatic coupling where added layering would increase complexity.
**Rationale:** Tray/OS specifics shouldn’t leak into core timing logic; avoid premature architecture.
**In Practice:**
- No direct OS calls from core; use adapter interfaces.
- Accept light coupling in small apps; review boundaries during refactors.

### 4. Refactor When It Hurts _(Pillar: Simplicity First)_
**Statement:** Start simple; refactor reactively when duplication or friction affects development speed or correctness.
**Rationale:** A small utility benefits from low ceremony and targeted refactors.
**In Practice:**
- Duplicate once; abstract after patterns stabilize or the third repetition.
- Trigger refactor when changes touch 3+ places or cause frequent mistakes.

### 5. Time‑boxed Shortcuts _(Pillar: Technical Debt Boundaries)_
**Statement:** Allow tactical shortcuts with a visible TODO and a scheduled cleanup within 4 weeks.
**Rationale:** Maintain momentum while preventing lingering debt.
**In Practice:**
- Tag TODOs with owner + due date.
- Include cleanup tasks in weekly triage.

### 6. Wrap External Integrations _(Pillar: Dependency Discipline)_
**Statement:** Wrap third‑party/tray libraries behind adapters; confine experiments to a pilot module before broader adoption.
**Rationale:** Maintains replaceability and controls vendor coupling.
**In Practice:**
- One adapter per external lib; no scattered direct calls.
- Evaluate updates/library swaps behind the adapter boundary.

## Update Process
1. Propose changes via a PR updating this constitution and referencing impacted modules.
2. Link rationale to Core Values and mapped Pillars; include examples or benchmarks if relevant.
3. Review by maintainers; ensure acceptance checklist passes.
4. Merge and tag a release note entry; schedule any resulting refactors or cleanups.

## Pillar Coverage
- ✓ Delivery Velocity (Principle 1)
- ✓ Test Strategy (Principle 2)
- ✓ Design Integrity (Principle 3)
- ✓ Simplicity First (Principle 4)
- ✓ Technical Debt Boundaries (Principle 5)
- ✓ Dependency Discipline (Principle 6)

## Technical Decisions
### Languages
- Go for the backend/desktop logic due to concurrency primitives and deployment simplicity.
### Frameworks / Libraries
- System tray integration via a dedicated adapter around the chosen library.
### Deployment
- Single binary distribution; minimal dependencies; versioned releases.

## Increments Location
- Base directory: `docs/increments/`
- Per-increment folders: `docs/increments/<increment-folder>/increment.md`

---
**Last Updated:** 2025-12-01