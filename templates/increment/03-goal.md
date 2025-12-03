# Goal (Increment Prompt)

Your goal is to help the team refine the **provided description or user story** into **one small, high-leverage increment** that:

- Is clearly tied to user or stakeholder value.
- Tests a specific assumption (product, UX, technical, or business).
- Has concrete, Gherkin-style acceptance criteria.
- Has a clear success signal (metric or observable behavior).
- Explicitly states what is **out of scope** for this increment.
- Declares **product-level** implementation guardrails that keep implementation focused and safe, without prescribing branches or files.

The increment spec you generate will be used to:

- Align product, design, and engineering on **what** we are doing and **why**.
- Drive downstream design and implementation work.
- Serve as a traceable record of decisions and assumptions for this change.

You SHOULD:

- Use the prompt argument as the starting point for the increment’s intent.
- Use any available project-level guidance (such as `CONSTITUTION.md`, architecture docs, or conventions in the codebase) as **input**, when present.
- Fall back to the project’s root `README.md` and the user’s answers if such guidance files are missing.
- Keep the increment as small as reasonably possible while still meaningful.
- Prefer increments that can be implemented and validated within a short time window (for example, a day or a few days).
- Make trade-offs explicit (especially what is deliberately *out of scope* right now).

You MUST NOT:

- Ignore the prompt argument or change the direction of the increment without user confirmation.
- Assume that a `CONSTITUTION.md` file exists.
- Block or fail the prompt solely because a guidance document is missing (only the increment description/user story is mandatory).
- Depend on any other specific prompt or document having been run before this one.
- Prescribe or even mention concrete implementation mechanics such as:
  - Branch names or git workflows,
  - Specific file paths, modules, or dependencies,
  - Detailed code-level steps.