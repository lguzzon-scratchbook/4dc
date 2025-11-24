# AI Dev Tasks

A structured documentation system that separates project concerns across different roles and perspectives, enabling AI-assisted development with clear boundaries between strategy, requirements, architecture, and implementation.

## The System

This framework creates four types of documents that work together to guide development:

### 1. Constitution (WHY) - CTO/Architect View
**File:** `CONSTITUTION.md`

**Purpose:** Defines the foundational technical decisions, principles, and strategies that guide all development.

**Contains:**
- Core development principles (e.g., Speed of Delivery, Test Critical Paths Only)
- Technology stack decisions (languages, frameworks, tools)
- Architectural guidelines and constraints
- Development philosophy (testing, deployment, error handling)

**Role:** Sets the guardrails. All other documents must align with constitutional principles.

### 2. Use Cases (WHAT) - Product Owner View
**Files:** `[feature-name]/usecase.md`

**Purpose:** Describes individual features/capabilities from the user's perspective without technical implementation details.

**Contains:**
- User goals and context
- Assumptions being tested
- Success scenarios and alternative paths
- Acceptance criteria
- Success metrics and failure signals
- What's explicitly out of scope

**Role:** Defines what needs to be built and why it matters to users. No "how" — that's for the ADR.

### 3. ADR/Design (HOW) - Senior Developer View
**Files:** `[feature-name]/adr.md`

**Purpose:** Documents architectural decisions, trade-offs, and technical approach without prescribing exact implementation code.

**Contains:**
- Key architectural decisions with rationale
- Trade-offs and alternatives considered
- Constitutional alignment for each decision
- System architecture overview
- API contracts, data models, component responsibilities
- Open questions and risks

**Role:** Explains which technical approaches were chosen and why. Guides implementation without dictating code.

### 4. Tasks (HOW - Detailed) - Junior Developer View
**Files:** `[feature-name]/tasks.md`

**Purpose:** Breaks down the implementation into actionable, step-by-step tasks.

**Contains:**
- Parent tasks and detailed sub-tasks
- Relevant files to create/modify
- Specific commands to run
- Checkboxes for progress tracking

**Role:** Provides a clear roadmap for implementation. Can be followed by developers or AI agents.

## Document Hierarchy

```
Constitution (WHY - Strategic)
    ↓
Use Case (WHAT - Requirements)
    ↓
ADR (HOW - Architecture)
    ↓
Tasks (HOW - Implementation)
```

## Workflow

1. **Create Constitution** - Define your project's technical foundation and principles
2. **Write Use Case** - Describe the feature from the user's perspective (references Constitution)
3. **Generate ADR** - Document architectural decisions for the use case (references Constitution + Use Case)
4. **Generate Tasks** - Break down implementation steps (references ADR + Use Case)
5. **Implement** - Follow the tasks, checking them off as you go

## Templates

Each document type has a template to guide AI generation:

- `create-constitution.md` - Guide for creating project constitutions
- `create-usecase.md` - Guide for generating use cases
- `create-adr.md` - Guide for generating architecture decision records
- `generate-tasks.md` - Guide for generating task lists

## Example

See the `examples/` directory for a complete example:

- `examples/CONSTITUTION.md` - mediaid medical transcription project
- `examples/transcribe-consultation/usecase.md` - Two-phase transcription feature
- `examples/transcribe-consultation/adr.md` - Architectural decisions for the feature
- `examples/transcribe-consultation/tasks.md` - Implementation task breakdown

## Key Principles

**Separation of Concerns:**
- Use Cases capture WHAT (user goals, acceptance criteria)
- ADRs capture HOW (technical decisions, architecture)
- Constitution captures WHY (principles, strategic choices)
- Tasks capture implementation steps (actionable work)

**Constitutional Alignment:**
- Every ADR decision must reference constitutional principles
- Use Cases must respect constitutional constraints
- Tasks implement the ADR while adhering to the constitution

**No Code in ADRs:**
- ADRs document decisions and trade-offs, not implementations
- Actual code belongs in the project repository
- ADRs guide developers on what to build and why, not exact syntax