## Inputs

The implementation plan MUST be grounded in:

1. The increment folder at `path`

   - The `path` argument points to an **increment folder** (for example: `.../increments/<slug>` or `.../docs/increments/<slug>`).
   - This folder already contains:
     - `increment.md`
     - `design.md`
   - Per the project’s constitution (“Implementation & Doc Layout”), this is also where `implement.md` for this increment should live.

2. The project root and constitution

   Under the project root (the parent of the increment folder), the LLM SHOULD read:

   - `CONSTITUTION.md` — including:
     - Values and principles.
     - Delivery/testing expectations.
     - Any `constitution-mode` (for example: `lite`, `medium`, `heavy`).
     - Any **Implementation & Doc Layout** guidance.
   - The main `README` or equivalent project description.
   - Relevant ADRs and `improve` documents.

3. The agreed Increment and Design

   - `increment.md` — WHAT:
     - Context and problem.
     - Goal, non-goals.
     - Tasks (WHAT level).
     - Risks, success criteria, observability.
   - `design.md` — HOW:
     - Architecture, components, and responsibilities.
     - Interfaces/contracts and data shapes.
     - Testing strategy, CI/CD, and observability plans.
     - Risks, trade-offs, follow-up work.

   The implementation plan MUST:
   - Respect the scope and non-goals in `increment.md`.
   - Realize the technical approach in `design.md` without redefining it.

4. Existing Code and Tests

   - Inspect relevant code and tests under the project root:
     - Files/modules mentioned in `design.md`.
     - Adjacent code that will likely be touched by this increment.
   - This helps:
     - Make work items concrete (files, modules).
     - Avoid surprises (for example: existing patterns/tests to reuse).

5. Increment Qualities

   The plan MUST support an implementation that is:

   - **Small** – steps are small enough to complete quickly.
   - **Testable** – each step suggests tests to add/update/run.
   - **Releasable** – work can be merged and released in small slices.
   - **Observable** – changes relevant to observability in the design are reflected in tasks (for example: adding logs or metrics where planned).