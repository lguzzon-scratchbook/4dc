---
name: implement
argument-hint: path to the increment folder (for example: "examples/pomodoro/increments/demo-app-actions-and-quit-button" or "examples/shareit/docs/increments/list-catalog-api")

version: {{VERSION}}
generatedAt: {{GENERATED_AT}}
source: {{SOURCE_URL}}
---

# Prompt: Generate an Implementation Plan for an Increment

You are going to generate an **implementation plan** (`implement.md`) for a specific increment.

The plan turns the combination of:

- The **product-level WHAT** defined in `increment.md`, and
- The **technical HOW** defined in `design.md`

into an **ordered set of small, testable work items** that a team can execute using TDD, pairing, and modern XP-style practices.

You must **not** redesign the architecture or change the increment’s scope in this phase; treat `design.md` as authoritative for this increment. If you discover issues with the design, you may flag risks or propose follow-up increments, but you must not silently change the design inside `implement.md`.