# 4DC — 4-Document, Prompt-Driven Incremental Development

Prompt-driven 4-document workflow for incremental, evolutionary software development supported by AI.

Purpose
-------
4DC is a lightweight, repeatable cycle for building software incrementally and evolving it safely over time with AI assistance. It explicitly combines human judgement and AI to:

- Deliver small, testable user value rapidly.
- Preserve architectural integrity and capture learning.
- Make governance and decision-making explicit and actionable through a project constitution.
- Close the loop: define WHAT → design HOW → DO → LEARN and repeat.

How to use this repository
--------------------------
This repository holds canonical prompt files that are the authoritative source of truth for generating project artifacts. The prompts themselves create the artifacts (e.g., CONSTITUTION.md, increment.md, design.md, improve.md). Humans should not manually copy the contents of the .prompt.md files into generated documents—use the tooling or agent that consumes these prompts to produce and update files so provenance and automation are preserved.

Canonical prompt files in this repo:
- create-constitution.prompt.md — generates CONSTITUTION.md (run once, update occasionally)
- increment.prompt.md — generates increment.md per increment
- design.prompt.md — generates design.md for an increment
- implement.prompt.md — drives implementation plans and code tasks (feature branches)
- improve.prompt.md — generates improve.md and ADRs for refactoring and learning

Quick start
1. Run the create-constitution prompt via your AI/automation tooling to generate CONSTITUTION.md in the project root.
2. For a new capability, run the increment prompt to produce an increment.md and save it under docs/increments/<increment-name>/increment.md (recommended).
3. Run the design prompt for that increment to produce docs/increments/<increment-name>/design.md.
4. Run the implement prompt to produce an implementation plan and perform work on a feature branch: feature/<increment-name>. Commit frequently as specified by the plan.
5. After implementation, run the improve prompt to generate improve.md and any ADRs; implement selected improvements on an improve/<topic> branch.
6. Repeat the cycle for subsequent increments.

Detailed look at the prompts and the cycle
-----------------------------------------

Constitution (create-constitution) — create once, update occasionally
- Purpose: codify 3–5 clear, testable architectural principles mapped to six pillars that guide day-to-day decisions.
- Inputs: repository README, existing CONSTITUTION.md if present, optional project type/stack.
- Interaction: prompts ask pillar-specific questions; use the provided tooling to answer and generate the canonical CONSTITUTION.md.
- Output: CONSTITUTION.md in the project root with Vision, Mission, Core Values, Architectural Principles (pillar mapping), Update Process, Pillar Coverage, Technical Decisions, and Last Updated.

Increment (increment) — define WHAT
- Purpose: produce small, user-focused increments that validate a hypothesis and deliver observable outcomes.
- Inputs: brief feature description and CONSTITUTION.md for alignment.
- Interaction: prompts will ask clarifying user-focused questions; use the tooling to respond and generate increment.md.
- Output: docs/increments/<increment-name>/increment.md with Title, Job Story, Assumption Being Tested, Gherkin-style Acceptance Criteria, Success Signal, Out of Scope.

Design (design) — map WHAT → HOW
- Purpose: produce a concise technical design aligned to the constitution and increment acceptance criteria.
- Prereqs: CONSTITUTION.md and increment.md (and relevant ADRs).
- Interaction: prompts will ask essential technical questions; respond via tooling to generate design.md.
- Output: docs/increments/<increment-name>/design.md containing a short Design Summary, Initial Approach (2–5 considerations), Architecture Overview, Implementation Constraints, and Open Questions.

Implement (implement) — DO in small, testable steps
- Purpose: convert design into working code via small, verifiable steps and frequent commits.
- Mandatory rules produced by the prompt:
  - Create and switch to a feature branch before code changes: `git checkout -b feature/<increment-name>`
  - Verify CONSTITUTION.md, increment.md, and design.md exist
  - Break work into high-level tasks; each high-level task has 2–5 subtasks (5–30 minutes each)
  - After each high-level task completes, make an explicit incremental commit on the feature branch
  - Map every high-level task to acceptance criteria and provide verification steps
- Output: implementation plan, code changes, tests, and progress tracked via checkboxes in the generated plan.

Improve (improve) — LEARN and refactor
- Purpose: analyze, prioritize, and implement refactorings and learning artifacts that improve clarity, modularity, and maintainability.
- Process produced by the prompt:
  - Work on a dedicated branch (e.g., `improve/codebase`)
  - Analyze the codebase through defined lenses, propose a lenses-based refactoring plan, and implement chosen changes in small commits
  - Create ADRs only when a decision is impactful and unifies divergent implementations
- Output: improve.md (project root or chosen location) and ADR files as needed.

Continue the cycle
- After improve, run additional increments. Each iteration should validate a hypothesis, add user value, and slowly evolve the codebase and constitution as needed.
- Automation-first workflow: use the prompts and tooling to generate artifacts and keep provenance, rather than copying prompt text into documents.

Pillars (used by the constitution)
----------------------------------
Principles are mapped into these six pillars to make architectural choices explicit.

1. Delivery Velocity
   - Trade-offs between speed and polish; defines iteration cadence and acceptable quality thresholds.

2. Test Strategy
   - What to test and how much; guides test writing and deployment gates.

3. Design Integrity
   - Structural rules: module boundaries, responsibilities, and dependency guidelines.

4. Simplicity First
   - When to add abstractions vs. keep things simple; triggers for refactoring.

5. Technical Debt Boundaries
   - Rules for when shortcuts are acceptable and how debt is tracked and repaid.

6. Dependency Discipline
   - Guidelines for selecting and managing third-party libraries and upgrades.

Lenses used by the Improve step
-------------------------------
Improve-generated plans group refactorings by these lenses:

- Naming & Clarity — Improve names to make intent explicit.
- Modularity & Separation — Increase cohesion and reduce coupling.
- Architecture & Patterns — Unify recurring architectural decisions; create ADRs when needed.
- Testing & Reliability — Add or improve tests for critical paths.
- Duplication & Simplicity — Eliminate duplication and keep code simple.
- Documentation & Communication — Improve README, inline docs, and ADRs.

References and inspiration
--------------------------
4DC and its prompts are informed by practical, evidence-driven development and refactoring literature, including ideas from:

- Martin Fowler (refactoring, architecture)
- Kent Beck (TDD, incremental development)
- Michael Feathers (legacy code techniques)
- Robert C. Martin (Clean Architecture)
- Rebecca Wirfs-Brock, Eric Evans, Sandi Metz, Dave Thomas & Andy Hunt
- Gherkin-style acceptance criteria and Behavior-Driven Development practices

Conventions and file locations
------------------------------
- Constitution: CONSTITUTION.md (project root)
- Increments & designs (recommended): docs/increments/<increment-name>/increment.md and design.md
- Improve plan: improve.md (project root)
- ADRs: docs/design/ or docs/adrs/
- Feature branch names:
  - Implement: feature/<increment-name>
  - Improve: improve/<short-description>
- Commit practice: frequent, small commits; each high-level task should correspond to an explicit commit.

Contributing
------------
- The .prompt.md files are the canonical behavior definitions for tooling and agents. To change behavior, edit the appropriate .prompt.md file and open a small PR.
- Prefer incremental changes to prompts and validate through one small increment end-to-end.
- Do not copy prompt content manually into generated documents; use the automation that consumes these prompts so generated files include metadata and provenance.

License
-------
See LICENSE in this repository.
