```markdown
# Design: Borrow Item (Reserve / Return) — Item Details Actions
**Date:** 2025-12-02
**Status:** Initial Technical Design

## Design Summary
Add backend endpoints and a small details view so users can borrow (reserve) and return items from the item details page. Keep domain logic isolated behind a repository adapter and use optimistic UI with rollback for a fast user experience. This follows the project constitution principles: thin routes, adapter pattern, and small incremental changes.

## Technical Decisions
- **Adapter Pattern for Data Mutations**
  - Rationale: Keep storage concerns isolated so the in-memory adapter can be swapped for a DB later.
  - Trade-offs: Small indirection in tests and code; payoff is lower coupling.

- **Endpoints: `POST /api/items/:id/borrow` and `POST /api/items/:id/return`**
  - Rationale: Clear intent endpoints are simple to call from the UI and express semantic actions.
  - Alternative: `PATCH /api/items/:id` with a payload `{ availability: 'borrowed' }`; chosen endpoints read better for this increment.

- **Domain Functions: `borrowItem(repo,id)` / `returnItem(repo,id)`**
  - Rationale: Keep validation (available->borrowed) and conflict detection (409) in domain logic, not in routes.

- **Optimistic UI with Rollback**
  - Rationale: Immediate feedback improves UX; rollback on error keeps correctness.
  - Trade-offs: Requires careful error handling and idempotent domain checks.

## Architecture Overview
Components:
- `server/routes/items.js` — route handlers for borrow/return delegating to domain.
- `server/domain/items.js` — `borrowItem`/`returnItem` functions encapsulating validation and mutation intent.
- `server/adapters/itemsRepo.js` — in-memory `findAll`, `findById`, `update` (or `setBorrowed`) to mutate item state.
- `public/app.js` — client-side SPA: add Item Details view, `Borrow` / `Return` buttons, optimistic update + rollback, conflict/error messages.

Data Flow:
client (Details view) → POST /api/items/:id/borrow → route handler → domain.borrowItem(repo,id) → repo.update(id,{availability:'borrowed'}) → domain returns result → route responds 200 or 409 → client confirms or rolls back UI.

State:
- Server: mutable in-memory state (adapter).  
- Client: ephemeral UI state (loading/error/optimistic).  

Integration Points:
- No external services. Future DB swap should only affect `adapters/itemsRepo.js`.

## Implementation Constraints
- No authentication or per-user ownership in this increment.  
- In-memory adapter only — state resets on process restart.  
- Keep changes isolated to `examples/shareit/*` paths.  
- Minimal UX: details page plus borrow/return controls; no complex flows or queues.

## Guardrails & Scope
**In Scope**
- Add/modify backend endpoints to support borrow and return actions.
- Add domain functions for borrow/return with conflict detection.
- Mutate the in-memory adapter to persist changes for the running process.
- Add an Item Details client view (in `public/app.js`) with `Borrow` and `Return` actions and optimistic UI.
- Add unit tests for domain logic and route-level tests for success/conflict/error.

**Out of Scope**
- Authentication, user ownership, persistent DB migrations, reservation windows, queuing.

**Planned Files Summary (initial)**
- `examples/shareit/server/routes/items.js` — modify — add `POST /api/items/:id/borrow` and `POST /api/items/:id/return` handlers delegating to domain functions.
- `examples/shareit/server/domain/items.js` — modify — add `borrowItem(repo,id)` and `returnItem(repo,id)` with validation and conflict handling.
- `examples/shareit/server/adapters/itemsRepo.js` — modify — add `findById(id)` and `update(id,partial)` (or `setBorrowed(id,boolean)`) to mutate in-memory data.
- `examples/shareit/public/app.js` — modify — add details view (client-side routing or hash-based), `Borrow`/`Return` buttons, optimistic-update logic, error/conflict display.
- `examples/shareit/public/index.html` — modify — ensure client routing or navigation to details view works (hash fragment or simple modal).
- `examples/shareit/tests/items.domain.test.js` — add/modify — tests for borrow/return validation and conflict behavior.
- `examples/shareit/tests/items.route.test.js` — add/modify — route tests covering 200, 409, and error cases.

**Drift Policy**
- STOP and propose a scope update if additional files or infra are required (e.g., persistent DB, auth). Propose minimal adjustments or split into a follow-up increment.

**Suggested Branch**
- `feature/borrow-item`

## Open Questions
- Prefer `POST /api/items/:id/borrow` + `POST /api/items/:id/return` (current plan) or a `PATCH` endpoint?  
- Should the client include any optimistic UI timers or just immediate optimistic toggle + rollback?  
- Navigation to details: hash-based client detail view vs lightweight modal? Hash-routing is easiest for this increment.

## Save Location
`examples/shareit/docs/increments/borrow-item/design.md`

```
