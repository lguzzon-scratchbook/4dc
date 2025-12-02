
# Implementation Output Format

The implementation output must:
* After each high-level task is completed (and before switching to the next), make an incremental commit to the increment branch. This must be done explicitly to ensure progress is tracked and changes can be reverted easily.
- Present a list of high-level tasks to the user first. These are derived directly from the increment definition and design.
- For each high-level task, break it down into 2-5 subtasks. Subtasks are atomic steps that, when all completed, make the parent task complete.
- All technical details and steps must be derived from the increment definition and design documentation.
- Subtasks should be concise, completable in 5-15 minutes, and mapped directly to acceptance criteria and design details.
- High-level tasks must include a formal verification method (manual check, unit test, code review, etc.). For subtasks, include a brief inline check parenthetically when helpful.

## 0. Drift Guardrails (Declare Up Front)
- State the initial scope: increment name, acceptance criteria, and the Planned Files Summary.
- Include a DRIFT ALERT policy: if work requires touching files or modules outside scope, STOP and propose scope adjustment.
- Include a rollback/containment note: prefer minimal scope updates, or split into a follow-up increment.

## 1. Planned Files Summary (Confirm Before Coding)
- List files to add/modify/delete for this increment, each on one line:
	- `path/to/file.ext` — new|modify|delete — 1-line purpose
- Present this list to the user and pause for confirmation or edits before starting implementation.

## 2. Implementation Tasks & Subtasks
Use Markdown checkboxes (`- [ ]`) for each main task and subtask. Update to `- [x]` when completed.
Tasks can be high-level. Subtasks must be concise and human-first, yet unambiguous for LLMs:
- 2–5 subtasks per task; each subtask is max one line, imperative, and uses plain language.
- Include concrete identifiers in backticks for precision (file paths, commands, symbols).
- Preferred pattern: `- [ ] <natural language> — include 
  
	backticked artifact(s) and a brief why (verify ...)`
- Avoid cryptic shorthand (e.g., use "dependencies" not "deps").
- Include brief inline checks where helpful (e.g., "verify file created").
- Start with setup, proceed through implementation, integration, review, and deploy.

## 4. Code Implementation
- Provide only the essential code needed for completed subtasks.
- Prefer minimal diffs or final file snippets; keep commentary brief and human-oriented.
- Ensure code is testable and maintainable.

## 5. Validation
- Describe how implementation meets acceptance criteria and design constraints, referencing specific subtasks and their outcomes.

## 6. Key Decisions & Trade-offs
- Document important implementation choices, trade-offs, and alternatives considered.

## 7. Open Questions
- List technical unknowns or deferred decisions to resolve during further development.

## 8. Post-Implementation Stabilization & Merge
- Hygiene: add `.gitignore` entries for build outputs; untrack committed artifacts.
- Reproducibility: ensure `Makefile`/scripts can build from clean checkout; document prerequisites.
- Packaging/Distribution: verify bundle/packaging tasks if part of acceptance criteria.
- Branch Flow: rebase/merge into default branch, push, optionally tag, and delete feature branch.

---
**Example Structure:**

```markdown
# Implementation: [Increment Name]

## Planned Files Summary (Confirm Before Coding)
- `src/component.svelte` — new — Catalog list component
- `src/component.test.js` — new — Unit tests for catalog list

## Implementation Tasks & Subtasks
- [ ] **Setup**
	- [ ] Create increment branch: run `git checkout -b <prefix>[increment-name]` (verify branch exists)
	- [ ] Install dependencies: run package manager (e.g., `npm install`) (verify install succeeds)
- [ ] **Catalog List Component**
	- [ ] Create `src/component.svelte` for the catalog list (verify file exists)
	- [ ] Define props and initial state in `src/component.svelte` (verify props/state present)
	- [ ] Render static list from sample data in `src/component.svelte` (verify output in app)
	- [ ] Add image rendering to `src/component.svelte` (verify images display)
	- [ ] Add unit test in `src/component.test.js` (run, verify pass)
````markdown
# Implementation Output Format

The implementation output must:
* Present high-level tasks mapped to acceptance criteria.
* Provide a Planned Files Summary and obtain confirmation before coding.
* Maintain Markdown checkboxes for tasks/subtasks (living plan) updated after each high-level task commit.
* Include verification method per high-level task (test or manual check).
* Keep code diffs minimal and scoped to the increment.
* Record final decisions in a lightweight Decision Log section (architectural changes → ADR instead).
* STOP and raise DRIFT ALERT for out-of-scope additions.

## 0. Drift & Living Plan Declaration
- Scope: list increment name + acceptance criteria reference.
- Planned Files Summary: confirmed file set.
- Drift Policy: announce DRIFT ALERT before touching unplanned files.
- Plan Update Rule: update checkboxes + Decision Log immediately after each high-level task commit.

## 1. Planned Files Summary (Confirm Before Coding)
- `path/to/file.ext` — new|modify|delete — purpose

## 2. Implementation Tasks & Subtasks
- Use `- [ ]` / `- [x]` checkboxes.
- 2–5 concise subtasks per high-level task.
- Each subtask: imperative, one line, includes identifiers in backticks.
- Inline verification hint where useful (e.g., “verify test fails”, “verify file exists”).

## 3. Verification Methods
- For each high-level task: specify test command or manual steps + expected outcome.

## 4. Code Implementation
- Show only essential new/changed snippets.
- Prefer minimal diffs; avoid full-file dumps unless necessary.

## 5. Validation
- Map tasks → acceptance criteria; confirm all satisfied.

## 6. Decision Log (Final Decisions Only)
Entry format:
`YYYY-MM-DD | Decision | Rationale | Scope Impact (none|minimal|requires ADR)`

## 7. Open Questions
- Items requiring follow-up or ADR drafting.

## 8. Stabilization & Merge Checklist
- Docs updated (`README`, increment docs)
- Hygiene done (.gitignore + untrack artifacts)
- Repro build verified
- Packaging/bundle verified (if applicable)
- Ready to merge feature branch

---
**Example (Abbreviated):**
```markdown
# Implementation: Tray Menu

## Planned Files Summary
- `pkg/tray/menu.go` — new — tray adapter
- `pkg/tray/menu_test.go` — new — unit tests

## Tasks & Subtasks
- [ ] **Setup**
  - [ ] Create branch `feature/tray-menu` (verify branch exists)
  - [ ] Add skeleton `pkg/tray/menu.go` (verify compile)
- [ ] **Menu Logic**
  - [ ] Define `Item` struct in `pkg/tray/menu.go` (verify compile)
  - [ ] Implement click handler dispatch (verify manual test)
  - [ ] Add unit test `menu_test.go` (run, verify fail)
  - [ ] Implement logic to pass test (run, verify pass)
- [ ] **Integration**
  - [ ] Wire adapter in `cmd/app/main.go` (verify tray appears)
  - [ ] Manual test start/stop actions (observe stdout)
- [ ] **Stabilization**
  - [ ] Update README usage section (verify updated)
  - [ ] Commit & Decision Log entry

## Decision Log
2025-12-02 | Use adapter pattern | Enforces isolation from lib API | minimal
```
````
