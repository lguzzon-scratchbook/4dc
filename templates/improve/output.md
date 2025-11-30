# Improve Output Format

The improve output must follow this structure to ensure clarity, traceability, and actionable progress for each improvement.

## Output Schema: Improve.md

The generated `improve.md` file must contain the following sections:

### 1. Assessment
Evaluate the implemented increment against the Constitution and Design goals:
- **Alignment with Constitution:** How well does the implementation adhere to the project's core principles and constraints?
- **Alignment with Design Goals:** Does the implementation meet the intended design approach, component boundaries, and data flow?
- **Quality Evaluation:** Assess code quality, readability, maintainability, and testability.
- **Risks Identified:** List technical debt, potential bugs, performance concerns, or security issues.
- **Architectural Opportunities:** Identify opportunities for improved structure, patterns, or abstractions.

### 2. Lessons
Document learnings from the implementation:
- **What Worked Well:** Patterns, approaches, or decisions that proved effective.
- **What Could Be Improved:** Areas where the implementation fell short or could be enhanced.
- **Unexpected Challenges:** Issues that arose during implementation and how they were addressed.
- **Emerging Patterns:** Recurring solutions or approaches that could be standardized.

### 3. ADR Candidates
Surface candidates for Architectural Decision Records (ADRs):
- **Divergent Implementations:** Identify areas where different approaches exist (e.g., error handling, validation, component structure).
- **Pattern Candidates:** Suggest patterns that could be codified to align the codebase.
- **Recommendation:** For each candidate, explicitly state whether an ADR should be created and why.
- **Note:** ADR creation is left to the user's discretion. Only recommend ADRs for broadly relevant patterns or architectural decisions, not for trivial or stylistic changes.

When an ADR is recommended, reference the ADR template in `adr.md` for the required format.

### 4. Improvements
Propose actionable refinements for future increments:
- **Refactoring Tasks:** Specific code changes to improve clarity, simplicity, or maintainability, grouped by lens context.
- **Lens Coverage:** List which lenses were applied (Naming & Clarity, Modularity & Separation, Architecture & Patterns, Testing & Reliability, Duplication & Simplicity, Documentation & Communication).
- **Priority:** Indicate priority (high/medium/low) for each improvement.
- **Effort Estimate:** Provide rough time estimates (15-30 min increments).
- **Rationale:** Explain why each improvement is recommended, referencing the relevant lens.

---

## Verification Criteria

Before finalizing the improve.md output, verify:
- [ ] **Assessment** section evaluates implementation against Constitution and Design goals
- [ ] **Lessons** section documents learnings, challenges, and emerging patterns
- [ ] **ADR Candidates** section explicitly surfaces candidates for review with clear recommendations
- [ ] **Improvements** section contains actionable, prioritized refinements with lens mapping
- [ ] At least 3 lenses are covered in the analysis
- [ ] Each refactoring suggestion is labeled with its lens context
- [ ] ADR candidates are ready to inform next increments
- [ ] Improvements are explicit and actionable

---

## Example Structure

```markdown
# Improve: [Increment Name]

## 1. Assessment

### Alignment with Constitution
- [Analysis of adherence to project principles]

### Alignment with Design Goals
- [Analysis of implementation vs. design approach]

### Quality Evaluation
- [Code quality assessment]

### Risks Identified
- [Technical debt, bugs, performance, security concerns]

### Architectural Opportunities
- [Opportunities for improved structure]

---

## 2. Lessons

### What Worked Well
- [Effective patterns and approaches]

### What Could Be Improved
- [Areas for enhancement]

### Unexpected Challenges
- [Issues encountered and resolutions]

### Emerging Patterns
- [Recurring solutions to consider standardizing]

---

## 3. ADR Candidates

### Candidate 1: [Pattern/Decision Name]
- **Observation:** [Describe the divergent implementations or emerging pattern]
- **Recommendation:** [Create ADR / Do not create ADR]
- **Rationale:** [Why this is/isn't a good ADR candidate]

### Candidate 2: [Pattern/Decision Name]
- **Observation:** [...]
- **Recommendation:** [...]
- **Rationale:** [...]

---

## 4. Improvements

### Naming & Clarity
- [ ] **[Task Name]** (Priority: [H/M/L], Effort: [X min])
  - Rationale: [Why this improves the code]

### Modularity & Separation
- [ ] **[Task Name]** (Priority: [H/M/L], Effort: [X min])
  - Rationale: [Why this improves the code]

### Architecture & Patterns
- [ ] **[Task Name]** (Priority: [H/M/L], Effort: [X min])
  - Rationale: [Why this improves the code]

### Testing & Reliability
- [ ] **[Task Name]** (Priority: [H/M/L], Effort: [X min])
  - Rationale: [Why this improves the code]

### Duplication & Simplicity
- [ ] **[Task Name]** (Priority: [H/M/L], Effort: [X min])
  - Rationale: [Why this improves the code]

### Documentation & Communication
- [ ] **[Task Name]** (Priority: [H/M/L], Effort: [X min])
  - Rationale: [Why this improves the code]

### Lens Coverage Summary
- [x] Naming & Clarity
- [x] Modularity & Separation
- [x] Architecture & Patterns
- [ ] Testing & Reliability
- [x] Duplication & Simplicity
- [ ] Documentation & Communication

---

## Key Decisions & Trade-offs
- [Important choices and alternatives considered]

## Open Questions
- [Technical unknowns or deferred decisions]
```
