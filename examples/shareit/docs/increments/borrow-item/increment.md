```markdown
# Borrow Item: Reserve (borrow) and Return from Item Details

**Date:** 2025-12-02

## Job Story
**When** I view an item’s details
**I want to** reserve (borrow) an available item and later return an item I borrowed
**So I can** ensure the item is marked unavailable to others and restore it when I'm done

## Assumption Being Tested
Users want a simple reserve/return flow from the item details page that gives immediate feedback.

## Acceptance Criteria
- **Given** an item is `available`  
  **When** I open the item details page  
  **Then** I see a `Borrow` action/button and the availability shown as `available`.

- **Given** an item is `available`  
  **When** I click `Borrow` on the details page  
  **Then** the UI updates to show the item as `borrowed` and the `Borrow` action is disabled or replaced by `Return` (optimistic update).  
  **And** the server persists the change (in-memory adapter) and returns success.

- **Given** a borrow request fails (network/server error)  
  **When** I attempt to borrow  
  **Then** the UI rolls back to `available` and shows a friendly error with a Retry option.

- **Given** an item is already `borrowed`  
  **When** another actor tries to borrow it  
  **Then** the server responds with a 409 (conflict) and the client displays a friendly conflict message.

- **Given** an item is `borrowed` by the current session  
  **When** I open the details page  
  **Then** I see a `Return` action and can click it to set availability back to `available` (optimistic update + server persistence).

- **Given** I refresh the catalog or details page after successful borrow/return  
  **Then** the availability reflects the last confirmed server state.

## Success Signal
- A tester can reserve (borrow) and return an item via the details page; the server returns success for the operation and the UI consistently reflects the server state after refresh.

## Out of Scope
- Authentication and per-user ownership tracking beyond a simple `borrowed` flag (no accounts).  
- Persistent database storage across process restarts (the in-memory adapter will mutate state for the running process).  
- Complex conflict resolution, queuing, or reservation windows — keep conflict handling minimal (409 + message).

## Implementation Guardrails & Handoff
- Branching: work on `feature/borrow-item`; do not commit to `main` directly.  
- Planned Files Summary: will be proposed and confirmed in the Implement phase (below is a suggested minimal list).  
- Drift Policy: STOP and propose a scope update if implementation requires files beyond the confirmed list.  
- Verification Expectation: prefer unit tests for domain logic and small route tests; UI may use manual checks or lightweight integration tests.

### Suggested Minimal Planned Files Summary (Implement will confirm)
- `examples/shareit/server/routes/items.js` — modify — add `POST /api/items/:id/borrow` and `POST /api/items/:id/return` (or `PATCH /api/items/:id` semantics) to mutate availability and return appropriate status codes.  
- `examples/shareit/server/domain/items.js` — modify — add `borrowItem(repo, id)` / `returnItem(repo, id)` domain functions performing validation and returning clear error codes (e.g., conflict).  
- `examples/shareit/server/adapters/itemsRepo.js` — modify — add `update(id, partial)` or `setBorrowed(id, boolean)` to mutate in-memory items.  
- `examples/shareit/public/app.js` — modify — add an Item Details view and `Borrow`/`Return` buttons with optimistic-update + rollback on error and conflict handling.  
- `examples/shareit/public/index.html` — modify — ensure navigation to item details (hash or client-side route).  
- `examples/shareit/docs/increments/borrow-item/increment.md` — new — this file.  
- `examples/shareit/tests/items.domain.test.js` — modify/add — unit tests for `borrowItem`/`returnItem`.  
- `examples/shareit/tests/items.route.test.js` — modify/add — route tests for borrow/return endpoints and error cases.  

---

Please confirm this increment spec and the suggested Planned Files Summary. Once you confirm, I'll create a branch and implement the planned backend and frontend changes in small, incremental commits per the implement prompt process.

```markdown
