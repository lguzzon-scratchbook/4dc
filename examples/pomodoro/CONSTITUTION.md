# Engineering Constitution for Pomodoro (Tray App)

## Purpose

This CONSTITUTION captures the engineering guardrails for the Pomodoro tray app: a tiny, focused macOS menu-bar timer implemented in Go. It exists to guide everyday choices across the 4dc loop (increment → design → implement → improve), keeping decisions aligned with our priorities: simplicity, reliability, and minimal user friction.

## Context

- Product / domain:
  - A lightweight macOS menu-bar Pomodoro timer implemented in Go. Single-purpose UX: start/stop timers, simple notifications, and minimal configuration.
- Team:
  - Small project scope; intended for a small maintainer or small community contributors. Emphasis on pragmatic engineering over heavyweight process.
- Non-negotiables:
  - The app must be small, responsive, and unobtrusive.
  - The product ships to individual users on macOS. Distribution and signing expectations should be decided up-front (see Open Questions).
  - User privacy: no telemetry unless explicitly stated and opt-in.

## Our Principles and Trade-offs

We prioritize delivering a small, reliable product quickly while avoiding long-term complexity that undermines maintainability. Decisions bias toward pragmatic minimalism: prefer readable, idiomatic Go and the standard library unless a dependency clearly reduces complexity and maintenance cost.

- Speed vs safety: Favor small, frequent, low-risk releases. Safety (platform compatibility, privacy, and not breaking users) is enforced for public releases; prototypes or internal builds may be faster and lighter on checks.
- Short-term delivery vs long-term maintainability: Prefer small, well-documented shortcuts over opaque hacks. If we take a shortcut, we record it and set a timebox for cleanup.
- Experimentation vs stability: Experimentation is allowed in forks/feature branches or behind flags; the main branch must remain stable for users.

### Default Trade-off Rules

- When in doubt between **shipping faster** and **polishing the design**, we usually: ship a small, well-tested increment that is easily revertible. Polishing is scheduled as a follow-up increment if not critical for user experience.
- When in doubt between **adding a dependency** and **building it ourselves**, we usually: prefer the standard library or a small, well-maintained dependency with clear licensing. Add a dependency only if it meaningfully reduces code complexity or solves a non-trivial platform gap.
- When in doubt between **adding tests now** and **moving on**, we usually: add at least a minimal, automated smoke test for critical user flows (build, launch, basic timer flow). Deeper unit tests follow as increments when logic complexity grows.

---

## The 6 Pillars of Our Engineering

### 1. Delivery Velocity

- Desired iteration speed: small increments (single feature or fix per increment), frequent releases for users when changes are user-visible.
- Typical increment size: a single feature, a bugfix, or a small UX improvement that can be implemented, tested, and released in a few hours to a couple of days.
- Release cadence and acceptable risk per release: aim for frequent, small releases with low blast radius. Public releases require basic verification (build, smoke tests, signed binary if applicable).

**We optimize for:** rapid, low-risk shipping and quick rollback capability.
**We accept the following risks:** small regressions that can be quickly fixed in subsequent increments.
**We avoid:** large, multi-feature releases that increase risk and complicate rollbacks.

### 2. Test Strategy

- What must be tested: build and packaging, basic runtime startup, core timer flow (start/pause/reset/notification), and any platform integration (menu-bar behavior, notifications).
- Coverage / confidence: focus on critical-path coverage rather than a high percentage target. Automated smoke tests + selective unit tests where logic is non-trivial.
- Preferred shape: lean testing pyramid — smoke/integration tests for platform-level flows, unit tests for core time and state logic, minimal UI tests if reliable tooling exists.

**Minimum expectations:**
- A reproducible build and packaging pipeline (local or CI).
- One or more automated smoke checks that verify the app launches and the timer state transitions.

**When moving fast, we are allowed to:** temporarily skip non-critical unit tests if a compensating smoke test exists and the change is small.
**We never skip tests for:** releases that change distribution, signing, or anything that affects user privacy or data handling.

### 3. Design Integrity

- Structure: keep domain logic (timer, state machine, persistence) separated from platform glue (menu-bar UI, macOS notifications). This makes logic testable without macOS-specific tooling.
- Good boundaries: a small core package with no macOS dependencies, and a thin platform adapter layer.

**We strive for:** clear separation between core timer behavior and UI/OS integration so core logic can be tested and reused.
**We are okay with:** modest platform-specific code in the adapter layer to keep user experience native.
**Red flags that trigger redesign or refactoring:** platform code leaking into core logic, duplicated state handling, or increasing complexity that prevents confident small changes.

### 4. Simplicity First

- Principle: implement the simplest thing that works, then iterate. Avoid premature abstractions.
- Introduce patterns only when repetition or inconsistency shows a clear benefit.

**We prefer:** readable, idiomatic code and explicitness over clever abstractions.
**We add abstraction only when:** two or more concrete duplicates exist or when a pattern prevents classes of bugs.
**We treat complexity as acceptable when:** it measurably improves user experience or reduces long-term maintenance cost.

### 5. Technical Debt Boundaries

- Acceptable shortcuts: small, documented compromises confined to a single increment with a clear owner and expiration.
- Recording debt: all shortcuts must be recorded as issues tagged `technical-debt` and referenced in the increment that introduced them.
- Paying debt: prioritize debt paydown during regular maintenance increments or when the debt blocks meaningful progress.

**Allowed short-term shortcuts:** small UX omissions, temporarily limited platforms, developer-only flags.
**Debt must be recorded when:** code is added that reduces long-term maintainability, or tests are skipped for release reasons.
**We commit to paying down debt when:** it causes repeated manual work, leads to bugs, or slows iteration.

### 6. Dependency Discipline

- How we choose dependencies: prefer stdlib, then small, well-maintained libraries with permissive licenses and minimal transitive dependencies.
- Isolation: encapsulate third-party usage behind small adapter interfaces so the rest of the codebase can remain dependency-agnostic.

**We add a new dependency only when:** it significantly reduces implementation or maintenance cost and has active maintenance and a permissive license.
**We isolate dependencies by:** wrapping them in small adapters and limiting their surface area in the repo.
**We avoid:** heavy frameworks or libraries that pull large transitive trees or force architectural decisions.

---

## How 4dc Uses This Constitution

### increment (WHAT)
- Size: single purposeful changes that deliver user-visible value or remove a blocker.
- Acceptance: increments must include a short acceptance checklist (build, smoke test, basic UX verification).
- Pillars in scope: Delivery Velocity and Simplicity First dominate scope decisions.

### design (HOW)
- Early focus: separate core timer logic from platform adapters; sketch minimal UX flows.
- ADRs: create an ADR for distribution strategy (Homebrew vs App Store vs GitHub Releases) and for any non-trivial dependency.

### implement (DO)
- Step size: small, isolated commits; each commit should build and ideally pass local smoke checks.
- Tests: add smoke tests for every public release; add unit tests for non-trivial logic as part of the same or follow-up increment.
- Shortcuts: allowed only with an explicit issue and timebox.

### improve (GOOD / FAST)
- When to refactor: when maintenance cost increases, tests become brittle, or user-facing bugs recur.
- Debt paydown: schedule during quiet iterations or bundle into small maintenance increments.

---

## Amendments and Evolution

- Updates: this CONSTITUTION is living. Propose changes via a small ADR or PR with a short rationale and a documented owner.
- Revisit triggers: major platform change (new macOS requirements), sustained friction in workflows, or team growth beyond a small maintainer model.
- Documentation: changes should be recorded in a dated section in this file or an accompanying ADR and referenced in release notes.

---

## References and Inspirations

- Kent Beck — "Make it work, make it right, make it fast"
- Unix philosophy – small, composable tools
- Clean Architecture patterns for separation of core logic and adapters
- Go best practices: prefer stdlib, idiomatic error handling, small binaries

---

## Open Questions

1. Distribution channel: do we target `Homebrew`, `GitHub Releases` (signed binaries), or the Mac App Store?
2. Code signing / notarization: is Apple notarization required for public releases?
3. Minimum automated testing required for public releases: smoke only, or smoke + unit tests for core logic?
4. Dependency policy: strict (stdlib-only unless justified) or pragmatic (allow vetted libraries)?
5. Supported macOS versions and compatibility policy.
6. Telemetry policy: allowed (opt-in) or disallowed by default?

---

This CONSTITUTION should be used actively during each 4dc loop. When decisions feel misaligned with these rules, open an amendment PR or file an ADR so we can refine the guardrails.
