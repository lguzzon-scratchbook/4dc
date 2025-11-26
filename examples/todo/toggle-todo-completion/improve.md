# Refactor: Toggle Todo Completion

## Current State

Feature works perfectly - users can check/uncheck todos, see visual distinction (strikethrough, gray text), view relative completion times that auto-update every 60 seconds, and state persists across refreshes. All acceptance criteria pass.

However, after scanning the entire codebase, several quality improvements and a project-wide pattern have emerged:

**Code quality issues:**
- `renderTodos()` function is getting long (26 lines) and does multiple things
- Template string in `renderTodos()` is complex and hard to read
- Magic number `60000` for interval timing
- Repeated conditional logic for `isCompleted`
- No error handling for invalid todo IDs in event delegation

**Pattern discovered:**
- A consistent approach to data mutation has emerged across both features (add todo and toggle completion) that should be codified

## Refactoring Goals

- Extract todo item rendering to separate function (Single Responsibility)
- Add constants for timing and CSS classes (eliminate magic values)
- Simplify conditional logic in render (readability)
- Add defensive error handling (robustness)
- Document the data mutation pattern for future features

## Project-Level Design Decisions

During implementation of the first two features, a clear pattern has emerged that should guide all future todo operations.

### Suggested ADR: State Mutation Pattern

**Pattern Discovered:** All state changes follow the same sequence: `getTodos()` → modify array → `saveTodos()` → `renderTodos()`. This "read-modify-save-render" cycle ensures localStorage and UI stay in sync.

**Project Impact:** All future features (delete todo, edit todo, reorder todos, etc.) should follow this exact pattern. Skipping steps or changing order leads to bugs (UI out of sync with storage, or vice versa).

**Proposed Location:** `design/001-state-mutation-pattern.md`

**To Be Referenced:** When implementing any future todo operations (delete, edit, reorder, filter, etc.)

**Example from current code:**
```javascript
// ✅ Correct pattern (from toggleTodo)
const todos = getTodos();           // 1. Read
const todo = todos.find(t => t.id === id);
todo.completedAt = Date.now();     // 2. Modify
saveTodos(todos);                   // 3. Save
renderTodos();                      // 4. Render (called by event handler)

// ❌ Wrong pattern (skips save)
const todos = getTodos();
todos[0].text = 'New text';
renderTodos(); // UI updated, but NOT saved to localStorage
```

## Refactor Tasks

### 1. Extract Todo Item Rendering

**Why:** `renderTodos()` is 26 lines and mixes list logic with item rendering  
**What:** Extract `renderTodoItem(todo)` function that returns HTML for a single todo  
**How:** Create new function, move template string logic, call from `map()`  
**Verify:** All todos still render correctly, checkboxes work, completed todos show strikethrough

### 2. Add Timing and Style Constants

**Why:** Magic number `60000` and repeated CSS classes scattered in code  
**What:** Add `REFRESH_INTERVAL_MS = 60000` and `COMPLETED_CLASS = 'line-through text-gray-400'` constants  
**How:** Add to constants section at top, reference in code  
**Verify:** Auto-refresh still works every 60 seconds, styling unchanged

### 3. Simplify Completion Check Logic

**Why:** Checking `todo.completedAt` vs `!!todo.completedAt` inconsistently  
**What:** Create `isCompleted(todo)` helper function  
**How:** `const isCompleted = (todo) => !!todo.completedAt;` use throughout  
**Verify:** Completed/uncompleted todos still render correctly

### 4. Add Defensive Error Handling in Event Delegation

**Why:** If someone manipulates DOM manually, clicking could fail silently  
**What:** Add null check for `li` element in checkbox event handler  
**How:** `if (!li) return;` after `closest('[data-id]')`  
**Verify:** Still works normally, doesn't crash if DOM structure changes

### 5. Add Educational Comment for State Mutation Pattern

**Why:** The "read-modify-save-render" pattern is critical but undocumented  
**What:** Add comment above `toggleTodo()` explaining the pattern  
**How:** Multi-line comment describing the 4 steps and why they matter  
**Verify:** Code still works, comment aids understanding

## Success Criteria

- [x] All acceptance criteria still pass
- [x] `renderTodos()` is shorter and focused on list-level logic
- [x] Todo item rendering is isolated in `renderTodoItem()`
- [x] No magic numbers or scattered CSS class strings
- [x] Defensive error handling prevents silent failures
- [x] State mutation pattern is documented in code comments
- [x] No new functionality added (strictly improvements)
- [x] State mutation pattern ready to be documented as ADR after this refactor

## Notes

After completing these refactors, we should create `design/001-state-mutation-pattern.md` to document the read-modify-save-render cycle for future reference. This will help maintain consistency as more todo operations are added (delete, edit, reorder, etc.).
