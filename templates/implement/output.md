
# Implementation Output Format

The implementation output must:
* After each high-level task is completed (and before switching to the next), make an incremental commit to the feature branch. This must be done explicitly to ensure progress is tracked and changes can be reverted easily.
- Present a list of high-level tasks to the user first. These are derived directly from the increment definition and design.
- For each high-level task, break it down into 2-5 subtasks. Subtasks are atomic steps that, when all completed, make the parent task complete.
- All technical details and steps must be derived from the increment definition and design documentation.
- Subtasks should be concise, completable in 5-15 minutes, and mapped directly to acceptance criteria and design details.
- Only high-level tasks require a verification method (manual check, unit test, code review, etc.). Subtasks do not require individual verification.

## 1. Relevant Files
- List files that will be created or modified for this feature, with brief descriptions.

## 2. Implementation Tasks & Subtasks
Use Markdown checkboxes (`- [ ]`) for each main task and subtask. Update to `- [x]` when completed.
For each main implementation step, break it down into 2-5 specific subtasks:
  - Each subtask should describe exactly what will be done, how it will be verified, and what the expected result is.
  - Example: Instead of "Implement catalog list component," use:
    - [ ] Create Svelte component file (verify file created)
    - [ ] Define props and initial state (verify props/state in code)
    - [ ] Render static list from sample data (verify output in browser)
    - [ ] Add image rendering logic (verify images display)
    - [ ] Write unit test for rendering (run test, verify pass)
Each subtask must include a verification method (manual check, unit test, code review, etc.).
Start with setup, proceed through implementation, integration, review, and deploy.

## 4. Code Implementation
- Provide code for each subtask/module, with comments explaining logic and decisions.
- Ensure code is testable and maintainable.

## 5. Validation
- Describe how implementation meets acceptance criteria and design constraints, referencing specific subtasks and their outcomes.

## 6. Key Decisions & Trade-offs
- Document important implementation choices, trade-offs, and alternatives considered.

## 7. Open Questions
- List technical unknowns or deferred decisions to resolve during further development.

---
**Example Structure:**

```markdown
# Implementation: [Increment Name]

## Relevant Files
- `src/component.svelte` - Catalog list component
- `src/component.test.js` - Unit tests for catalog list

## Implementation Tasks & Subtasks
- [ ] **Setup**
	- [ ] Create feature branch: `git checkout -b feature/[increment-name]` (verify branch exists)
	- [ ] Install dependencies (verify install success)
- [ ] **Catalog List Component**
	- [ ] Create Svelte component file (verify file created)
	- [ ] Define props and initial state (verify props/state in code)
	- [ ] Render static list from sample data (verify output in browser)
	- [ ] Add image rendering logic (verify images display)
	- [ ] Write unit test for rendering (run test, verify pass)
- [ ] **Integration & Verification**
	- [ ] Integrate component into app (verify integration)
	- [ ] Manual test in browser (verify all features work)
- [ ] **Quick Review & Deploy**
	- [ ] Code review (verify standards)
	- [ ] Remove dead code/debug (verify cleanup)
	- [ ] Commit changes (verify commit)

## Code Implementation
```js
// [Code for each subtask/module]
```

## Validation
- Reference each subtask and describe how its completion meets acceptance criteria and design constraints.

## Key Decisions & Trade-offs
- [Important choices, trade-offs, alternatives]

## Open Questions
- [Technical unknowns or deferred decisions]
```
