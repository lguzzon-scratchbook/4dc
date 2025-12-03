# Output Structure (Increment)

You MUST:

- Output only the increment specification document in Markdown, using the structure defined in this file.
- NOT include any meta commentary about what you (the assistant) could do next (for example, "If you'd like, I can also add...", "Next, I can create...", "I can generate a workflow").
- NOT include suggestions for additional files, CI workflows, or other automation tasks inside the increment.
- NOT mention branches, pull requests, or any git operations.
- NOT list or propose specific files, modules, packages, or dependencies to add/modify/delete.

Note: This increment document defines **product scope and intent only**. It must stay implementation-agnostic:

- No branches.
- No file paths.
- No specific dependencies or code structures.

Return the result as **Markdown** with the following structure:

```markdown
# [Increment Title]

## Job Story
**When** [situation]  
**I want to** [action]  
**So I can** [outcome]

**Assumption Being Tested:** [Specific hypothesis for this increment]

## Acceptance Criteria
- **Given** [precondition]  
  **When** [action]  
  **Then** [observable outcome]
- **Given** [another precondition]  
  **When** [action]  
  **Then** [observable outcome]
- **Given** [error condition]  
  **When** [action]  
  **Then** [error handling outcome]
<!-- Additional scenarios as needed, keeping total criteria typically between 3–5. -->

## Success Signal
[How we know this increment works – a metric or concrete observation]

## Out of Scope
- [What this increment does NOT include to keep focus tight]

## Implementation Guardrails

[Short, product-level guidance for engineers implementing this increment.]

- **Scope discipline:** If implementation work requires touching parts of the system clearly outside this increment’s acceptance criteria, STOP and:
  - Call out the scope drift, and
  - Propose either a small adjustment to this increment or a follow-up increment.
- **Traceability:** Implementation work should map back clearly to:
  - The job story,
  - The assumption being tested, and
  - The acceptance criteria defined above.
- **Validation-first mindset:** Prefer implementation approaches that make it easy to:
  - Observe whether the assumption holds, and
  - Verify each acceptance criterion with tests or explicit manual checks.

You MUST NOT in this section:

- Mention branches, pull requests, or any git workflow details.
- List specific files, folders, modules, or external dependencies.
- Describe concrete code-level implementation steps.