# Task (Increment)

Your task is to help the team turn the **provided description or user story** into **one small, high-leverage increment** that:

- Is clearly tied to user or stakeholder value.
- Tests a specific assumption (product, UX, technical, or business).
- Has concrete, Gherkin-style acceptance criteria.
- Has a clear success signal (metric or observable behavior).
- Explicitly states what is **out of scope** for this increment.
- Declares implementation guardrails that keep implementation focused and safe.

You MUST follow this high-level cycle **exactly**:

1. **Verify argument and available context**

   - Check the prompt argument:
     - If it clearly describes a desired change or user story, treat it as the initial increment idea.
     - If it is missing, empty, or not about a change:
       - STOP and ask the user for a short description or user story for the increment.
       - Do not continue until you have one.
   - Look for the following, in this order, under the target project root:
     - A project-level guidance document such as `CONSTITUTION.md` (if present).
     - Architecture or principles docs (for example `ARCHITECTURE.md`, `PRINCIPLES.md`, or similar).
     - The project’s root `README.md`.
   - Use whatever is available to infer:
     - Project purpose and target users.
     - Existing principles, constraints, and non-negotiables.
   - If none of these documents are present, ask the user to briefly describe:
     - What the project is for.
     - Who the users are.
     - Any hard constraints (for example, performance, security, compliance).

2. **Review existing increments, PRDs, and UI design docs**

   - Under the target project root, actively look for:
     - Existing increment or PRD docs:
       - `docs/increments/*/increment.md`
       - Other `docs/*increment*.md`, `docs/prd-*.md`, or similar.
     - UI / UX design docs:
       - `docs/ui/`, `docs/ux/`, `docs/design/`
       - Files named like `*-ui.md`, `*-ux.md`, `*-design.md`, `ui-spec*.md`.
   - For any relevant documents you find:
     - Check whether a similar capability has already been specified.
     - Note dependencies or sequencing (for example “increment B depends on increment A”).
     - Note any established UI flows or patterns this increment should follow.
   - Summarize for the user:
     - Any overlapping or related existing increments.
     - Any obvious conflicts (for example a feature already defined differently).
     - Any key design constraints implied by existing UI docs.
   - If you detect a likely conflict (this increment tries to redefine an existing one):
     - Call it out explicitly.
     - Ask the user whether this is a revision of an existing increment or a new one.

3. **Receive initial prompt (confirm and restate)**

   - Restate the increment description or user story in your own words.
   - Confirm with the user that your restatement matches their intent, or ask for a quick correction.
   - Clarify whether this is primarily a:
     - Feature,
     - Fix,
     - Refactor,
     - Chore, or
     - Spike / exploration.

4. **Analyze context**

   - Combine:
     - The argument and user clarifications.
     - Project-level docs (`CONSTITUTION.md`, `README.md`, architecture/principles docs).
     - Relevant existing increments and UI/PRD docs.
   - From these, infer:
     - Relevant principles (for example speed vs safety, simplicity vs flexibility).
     - Technical or architectural constraints that obviously affect the increment.
     - Any existing patterns you should align with (for example module boundaries, layering, UI patterns).
   - Share a short, human-readable summary of these findings with the user, including:
     - How this increment fits alongside existing increments.
     - Any notable dependencies or constraints.

5. **Ask clarifying questions (STOP)**

   - Ask 2–3 targeted questions to refine the increment, focusing on:
     - Capability / action:
       - “What specific capability are we building in this increment?”
     - Assumption under test:
       - “What assumption or hypothesis are we testing with this change?”
     - Success definition:
       - “What does success look like for this increment (behavior or metric)?”
   - Optionally, if relevant:
     - “Should this increment follow the existing UI pattern from [name of UI doc]?”

   **STOP here** until:

   - The user has answered, or
   - The user explicitly waives specific questions.

   Do not proceed silently past this point.

6. **Suggest increment structure (STOP)**

   - Propose a small, testable increment structure including:
     - Title.
     - Job story.
     - Assumption being tested.
     - 3–5 Gherkin-style acceptance criteria.
     - Success signal (metric or observable behavior).
     - Out-of-scope list (what is explicitly NOT included).
   - Ensure the structure:
     - Respects project-level principles and constraints.
     - Fits coherently alongside existing increments and PRDs.
     - Does not silently contradict existing UI design docs without calling it out.

   - Present this as a short, human-readable summary that a PO and engineers can easily review.

   Then ask the user explicitly:

   > I plan to generate an `increment.md` document for this increment, stored under a new folder in `docs/increments/` named after this increment.  
   > Would you like me to generate and save this increment now? (yes/no)

   **STOP here**:

   - If the user answers **no**:
     - Revise the structure based on their feedback and re-present it.
   - If the user answers **yes**:
     - Proceed to generate the increment document.

7. **Generate increment**

   - After a **yes**, generate `increment.md` following the **Increment Output Structure**.
   - Ensure all required sections are present and consistent with the available project context and existing docs.
   - Do NOT include meta commentary or extra suggestions in the increment document (no “I can also…”; no offers to create other files or workflows).

8. **Save increment**

   You MUST save the increment under a **new folder** within `docs/increments/` in the target project root:

   - Derive a **folder name** from the increment title:
     - Use a lowercase, hyphen-separated “slug” based on the title.
     - Example: `"Export reports to CSV"` → `export-reports-to-csv`.
   - Create a folder:
     - `docs/increments/<increment-slug>/`
   - Inside that folder, write the increment specification as:
     - `docs/increments/<increment-slug>/increment.md`

   Saving rules:

   - If `docs/` or `docs/increments/` do not exist, treat them as directories that can be created under the target project root.
   - Do **not** reuse the same folder for unrelated increments; each increment gets its own folder.
   - If the user explicitly provides a different folder name or path for the increment, prefer that path but keep the rule “a dedicated folder per increment”.

   After saving:

   - Tell the user the exact path where `increment.md` was written (for example `docs/increments/export-reports-to-csv/increment.md`).
   - Confirm that all sections from the output structure are included.

9. **Final validation**

   - Check that the increment:
     - Has a clear job story.
     - Tests one explicit assumption.
     - Has 3–5 Gherkin-style acceptance criteria.
     - States a concrete success signal.
     - Includes an Out-of-Scope section.
     - Includes Implementation Guardrails & Branching.
   - If anything is missing or inconsistent:
     - Ask the user whether to fix now or defer.
     - If fixing now, adjust the increment and re-validate.

You MUST NOT:

- Skip STOP gates or proceed without explicit confirmation where required.
- Ignore or override the original description/user story without user confirmation.
- Ignore obviously relevant existing increments, PRDs, or UI design docs under `docs/` when they exist.
- Propose or describe what **you**, the assistant, could do next (for example, “I can also create CI workflows for you”).
- Include offers to create additional files, tickets, or workflows inside the increment document.