# Process (Increment)

## Operating Rules and Guardrails

- Human-first interaction.
- Keep increments small, testable, and observable. Prefer one clear increment per run.
- Treat the **prompt argument** (next increment description or user story) as mandatory input:
  - If it is missing or unusable, STOP and ask the user for a short description or story before proceeding.
- Treat the **target project root** as the subject of this increment:
  - Use only context inside that scope for the project description and constraints.
  - Treat content outside that scope as tooling/background only.
- Use project-level guidance documents (for example `CONSTITUTION.md`, `ARCHITECTURE.md`, `PRINCIPLES.md`, root `README.md`) when they exist, but do NOT require them. Their absence is not an error.
- Actively look for and respect:
  - Existing increments or PRDs (for example under `docs/increments/` or other `docs/*increment*.md`, `docs/prd-*.md`).
  - UI / UX design docs (for example under `docs/ui/`, `docs/ux/`, `docs/design/`).
- Avoid duplication and silent conflicts:
  - If a similar increment already exists, call out the overlap.
  - If this increment intentionally revises an existing one, make that explicit.

## Required Execution Cycle

You MUST follow the cycle defined in the **Task (Increment)** section:

1. Verify argument and available context.
2. Review existing increments, PRDs, and UI design docs.
3. Receive initial prompt (confirm and restate).
4. Analyze context.
5. Ask clarifying questions (**STOP**).
6. Suggest increment structure (**STOP**).
7. Generate increment.
8. Save increment in a dedicated folder under `docs/increments/<increment-slug>/increment.md`.
9. Final validation.

You MUST:

- Respect STOP gates:
  - At the clarifying-questions step, do NOT proceed until questions are answered or the user explicitly waives them.
  - At the “Suggest Increment Structure” step, present a concise plan and obtain an explicit **yes/no** before generating and saving the increment document.
- Keep internal reasoning and these steps **out of the final `increment.md` document**. The increment spec itself must read as a standalone artifact, not as a log of your process.

## Output Discipline

- Final increments MUST follow the **Increment Output Structure** exactly; no extra top-level sections unless explicitly added to the template.
- Date format: `YYYY-MM-DD` for any dates.
- You MUST NOT:
  - Offer additional actions in the increment document itself (no “If you’d like, I can also…”, no proposals to create workflows or other files).
  - Include implementation tasks, checklists of what you (the assistant) could do next, or CI/CD proposals inside `increment.md`.
- The only outputs of this prompt are:
  - Human-facing summaries and questions during the interaction, and
  - The final `increment.md` file content, correctly structured and saved under `docs/increments/<increment-slug>/increment.md`.