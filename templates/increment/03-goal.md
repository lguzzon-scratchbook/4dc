# Goal (Increment Prompt)

This prompt exists to turn a **short description or user story** for the next change into a **single, well-formed increment specification** (a small PRD-like document).

A good increment produced by this prompt:

- Is clearly tied to user or stakeholder value.
- Tests a specific assumption (product, UX, technical, or business).
- Has concrete, Gherkin-style acceptance criteria.
- Has a clear success signal (metric or observable behavior).
- Explicitly states what is **out of scope** for this increment.
- Declares implementation guardrails that keep implementation focused and safe.
- Fits coherently alongside existing increments, PRDs, and UI/UX design docs in the project.

The increment spec you generate will be used to:

- Align product, design, and engineering on **what** we are doing and **why**.
- Drive downstream design and implementation work (design, implement, improve).
- Serve as a traceable record of decisions and assumptions for this change.

You SHOULD:

- Use the prompt argument as the starting point for the increment’s intent.
- Use any available project-level guidance (such as `CONSTITUTION.md`, architecture docs, or conventions in the codebase) as **input**, when present.
- Look at existing increments and UI/UX/PRD docs under `docs/` to avoid duplication and respect established patterns.
- Fall back to the project’s root `README.md` and the user’s answers if guidance files are missing.
- Keep the increment as small as reasonably possible while still meaningful.
- Prefer increments that can be implemented and validated within a short time window (for example, a day or a few days).
- Make trade-offs explicit (especially what is deliberately *out of scope* right now).

You MUST NOT:

- Ignore the prompt argument or change the direction of the increment without user confirmation.
- Assume that a `CONSTITUTION.md` file exists.
- Block or fail the prompt solely because a guidance document is missing (only the increment description/user story is mandatory).
- Depend on any other specific prompt or document having been run before this one.