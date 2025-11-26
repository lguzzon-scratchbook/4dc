# 4DC - 4 Document Cascade

A structured documentation system that separates project concerns across different roles and perspectives, enabling AI-assisted development with clear boundaries between strategy, requirements, architecture, and implementation.

## Philosophy: Emergent Architecture

4DC follows Kent Beck's principle: **"Make it work, make it good, make it fast."**

The system captures decisions at two levels:
- **Constitution (WHY):** Foundational principles and technology choices made upfront
- **Design Records (HOW Patterns):** Architecture patterns that **emerge during implementation** and should guide future work

This creates a **learning system** where each feature contributes to the project's architectural knowledge:
1. Build features that work
2. Refactor to identify patterns
3. Codify patterns as ADRs for consistency
4. Future features reference both Constitution and accumulated design wisdom

## Why This Structure?

Traditional development mixes strategic decisions, user requirements, technical design, and implementation details into scattered docs, comments, and tribal knowledge. This creates confusion: Should this be tested? Which framework? Does this align with our principles?

**The four-document cascade solves this by:**
- **Establishing constraints first** (Constitution) - No revisiting "should we use TypeScript?" mid-feature
- **Separating user value from technical details** (Feature vs ADR) - Product owners focus on "what," developers on "how"
- **Making trade-offs explicit** (ADR) - Future developers understand *why* decisions were made
- **Enabling autonomous execution** (Tasks) - Developers or AI can implement without constant clarification

Each document answers one question. Each question builds on the previous answer. No repetition, no ambiguity.

## The Five Phases

### 1. Constitution (WHY) - CTO/Architect
Establishes the foundational principles and technology choices made upfront.

**File:** `CONSTITUTION.md`  
**Command:** `/create-constitution`

### 2. Feature (WHAT) - Product Owner
Describes what to build from the user's perspective, respecting constitutional constraints.

**Files:** `[feature-name]/feature.md`  
**Command:** `/new-increment`

### 3. Design (HOW - Initial Sketch) - Developer
Sketches initial technical approach without committing to final decisions.

**Files:** `[feature-name]/design.md`  
**Command:** `/design`

### 4. Breakdown (HOW - Detailed) - Developer
Breaks down implementation into small, verifiable tasks.
## Hierarchy & Flow

```
Constitution (WHY - Foundational)
    ↓ constrains
Feature (WHAT - User Value)
    ↓ guides
Design (HOW - Initial Sketch)
    ↓ directs
Breakdown (HOW - Detailed Tasks)
    ↓ implements
Working Code
## Workflow

1. **Constitution** → Define foundational principles and tech choices (once per project)
2. **Feature** → Describe user need (respects constitution)
3. **Design** → Sketch initial approach (not final decisions)
4. **Breakdown** → Create small, verifiable tasks
5. **Implement** → Build until acceptance criteria pass
6. **Improve** → Refactor, identify patterns, suggest ADRs
## VS Code Prompt Files

The root directory contains [VS Code Copilot prompt files](https://code.visualstudio.com/docs/copilot/customization/prompt-files) for the 4DC workflow:

- `create-constitution.prompt.md` → `/create-constitution`
- `new-increment.prompt.md` → `/new-increment`
- `design.prompt.md` → `/design`
- `breakdown.prompt.md` → `/breakdown`
- `improve.prompt.md` → `/improve`

Each prompt file includes:
- YAML metadata for VS Code Copilot Chat integration
- Detailed process instructions
- STOP checkpoints to prevent skipping steps
- Self-check validation sections

**Usage in VS Code:**
```
@workspace /create-constitution
@workspace /new-increment add todo item
@workspace /design
@workspace /breakdown
@workspace /improve
```e** phase, patterns emerge that should hold true across the entire codebase. These are captured as Architecture Decision Records (ADRs) in the `design/` folder:

**Structure:**
```
design/
  001-shared-validation-pattern.md
  002-error-handling-convention.md
  003-state-management-approach.md
```

**When to create an ADR:**
- A pattern appears across multiple features
- An architectural decision has project-wide implications
- A convention emerged that future features should follow
- A trade-off was made that needs to be consistently applied

**ADR Format:**
- **Context:** What problem does this solve?
- **Decision:** What pattern/approach should be used?
- **Consequences:** What are the implications?
- **Alternatives Considered:** What else was evaluated?

## Example

Complete workflow in `examples/todo/`:

**Project Setup:**
- `examples/todo/CONSTITUTION.md` - Principles: Zero Build Complexity, Browser-Native First

**Feature Implementation:**
- `examples/todo/add-todo-item/feature.md` - User story with Gherkin acceptance criteria
## Key Principles

**Separation of Concerns:**
- Constitution = WHY (principles, foundational tech)
- Feature = WHAT (user value, acceptance criteria)
- Design = HOW Initial (sketch, not commitment)
- Breakdown = HOW Detailed (small verifiable steps)
- Improve = Make It Good (refactor, discover patterns)
- Design Records = HOW Patterns (emergent, project-wide)

**Emergent vs. Upfront:**
- ✅ Decide upfront: Principles, frameworks, constraints (Constitution)
- ❌ Don't decide upfront: Specific patterns, abstractions, conventions
- ✅ Discover through doing: Architecture patterns emerge during implementation
- ✅ Codify when validated: After 2-3 uses, document pattern as ADR

**Learning System:**
Each feature contributes architectural knowledge. Early features establish patterns. Later features benefit from accumulated wisdom. The system gets smarter over time.

## Benefits

- **AI-Friendly:** Clear document boundaries make AI generation reliable
- **No Premature Optimization:** Patterns emerge from real code, not speculation
- **Consistency Over Time:** ADRs ensure similar problems get similar solutions
- **Onboarding Advantage:** New developers read Constitution + Design Records to understand project conventions
- **Refactoring Confidence:** Documented patterns make it clear what should be preserved vs. changed
```

## Workflow

1. **Constitution** → Define technical foundation
2. **Feature** → Describe user need (respects constitution)
3. **ADR** → Make technical decisions (complies with constitution, implements feature)
4. **Tasks** → Execute implementation (follows ADR within all constraints)
5. **Implement** → Check off tasks as you go

## Templates

AI generation guides for each document type:

- `create-constitution.md`
- `create-feature.md`
- `create-adr.md`
- `create-tasks.md`

## Example

Complete workflow in `example/`:

- `example/CONSTITUTION.md` - EpicSum project
- `example/sum-time-by-ticket/feature.md`
- `example/sum-time-by-ticket/adr.md`
- `example/sum-time-by-ticket/tasks.md`

## Copilot Prompt Files

The `prompts/` directory contains [VS Code Copilot prompt files](https://code.visualstudio.com/docs/copilot/customization/prompt-files) that package the 4DC templates as reusable AI prompts. These files include YAML front-matter metadata and can be used directly in VS Code's Copilot Chat to generate constitutions, features, ADRs, and task lists.

**For repository-level use, we recommend moving these prompts to `.github/prompts/` for better discoverability and alignment with GitHub conventions:**

```bash
mkdir -p .github/prompts
cp prompts/*.md .github/prompts/
```

Once moved, reference them in Copilot Chat as `#file:.github/prompts/create-feature.md` instead of `#file:prompts/create-feature.md`.

**Learn more:**
- [prompts/README.md](prompts/README.md) - Detailed usage guide, reuse strategies, and best practices
- [VS Code Copilot Prompt Files Documentation](https://code.visualstudio.com/docs/copilot/customization/prompt-files)