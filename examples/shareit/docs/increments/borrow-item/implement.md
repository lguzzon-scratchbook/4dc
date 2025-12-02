```markdown
# Implementation: Borrow Item (Reserve / Return)

## 0. Drift Guardrails (Declare Up Front)
- Increment: Borrow Item — Reserve (borrow) and Return from Item Details
- Acceptance Criteria Reference: see `increment.md` in this folder
- DRIFT ALERT policy: If any step requires files/modules beyond the confirmed list, STOP and propose a scope update (or split follow-up increment). We will expand the Planned Files Summary minimally if needed (per preference B).

**IMPORTANT:** Before proceeding with additional code edits, confirm the Planned Files Summary below. Some minimal domain/adapter edits were applied already (recorded in the Decision Log). Proceeding further requires your explicit confirmation.

## 1. Planned Files Summary (Confirm Before Coding)
- `examples/shareit/server/adapters/itemsRepo.js` — modify — add `findById(id)` and `update(id, partial)` to enable mutations (ALREADY MODIFIED)
- `examples/shareit/server/domain/items.js` — modify — add `borrowItem(repo,id)` and `returnItem(repo,id)` performing validation and returning normalized item (ALREADY MODIFIED)
- `examples/shareit/server/routes/items.js` — modify — add `POST /api/items/:id/borrow` and `POST /api/items/:id/return` to call domain functions (new)
- `examples/shareit/public/app.js` — modify — add Item Details view, `Borrow`/`Return` buttons, optimistic-update + rollback, error/conflict display (new)
- `examples/shareit/public/index.html` — modify — minimal client routing (hash) or navigation hook for details (new/modify)
- `examples/shareit/tests/items.domain.test.js` — new — unit tests for `borrowItem`/`returnItem` (new; tests prioritized)
- `examples/shareit/tests/items.route.test.js` — new — route tests for borrow/return endpoints (new)

Please reply `confirm` to approve this Planned Files Summary and let me continue, or `edit` to change it. If you reply `confirm`, I will proceed in small, test-first commits per the living plan.

## 2. Implementation Tasks & Subtasks (Living Plan)
- [ ] **Setup**
  - [x] Create branch `feature/borrow-item` (verify branch exists) — done
  - [ ] Ensure working dev server start step documented in README (manual check)

- [ ] **Tests (Unit-first)**
  - [ ] Create `examples/shareit/tests/items.domain.test.js` with tests asserting:
    - borrow succeeds when item is available (assert availability -> 'borrowed')
    - borrow fails with 409 when item already borrowed
    - return succeeds when item is borrowed
  - [ ] Run tests (or provide manual verification steps if test harness not available)

- [ ] **Domain & Adapter (review + finalize)**
  - [x] Review and accept existing adapter changes: `adapters/itemsRepo.js` now exposes `findById` and `update` (already done)
  - [x] Review and accept existing domain changes: `domain/items.js` implements `borrowItem` and `returnItem` (already done)
  - [ ] If tests fail, iterate on domain/adapters until tests pass

- [ ] **Backend Routes**
  - [ ] Add route handlers in `server/routes/items.js`:
    - `POST /api/items/:id/borrow` — calls `borrowItem(itemsRepo, id)`; returns 200 + item JSON on success; 404 if not found; 409 on conflict; 500 on other errors.
    - `POST /api/items/:id/return` — calls `returnItem(itemsRepo, id)`; similar semantics.
  - [ ] Add route-level tests in `examples/shareit/tests/items.route.test.js` (HTTP 200, 409, 404 scenarios)
  - [ ] Manual verification: `curl -X POST http://localhost:3000/api/items/1/borrow` → expect 200 and mutated JSON; subsequent borrow should return 409.

- [x] **Backend Routes**
  - [x] Add route handlers in `server/routes/items.js`:
    - `POST /api/items/:id/borrow` — calls `borrowItem(itemsRepo, id)`; returns 200 + item JSON on success; 404 if not found; 409 on conflict; 500 on other errors.
    - `POST /api/items/:id/return` — calls `returnItem(itemsRepo, id)`; similar semantics.
  - [ ] Add route-level tests in `examples/shareit/tests/items.route.test.js` (HTTP 200, 409, 404 scenarios)
  - [ ] Manual verification: `curl -X POST http://localhost:3000/api/items/1/borrow` → expect 200 and mutated JSON; subsequent borrow should return 409.

- [ ] **Frontend: Details View + Actions**
  - [ ] Add item details view in `public/app.js` (hash-based routing or modal): show name, thumbnail, availability, and `Borrow`/`Return` action depending on availability.
  - [ ] Implement optimistic UI: on click, toggle UI state immediately, call endpoint; on failure, rollback and show friendly error with Retry.
  - [ ] Manual verification steps: open details for an available item, click Borrow (UI updates → server persists), refresh to confirm server state.

- [ ] **Stabilization & Tests**
  - [ ] Ensure tests pass (unit + route). If test harness not configured, provide clear manual verification steps in `implement.md` and mark tests as TODO.
  - [ ] Update Shareit README quickstart if start instructions changed.
  - [ ] Commit small, focused changes per completed task (one commit per high-level task); include Decision Log updates.

## 3. Verification Methods
- Tests: run node test harness (if available) for `examples/shareit/tests/*` (unit + route).
- Manual: Start server and run `curl` commands below; open UI and exercise borrow/return flows.

Manual commands (dev):
```bash
# from repo root
node examples/shareit/server/app.js
# In another terminal:
curl -i -X POST http://localhost:3000/api/items/1/borrow
curl -i -X POST http://localhost:3000/api/items/1/return
curl -i http://localhost:3000/api/items | jq
```

## 4. Code Implementation (Already-applied snippets)
- `examples/shareit/server/adapters/itemsRepo.js` now includes `findById(id)` and `update(id, partial)` returning mutated object.
- `examples/shareit/server/domain/items.js` now includes `borrowItem(repo,id)` and `returnItem(repo,id)` which validate state and return normalized item or throw errors with `status` codes.

## 5. Validation Mapping
- Tasks → Acceptance Criteria:
  - Unit tests for domain logic validate borrow/return semantics (AC: borrow/return behavior, conflicts).
  - Route tests and manual `curl` checks validate server contract and persistence within running process.
  - Frontend manual checks validate optimistic UI and rollback behavior and final server-consistent state on refresh.

## 6. Decision Log (Final Decisions / Recorded Drift)
2025-12-02 | Add `findById` + `update` to in-memory adapter | Enables simple mutation for borrow/return in this increment; adapter isolates storage concerns | minimal
2025-12-02 | Add `borrowItem` / `returnItem` domain functions | Centralizes validation and conflict handling (409) in domain layer | minimal

## 7. Open Questions
- Confirm endpoint style: keep `POST /api/items/:id/borrow` & `POST /api/items/:id/return` (current) or use `PATCH /api/items/:id`? (Per Design we preferred `POST` endpoints.)
- Confirm client routing: use hash-based details view for simplicity or add a modal? (Design recommended hash-routing.)

## 8. Next Steps After Confirmation
1. You reply `confirm` to approve the Planned Files Summary and proceed.
2. I will implement the Tests step first (create failing unit tests), then implement the route handlers and client changes in separate commits, running verification after each high-level task.
3. I will update this `implement.md` checklist and Decision Log as tasks complete and push focused commits to `feature/borrow-item`.

---

Please reply with `confirm` (proceed) or `edit` (change the planned files summary or approach). If you'd like, answer the two open questions inline as `Q1: A/B` and `Q2: A/B`.

```markdown
