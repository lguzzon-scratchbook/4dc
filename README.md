
<p align="center">
	<picture>
		<source srcset="assets/4dc-logo-traced-dark.svg" media="(prefers-color-scheme: dark)">
		<img src="assets/4dc-logo-traced.svg" alt="4DC logo" width="96" />
	</picture>
</p>

<p align="center"><em>4dc – Incremental, Evolutionary, Learning Loops for Modern Software Teams</em></p>

4dc is a set of **LLM-friendly prompt files** that help you work in **small, safe, evolutionary steps**:

- Define **increments** (what to change and why) without leaking into implementation details.
- Turn increments into **technical designs** that respect your project’s constitution.
- Break designs into **XP-style implementation plans** (small, testable tasks).
- Periodically run **improve passes** across the codebase to capture lessons, refactors, and ADRs.
- Create and evolve a **project constitution** that encodes your values, layout, and expectations.

Together, these prompts form a **closed learning loop**: real changes inform Improve docs, which feed new increments, which update your design and implementation patterns over time.
---

## TL;DR – The four core artifacts

4dc keeps four main artifacts separate so you (and your tools) don’t blur concerns:

- **Increment → WHAT & WHY**  
  - File: `docs/increments/<slug>/increment.md`  
  - Answers:  
    - What outcome do we want?  
    - Why does it matter now?  
    - What’s in/out of scope?  
  - Contains context, goal, scope/non-goals, acceptance criteria, risks.  
  - No solution, no task list.

- **Design → HOW (at a technical level)**  
  - File: `docs/increments/<slug>/design.md`  
  - Answers:  
    - How will the system change to achieve the increment?  
    - Which components, data flows, and contracts are involved?  
  - Contains architecture, interfaces, data flow, key decisions and trade-offs.  
  - No implementation tasks.

- **Implement → STEPS (XP-style tasks)**  
  - File: `docs/increments/<slug>/implement.md`  
  - Answers:  
    - What small, testable steps will we take?  
    - Which files/tests will we touch in each step?  
  - Contains workstreams, concrete actions, tests to add/update, suggested PR groupings.  
  - Derived from Increment + Design.

- **Improve → LEARN & REFINE (codebase-wide)**  
  - File: `docs/improve/YYYY-MM-DD-improve.md`  
  - Answers:  
    - How healthy is the codebase vs our constitution?  
    - What worked well? What keeps hurting?  
    - What refactors and ADRs should we consider next?  
  - Contains assessment, lessons, and improvement proposals that can become future increments.

Everything is guided by your **Constitution** (`CONSTITUTION.md`), which encodes your values, expectations, and layout.

---

## Why this repo is useful

4dc is for teams who want:

- **XP / small-batch delivery, with AI in the loop**

  - Increments stay as clean WHAT-only descriptions.
  - Design and Implement prompts keep “plan” (design) and “tasks” (implementation steps) separate.
  - Improve prompts look across the whole codebase, not just a single change set.

- **A living project constitution**

  - You define your values, testing and observability expectations, dependency strategy, and doc layout in `CONSTITUTION.md`.
  - All other prompts (increment, design, implement, improve) read and respect that constitution.
  - Different projects (or subprojects) can adopt lighter or deeper practices while sharing the same core model.

- **Safer AI-assisted changes**

  - LLMs don’t jump straight to “edit all the things.”
  - Instead, they produce artifacts you can review, diff, and evolve:
    - `docs/increments/.../increment.md`
    - `design.md`
    - `implement.md`
    - `docs/improve/YYYY-MM-DD-improve.md`
  - You keep humans firmly in control of what actually changes in the codebase.

- **Codebase-wide learning**

  - Improve docs capture assessments, lessons, refactoring opportunities, and ADR candidates.
  - Each Improvement can become a future increment.
  - Over time, your constitution and patterns converge instead of drifting.

You can treat 4dc as:

- A **prompt pack** to wire into Copilot Chat or any LLM.
- A **playbook** for how your team wants to design, implement, and improve changes.

---

## Prompt files

The assembled prompt entrypoints (all in the repo root) are:

- `create-constitution.prompt.md`  
  - Helps you create or refine a `CONSTITUTION.md` for a repo or subproject.  
  - Encodes values, principles, test/observability expectations, dependency rules, and doc layout.

- `increment.prompt.md`  
  - Defines a **small, outcome-focused change** (an increment): context, goal, scope, acceptance criteria, risks.  
  - Stays strictly at the WHAT/WHY level; no solution or task list.

- `design.prompt.md`  
  - Takes a specific increment folder (with `increment.md`) and generates `design.md`.  
  - Describes the technical HOW, data flow, interfaces, and trade-offs.  
  - Does not produce tasks.

- `implement.prompt.md`  
  - Takes an increment folder (with `increment.md` and `design.md`) and generates `implement.md`.  
  - Produces XP-style steps: small, testable tasks grouped by workstreams, suitable for PRs and pairing.

- `improve.prompt.md`  
  - Runs a **codebase-wide improve pass** for a project rooted at `path`.  
  - Produces `docs/improve/YYYY-MM-DD-improve.md` with:
    - Assessment vs constitution (star ratings per principle).
    - Lessons (worked well / to improve / emerging patterns).
    - Concrete Improvements (refactoring proposals) plus ADR candidates.

Use these as explicit entrypoints in tooling (for example, as Copilot Chat “Custom Instructions” or equivalent).

---

## Get started

This assumes:

- You already have a Git repo for your project.
- You want the 4dc prompt files under `.github/prompts/4dc` in your project.

From the root of **your** project, run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/co0p/4dc/main/scripts/install-4dc-prompts.sh)"
```

What this does:

- Downloads the installer script from this repo.
- Runs it in your current project directory.
- Copies the assembled `*.prompt.md` files into `.github/prompts/4dc/`.

After running it, you’ll have something like:

- `.github/prompts/4dc/create-constitution.prompt.md`
- `.github/prompts/4dc/increment.prompt.md`
- `.github/prompts/4dc/design.prompt.md`
- `.github/prompts/4dc/implement.prompt.md`
- `.github/prompts/4dc/improve.prompt.md`

You can then configure your LLM / Copilot Chat to load these files as prompt sources.

---

## Typical workflow

### 1. Create or refine your project constitution

Use `create-constitution.prompt.md` (via your LLM) to create or update `CONSTITUTION.md` in your repo. It should cover:

- **Values and principles**

  - Examples: small, safe steps; refactoring as everyday work; pragmatic DRY; testing and observability expectations.

- **Implementation & doc layout**

  - Where increments, designs, implementation plans, and improve docs live.  
    For example:
    - `docs/increments/<slug>/increment.md`
    - `docs/increments/<slug>/design.md`
    - `docs/increments/<slug>/implement.md`
    - `docs/improve/YYYY-MM-DD-improve.md`

- **Modes / levels of rigor (optional)**

  - For example: lighter rules for demos/examples, deeper rules for production or critical systems.

All other prompts will read and follow this constitution when generating artifacts.

### 2. Define an increment

Using `increment.prompt.md`:

- Pick a small change you want to make.
- Run the prompt with a `path` where you want the increment folder to live.
- It generates:

  - `docs/increments/<slug>/increment.md` – a WHAT/WHY-only document describing:
    - Context & goal.
    - Scope and non-goals.
    - Acceptance criteria & observability.
    - Risks and open questions.

This is your **XP-style story/card**, cleanly separated from the implementation.

### 3. Design

From inside the increment folder, use `design.prompt.md`:

- Point it at the increment folder (`path`).
- It generates `design.md` next to `increment.md`:

  - Explains **how** the system will change:
    - Interfaces, data flow, components, error handling.
    - Trade-offs and constraints, referencing the constitution.
  - Explicitly avoids becoming a task list.

This is your **design note**, still independent of concrete steps.

### 4. Implement

From the same folder, use `implement.prompt.md`:

- It reads `increment.md` and `design.md`.
- It generates `implement.md`:

  - XP-style steps:
    - Workstreams (e.g., backend, UI, tests, observability).
    - Small, testable tasks with file lists and concrete actions.
    - Suggested grouping into phases or PRs.
  - Optionally with checkboxes for progress tracking.

You then execute these steps as real code changes (commits/PRs), using your usual tools.

### 5. Improve (codebase-wide)

Periodically, use `improve.prompt.md` with `path` pointing at the project root (or a subproject root):

- It generates `docs/improve/YYYY-MM-DD-improve.md`:

  - **Assessment** vs constitution (with 1–5 star ratings and rationales).
  - **Lessons** (Worked Well / To Improve / Emerging Patterns).
  - **Improvements**:
    - Each is a concrete refactoring or improvement proposal.
    - Includes lens, priority, effort, files, and change description.
    - Can be turned into a future increment.
  - ADR candidates for bigger, cross-cutting decisions (output via the ADR template, separately).

This closes the loop: real code informs future increments and refinements to your constitution.

---

## Inspiration

4dc borrows heavily from:

- **Extreme Programming (XP)** – Kent Beck  
  Small, safe steps; TDD; continuous refactoring; simple design.

- **Refactoring & design** – Martin Fowler, Michael Feathers, Sandi Metz, Robert C. Martin  
  Clear names, small functions, separation of concerns, “make the change easy, then make the easy change.”

- **Domain-Driven Design (DDD)** – Eric Evans  
  Ubiquitous language; aligning code structure with domain concepts.

- **DevOps & Delivery** – Jez Humble & David Farley, Michael Nygard, The Pragmatic Programmers  
  Continuous delivery, fast feedback, operability, resilience, conscious dependency choices.

These ideas show up explicitly in the **lenses** used by the Improve phase:

- Naming & Clarity  
- Modularity & Separation  
- Architecture & Patterns  
- Testing & Reliability  
- Duplication & Simplicity  
- Documentation & Communication  
- Delivery & Flow  
- Dependencies & Operability  

And they’re encoded into the **values and principles** you put into your `CONSTITUTION.md`:

- Small, safe steps over large, risky changes.
- Refactoring as everyday work, not a special event.
- Pragmatic DRY and simplicity (no speculative abstractions).
- Clear contracts, tests, and observability.
- Conscious dependency and operability choices.

4dc is an attempt to make those ideas concrete and accessible in a world where AI is part of the team: the prompts give the AI structure and guardrails, and your constitution keeps it aligned with how you want to build software.