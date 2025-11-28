# Improvement Output Format
The generated improvement should include the following sections:
## 1. Title
Short, descriptive title for the improvement.
## 2. Assessment
Evaluate the increment and implementation against Constitution and Design goals. List problems, risks, and lessons learned.
## 3. Lessons
Summarize key architectural and implementation lessons.
## 4. ADRs
For each new architectural decision, provide:
	- Context
	- Decision
	- Consequences
	- Alternatives considered
## 5. Improvement Tasks & Subtasks
- Present a list of high-level improvement tasks first, derived from assessment and lessons.
- For each high-level task, break it down into 2-5 atomic subtasks, each completable in 15-30 minutes.
- Subtasks should be concise, directly mapped to assessment and lessons, and include a verification method (manual check, unit test, code review, etc.).
- Use Markdown checkboxes (`- [ ]`) for each main task and subtask. Update to `- [x]` when completed.
- After each high-level task is completed (and before switching to the next), make an incremental commit to the feature branch. This must be done explicitly to ensure progress is tracked and changes can be reverted easily.
## 6. Code Implementation
- Provide code for each subtask/module, with comments explaining logic and decisions.
- Ensure code is testable and maintainable.
## 7. Success Criteria
How we know this improvement is successful—metric or observation.
---
**Example Structure:**
```markdown
# [Improvement Title]

## Assessment
- [Problem or risk]
- [Lesson learned]

## Lessons
- [Key architectural lesson]
- [Implementation lesson]

## ADRs
# ADR: [Decision Title]
## Context
[Description of the situation or pattern]
## Decision
[Clear statement of the decision]
## Consequences
- [Benefit or drawback]
- [Another consequence]
## Alternatives Considered
- [Alternative approach]: [Reason not chosen]
- [Another alternative]: [Reason not chosen]

## Improvement Tasks & Subtasks
- [ ] **Refactor validation logic**
	- [ ] Extract validation to shared module (verify module created)
	- [ ] Update imports in affected files (verify imports)
	- [ ] Manual test validation (verify output)
- [ ] **Improve error handling**
	- [ ] Centralize error messages (verify centralization)
	- [ ] Add missing edge case tests (run tests, verify pass)

## Code Implementation
```js
// [Code for each subtask/module]
```

## Success Criteria
[How we know this improvement is successful - metric or observation]
```
