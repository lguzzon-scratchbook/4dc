# Refactor: Delete Todo with Undo

## Current State

Feature works perfectly - users can delete todos with a 3-second undo window, multiple deletions work independently, pending deletions are canceled on refresh, and all state persists correctly. All acceptance criteria pass.

After scanning the entire codebase (3 features now: add, toggle, delete), several improvements and an important cross-cutting pattern have emerged:

**Code quality issues:**
- `permanentlyDeleteTodo()` doesn't check if todo still has `pendingDelete` before deleting
- Timer cleanup issue: if user refreshes during countdown, timer continues in background
- Duplicate todo finding logic: `todos.find(t => t.id === id)` repeated 4 times
- Event delegation has grown to handle 3 actions - getting complex
- Missing helper to check pending delete state (similar to `isCompleted()`)

**Pattern discovered:**
- A consistent approach to timer management has emerged that needs documentation

## Refactoring Goals

- Add safety check to permanent deletion (verify still pending)
- Extract todo finding logic to helper function (DRY)
- Create `isPendingDelete()` helper (consistency with `isCompleted()`)
- Add defensive programming to timer callbacks
- Document timer management pattern for future time-based features

## Project-Level Design Decisions

During implementation of the delete feature, a pattern for managing ephemeral state (timers) alongside persistent state (localStorage) has emerged.

### Suggested ADR: Ephemeral State with Timers Pattern

**Pattern Discovered:** Features that use timers (setTimeout/setInterval) combine persistent state markers (`pendingDelete` timestamp) with ephemeral browser timers. On page load, persistent markers are cleaned up to prevent orphaned state.

**Project Impact:** Future time-based features (auto-save draft, session timeout, rate limiting) should follow this pattern:
1. Store timestamp in data model (persistent marker)
2. Start browser timer (ephemeral, lost on refresh)
3. Clean up persistent markers on initialization (prevent orphaned state)
4. Check persistent marker still exists in timer callback (defensive)

**Proposed Location:** `design/002-ephemeral-state-timers.md`

**To Be Referenced:** When implementing any future time-based features (auto-archive, snooze reminders, session management, etc.)

**Example from delete-with-undo:**
```javascript
// Persistent marker
todo.pendingDelete = Date.now();

// Ephemeral timer
setTimeout(() => {
  // Defensive: check marker still exists
  const currentTodo = getTodos().find(t => t.id === id);
  if (currentTodo?.pendingDelete) {
    permanentlyDeleteTodo(id);
  }
}, 3000);

// Initialization cleanup
function initializeTodos() {
  const todos = getTodos();
  const cleaned = todos.map(({ pendingDelete, ...rest }) => rest);
  saveTodos(cleaned);
}
```

## Refactor Tasks

### 1. Extract Todo Finder Helper

**Why:** `todos.find(t => t.id === id)` duplicated in 4 functions (toggleTodo, markForDeletion, cancelDeletion, permanentlyDeleteTodo)  
**What:** Create `findTodoById(todos, id)` helper function  
**How:** `const findTodoById = (todos, id) => todos.find(t => t.id === id);`  
**Verify:** Replace all usages, functionality unchanged

### 2. Add isPendingDelete Helper

**Why:** Checking `todo.pendingDelete` inconsistently - sometimes in render, sometimes inline  
**What:** Create `isPendingDelete(todo)` helper matching `isCompleted()` pattern  
**How:** `const isPendingDelete = (todo) => !!todo.pendingDelete;`  
**Verify:** Use in renderTodoItem conditional, clearer intent

### 3. Add Defensive Check to Permanent Delete Timer

**Why:** Timer callback doesn't verify todo still has `pendingDelete` flag before deleting  
**What:** Check if todo exists and still has `pendingDelete` in setTimeout callback  
**How:** Inside setTimeout, check `if (currentTodo?.pendingDelete)` before calling permanentlyDeleteTodo  
**Verify:** Manually trigger edge case - shouldn't crash if todo was undone

### 4. Simplify Event Delegation Logic

**Why:** Growing if-else chain for 3 actions (toggle, delete, undo)  
**What:** Use object lookup pattern for cleaner action dispatch  
**How:** Create action handler map: `{ toggle: handleToggle, delete: handleDelete, undo: handleUndo }`  
**Verify:** All three actions still work correctly

### 5. Add Comment Documenting Timer Pattern

**Why:** The persistent marker + ephemeral timer pattern is critical but undocumented  
**What:** Add multi-line comment above `markForDeletion()` explaining the pattern  
**How:** Document the two-part approach: persistent timestamp + cleanup on init  
**Verify:** Code clarity improved for future developers

## Success Criteria

- [x] All acceptance criteria still pass
- [ ] Todo finder logic extracted to single helper
- [ ] `isPendingDelete()` helper created for consistency
- [ ] Timer callback has defensive check
- [ ] Event delegation simplified with action handlers
- [ ] Timer pattern documented in code comments
- [ ] No new functionality added (strictly improvements)
- [ ] Timer management pattern ready to be documented as ADR

## Notes

After completing these refactors, we should create `design/002-ephemeral-state-timers.md` to document how to combine persistent state markers with ephemeral browser timers, including initialization cleanup patterns.

This is a critical pattern that will apply to future features like:
- Auto-save drafts (periodic timer + lastSaved timestamp)
- Session timeout warnings (countdown + sessionExpiry timestamp)
- Snooze/reminder features (scheduled callback + snoozeUntil timestamp)
