## Output

Return the result as **Markdown** with the following structure:

```markdown
# Engineering Constitution for {{team_or_product_name}}

## Purpose

Explain in 2–4 sentences:
- Why this CONSTITUTION exists.
- How it should be used in everyday work and in the 4dc loop (increment → design → implement → improve).

## Context

Summarize the environment and constraints:
- Product / domain:
  - ...
- Team:
  - ...
- Non-negotiables:
  - ...

## Our Principles and Trade-offs

Explain the team’s overall philosophy and how it relates to:
- Speed vs safety
- Short-term delivery vs long-term maintainability
- Experimentation vs stability

### Default Trade-off Rules

- When in doubt between **shipping faster** and **polishing the design**, we usually:
  - ...
- When in doubt between **adding a dependency** and **building it ourselves**, we usually:
  - ...
- When in doubt between **adding tests now** and **moving on**, we usually:
  - ...

---

## The 6 Pillars of Our Engineering

### 1. Delivery Velocity

Describe how the team thinks about:
- Desired iteration speed.
- Typical increment size.
- Release cadence and acceptable risk per release.

Include:

- **We optimize for:**
  - ...
- **We accept the following risks:**
  - ...
- **We avoid:**
  - ...

### 2. Test Strategy

Describe:
- What must be tested.
- How much coverage / confidence is “enough” for this team.
- Preferred testing pyramid (or hourglass) shape.

Include:

- **Minimum expectations:**
  - ...
- **When moving fast, we are allowed to:**
  - ...
- **We never skip tests for:**
  - ...

### 3. Design Integrity

Describe:
- How the team structures code and architecture.
- What “good boundaries” mean.
- How to think about modules, responsibilities, and dependencies.

Include:

- **We strive for:**
  - ...
- **We are okay with:**
  - "...some messiness in leaf modules as long as boundaries remain clear."
- **Red flags that trigger redesign or refactoring:**
  - ...

### 4. Simplicity First

Describe:
- How the team avoids premature abstraction and over-engineering.
- How to decide when to introduce patterns, indirection, or generalization.

Include:

- **We prefer:**
  - "The simplest thing that could possibly work, then iterate."
- **We add abstraction only when:**
  - ...
- **We treat complexity as acceptable when:**
  - ...

### 5. Technical Debt Boundaries

Describe:
- When it is acceptable to take shortcuts.
- How debt is recorded and prioritized.
- How and when debt must be paid.

Include:

- **Allowed short-term shortcuts:**
  - ...
- **Debt must be recorded when:**
  - ...
- **We commit to paying down debt when:**
  - ...

### 6. Dependency Discipline

Describe:
- How the team chooses, isolates, and upgrades dependencies (libraries, frameworks, external services).
- What “good” vs “bad” dependency use looks like.

Include:

- **We add a new dependency only when:**
  - ...
- **We isolate dependencies by:**
  - ...
- **We avoid:**
  - "Frameworks bleeding into our domain model", etc.

---

## How 4dc Uses This Constitution

Describe how this CONSTITUTION should be applied in each phase:

### increment (WHAT)
- How to size and shape increments.
- How pillars constrain increment scopes and acceptance criteria.

### design (HOW)
- Which pillars dominate early design decisions.
- When to introduce or update ADRs.

### implement (DO)
- Expectations for step size, testing, and adherence to design.
- How to decide when a shortcut is acceptable.

### improve (GOOD / FAST)
- When to refactor.
- When to invest in performance, resilience, or deeper design changes.
- How to prioritize technical debt paydown.

---

## Amendments and Evolution

Describe:
- How this CONSTITUTION can be updated.
- Under what circumstances you expect to revisit it (e.g., major product shift, team growth, repeated friction).
- How amendments should be documented (e.g., dated changes, versioning).

---

## References and Inspirations

List key references that influenced this CONSTITUTION, such as:

- Kent Beck – "make it work, make it right, make it fast"
- XP, Continuous Delivery, DORA, Clean Architecture, etc.
- Any internal documents or practices.

---

## Open Questions

List questions the team should explicitly revisit, for example:

- "What’s our acceptable MTTR vs MTBF trade-off?"
- "How strict should we be about mutation testing or coverage thresholds?"
- "What performance budgets matter most for our users?"

These should be concrete enough to guide future amendments.
```