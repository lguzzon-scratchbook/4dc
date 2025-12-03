# Inputs and Scope (Increment)

You will be given:

- A **prompt argument** that MUST contain a short description or user story for the next increment.  
  Examples:
  - “As a user, I want to export my reports to CSV so I can analyze them offline.”
  - “Add a breaks reminder after 4 completed Pomodoros.”
- The repository contents as exposed by the tools that call you.
- A **project root path argument** that identifies the TARGET project within this repository (for example `"."` or `"examples/pomodoro"`).
- Any project-level guidance documents that exist in that target root (for example: `CONSTITUTION.md`, `ARCHITECTURE.md`, `PRINCIPLES.md`).
- The project’s root `README.md`, if present.
- Any answers the user provides during this interaction.

## 1. Handling the prompt argument (mandatory)

- You MUST treat the prompt argument as required:
  - If it clearly describes a desired change or user story, treat it as the **initial increment idea**.
  - If it is missing, empty, or clearly not describing a change or story:
    - STOP and ask the user for a one- or two-sentence description or user story for the desired increment.
    - Do not proceed with the increment process until you have such a description.

- You SHOULD:
  - Rephrase the argument into your own clear summary early in the interaction.
  - Use clarifying questions later to refine details, not to invent a completely new direction.

## 2. Project root and high-level context

Use the project root path argument as the anchor for *this* project:

- Look in the **project root directory** (the directory referenced by the project root path argument) for:
  - `README.md` — high-level product and user context.
  - `CONSTITUTION.md` — principles, constraints, trade-offs (when present).
  - Architecture / principles docs (for example `ARCHITECTURE.md`, `PRINCIPLES.md`).
- Use these documents to understand:
  - What the project is for.
  - Who it serves.
  - Any stated principles, constraints, or non‑negotiables that should shape this increment.

If these documents are missing or incomplete, ask the user a small number of targeted questions to clarify only what you need to define a good increment.

## 3. Existing increments, PRDs, and design docs

You MUST actively look for **existing work that might shape this increment**, especially:

- **Increment specs / PRDs** such as:
  - Files under `docs/increments/` (for example `docs/increments/*/increment.md`).
  - Other increment-like documents under `docs/` that match the project’s conventions (for example `docs/*increment*.md`, `docs/prd-*.md`).
- **UI / UX design docs** such as:
  - `docs/ui/`, `docs/ux/`, `docs/design/` folders.
  - Files with names like `*-ui.md`, `*-ux.md`, `*-design.md`, or `ui-spec*.md`.

You MUST:

- Scan these locations relative to the project root:
  - `docs/increments/` (all subfolders and `increment.md` files).
  - Other `docs/` subdirectories that appear to hold PRDs or design artifacts.
- Use these documents to answer questions such as:
  - Has a similar increment already been defined?
  - Are there conventions for how increments are named and structured?
  - Are there existing UI flows or patterns this increment should follow?

You MUST NOT:

- Duplicate an existing increment without calling out the overlap.
- Redefine a feature that is already fully specified without highlighting the conflict.
- Ignore obvious dependencies or sequencing implied by existing increments or design docs.

## 4. Code and implementation structure

From subdirectories under the project root (for example `src/`, `lib/`, `app/`, `services/`, `tests/`):

- Treat code, tests, and internal docs as **implementation context**, not as product copy.
- Use them to:
  - Understand which modules or boundaries an increment might touch.
  - See how similar capabilities are implemented and tested.

You MUST NOT:

- Replace the product description with text from code comments.
- Infer entirely new product directions from internal implementation details.
- Extract or list specific file paths or modules as “planned changes” in this increment document.

## 5. Files outside the project root

- Files **outside** the project root path belong to other projects, tooling, or frameworks.
- You may look at them to understand general engineering style and conventions, but you MUST NOT:
  - Treat them as the subject of this increment.
  - Copy their product descriptions into this project’s increment.
  - Mention the host/framework repo name (for example `4dc`) in the increment, unless it is an explicit runtime dependency of this project.

## 6. When context is missing or conflicting

If important context is missing or conflicting (for example, no increments exist yet, UI docs are outdated, or multiple PRDs disagree):

- Ask the user a **small number of targeted questions** to clarify:
  - Whether similar work is already in progress.
  - Whether there is an existing PRD or design they want this increment to follow.
- Make your assumptions explicit in the increment when they materially affect scope or acceptance criteria.