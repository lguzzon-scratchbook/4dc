# 4DC — 4-Document, Prompt-Driven Incremental Development

Prompt-driven workflow for incremental, evolutionary software development supported by AI.

## Downloading and Using 4DC Files

You can quickly copy the canonical prompts or template files for your own project using:

```sh
# Download a single file (example: constitution prompt)
wget https://raw.githubusercontent.com/co0p/4dc/main/create-constitution.prompt.md

# Download the whole repository
git clone https://github.com/co0p/4dc.git

# Add as a submodule
git submodule add https://github.com/co0p/4dc.git vendor/4dc
```

Copy the relevant `.prompt.md` files from the repo or submodule into your own project for reproducible, prompt-driven generation.

---

## Document Flow and Dependencies

The 4DC workflow enforces separation and clarity—a cascade of documents, each answering a specific question and informing the next:

| Phase        | File(s)                                   | WHAT/HOW | Informs                |
|--------------|-------------------------------------------|----------|------------------------|
| Constitution | `CONSTITUTION.md`                        | WHY      | All subsequent phases  |
| Increment    | `increment.md`                            | WHAT     | Design                 |
| Design       | `design.md`                               | HOW      | Implement, Improve     |
| Implement    | Feature code, tasks/checklist             | DO       | Final increment, ADRs  |
| Improve/ADR  | `improve.md`, `design/adr-*.md`           | LEARN    | Next increments/design |

- The **Constitution** sets immutable principles and constraints (WHY).
- Each **Increment** states a new hypothesis/goal (WHAT), always framed by the constitution.
- **Design** translates requirements to rough technical approaches and boundaries (HOW).
- **Implementation** breaks design into task plans, step-by-step code, and tests (DO).
- **Improve** analyzes, refactors, and codifies lessons learned (LEARN); recurring architectural insights are captured in ADRs for future work.

All documents are generated/promoted by their corresponding prompt files in this repository.

---

## Examples

Explore working examples:

- [`examples/todo/`](examples/todo) — Minimal browser todo app.
- [`examples/epicsum/`](examples/epicsum) — Bash-based time tracking.
- [`examples/shareit/`](examples/shareit) — Svelte project setup.

Each example directory shows the real flow: from constitution, through increments and design, to implementation and improvement.

---

## References and Inspiration

4DC draws on work and ideas from:

- Martin Fowler (architecture, refactoring)
- Kent Beck (incremental development, TDD)
- Mary & Tom Poppendieck (Lean Software)
- Robert C. Martin (Clean Architecture, separation of concerns)
- Michael Feathers, Rebecca Wirfs-Brock, Eric Evans, Sandi Metz, Dave Thomas & Andy Hunt
- Gherkin-style acceptance criteria, BDD