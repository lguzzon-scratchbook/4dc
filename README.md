<p align="center">
  <picture>
    <source srcset="assets/4dc-logo-traced-dark.svg" media="(prefers-color-scheme: dark)">
    <img src="assets/4dc-logo-traced.svg" alt="4DC logo" width="120" />
  </picture>
</p>

<p align="center"><strong>4dc – four document cascade</strong></p>
<p align="center"><em>Prompt-driven 4-document workflow for incremental, evolutionary software development.</em></p>

---

## Getting started

### TL;DR

4dc is a set of **LLM‑friendly prompt files** you add to your project so that you and your AI tools work in **small, incremental, evolutionary steps** instead of big risky changes.

You describe **what and why** in an increment, get a **design** for how the system will change, break it down into **concrete implementation steps**, and periodically run **improve passes** that feed back into future increments.

All of this is guided by a **project constitution** (`CONSTITUTION.md`) that encodes your values, expectations, and layout so your tools behave more like a consistent teammate than a loose cannon.

### Installation

This assumes:

- You already have a Git repo for your project.
- You want the 4dc prompt files under `.github/prompts/4dc` in **your** project.

From the root of your project, run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/co0p/4dc/main/scripts/install-4dc-prompts.sh)"
```

This script:

- Downloads the installer from this repo.
- Runs it in your current project directory.
- Copies the assembled `*.prompt.md` files into `.github/prompts/4dc/`.

Afterwards, you’ll have:

- `.github/prompts/4dc/create-constitution.prompt.md`
- `.github/prompts/4dc/increment.prompt.md`
- `.github/prompts/4dc/design.prompt.md`
- `.github/prompts/4dc/implement.prompt.md`
- `.github/prompts/4dc/improve.prompt.md`

Point Copilot Chat or your LLM at these prompt files as sources, and you’re ready to start using 4dc.

---

## Details

### The cycle (four document cascade)

4dc keeps four kinds of artifacts separate so humans and tools don’t blur concerns. In practice, the cascade looks like this:

```text
[Increment]  →  [Design]  →  [Implement]  →  [Improve]
   WHAT & WHY     TECH HOW     STEPS          LEARN

   Small,          How the      Concrete       Codebase-wide
   outcome         system       changes and    assessment,
   focused         should       testable       lessons, and
   change          evolve       tasks          next ideas
```

And everything is anchored by your **Constitution**:

```text
               ┌────────────────────────────────────┐
               │          CONSTITUTION              │
               │  values, expectations, layout      │
               └────────────────────────────────────┘
                  ↑        ↑        ↑        ↑
                  │        │        │        │
             Increment   Design  Implement  Improve
```

In words:

1. **Increment – WHAT & WHY**  
   You define the outcome you want and why it matters, without jumping into solutions or task lists.

2. **Design – HOW (technically)**  
   You describe how the system will change to achieve that increment: components, data flows, interfaces, and trade‑offs.

3. **Implement – STEPS (concrete tasks)**  
   You break the design into small, testable tasks and suggested PR groupings you can actually execute.

4. **Improve – LEARN & REFINE (codebase‑wide)**  
   You periodically scan the codebase against your constitution, capture lessons, and propose refactors and ADRs that become future increments.

Everything is guided by your **Constitution** (`CONSTITUTION.md`), which encodes:

- Values and principles (e.g., small, incremental, evolutionary changes; refactoring as everyday work).
- Testing and observability expectations.
- Dependency and architecture rules.
- Where docs and artifacts live in the repo.

The loop looks like this:

> Real changes → Improve docs → New increments → Fresh designs & implementation plans → Better code & constitution.

### The prompts

All assembled prompt entrypoints live at the repo root (and get copied into `.github/prompts/4dc/` in your project):

- `create-constitution.prompt.md`  
  Helps you create or refine `CONSTITUTION.md` for a repo or subproject. Encodes values, principles, test/observability expectations, dependency rules, and doc layout.

- `increment.prompt.md`  
  Defines a **small, outcome‑focused change**:
  - Context & goal.
  - Scope and non‑goals.
  - Acceptance criteria & observability.
  - Risks and open questions.  
  Stays strictly at the WHAT/WHY level; no solution or task list.

- `design.prompt.md`  
  Takes an increment folder (with `increment.md`) and generates `design.md`:
  - How the system will change.
  - Interfaces, data flows, components.
  - Key decisions and trade‑offs.  
  Does not produce tasks.

- `implement.prompt.md`  
  Takes an increment folder (with `increment.md` and `design.md`) and generates `implement.md`:
  - Steps grouped into workstreams (e.g., backend, UI, tests).
  - Small, testable tasks with concrete file actions.
  - Suggested grouping into phases/PRs.

- `improve.prompt.md`  
  Runs a **codebase‑wide improve pass** for a project rooted at `path` and produces `docs/improve/YYYY-MM-DD-improve.md` with:
  - Assessment vs. constitution (1–5 star ratings + rationales).
  - Lessons (worked well / to improve / emerging patterns).
  - Concrete improvements (refactoring proposals) plus ADR candidates.

You can wire these prompt files into Copilot Chat “Custom Instructions”, or any LLM integration that can load prompts from disk.

### Referenced material

4dc is heavily inspired by:

- **Incremental and evolutionary design**  
  Many small, reversible changes instead of a few large, risky ones.

- **Extreme Programming (XP)** – Kent Beck  
  Small safe steps, frequent feedback, and constant refactoring (without requiring you to “buy into” the whole XP label).

- **Refactoring & design** – Martin Fowler, Michael Feathers, Sandi Metz, Robert C. Martin  
  Clear names, small functions, separation of concerns, “make the change easy, then make the easy change.”

- **Domain‑Driven Design (DDD)** – Eric Evans  
  Ubiquitous language; aligning code structure with domain concepts.

- **DevOps & delivery** – Jez Humble & David Farley, Michael Nygard, The Pragmatic Programmers  
  Continuous delivery, fast feedback, operability, resilience, conscious dependency choices.

- **DORA research** – Forsgren, Humble, Kim et al.  
  Evidence‑based practices for improving software delivery performance and reliability.

- **Dave Farley**  
  Practical continuous delivery, deployment pipelines, and designing systems for fast, safe change.

These show up as the **lenses** used by the Improve phase, for example:

- Naming & Clarity  
- Modularity & Separation  
- Architecture & Patterns  
- Testing & Reliability  
- Duplication & Simplicity  
- Documentation & Communication  
- Delivery & Flow  
- Dependencies & Operability  

Your `CONSTITUTION.md` turns those ideas into concrete, project‑specific rules so your AI tools can help you apply them consistently.