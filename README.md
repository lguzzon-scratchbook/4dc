# 4DC - 4 Document Cascade

A structured documentation system that separates project concerns across different roles and perspectives, enabling AI-assisted development with clear boundaries between strategy, requirements, architecture, and implementation.

## Why This Structure?

Traditional development mixes strategic decisions, user requirements, technical design, and implementation details into scattered docs, comments, and tribal knowledge. This creates confusion: Should this be tested? Which framework? Does this align with our principles?

**The four-document cascade solves this by:**
- **Establishing constraints first** (Constitution) - No revisiting "should we use TypeScript?" mid-feature
- **Separating user value from technical details** (Feature vs ADR) - Product owners focus on "what," developers on "how"
- **Making trade-offs explicit** (ADR) - Future developers understand *why* decisions were made
- **Enabling autonomous execution** (Tasks) - Developers or AI can implement without constant clarification

Each document answers one question. Each question builds on the previous answer. No repetition, no ambiguity.

## The Four Documents

### 1. Constitution (WHY) - CTO/Architect
Establishes the broad technical foundation: principles, tech stack, constraints.

**File:** `CONSTITUTION.md`

### 2. Feature (WHAT) - Product Owner
Describes what to build from the user's perspective, respecting constitutional constraints.

**Files:** `[feature-name]/feature.md`

### 3. ADR (HOW) - Senior Developer
Documents technical decisions that comply with the constitution and implement the feature.

**Files:** `[feature-name]/adr.md`

### 4. Tasks (HOW-Detailed) - Developer
Breaks down implementation following the ADR within all constraints.

**Files:** `[feature-name]/tasks.md`

## Hierarchy & Flow

```
Constitution (WHY)
    ↓ constrains
Feature (WHAT)
    ↓ guides
ADR (HOW)
    ↓ directs
Tasks (Implementation)
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