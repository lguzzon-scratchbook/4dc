# Design: Delete Todo with Undo

## Context

We need to add delete functionality with a 3-second undo window. When users click delete, the todo becomes grayed out with an inline "Undo" button. After 3 seconds without undo, the todo is permanently removed. Multiple todos can be pending deletion simultaneously.

**Constitutional Constraints:**
- Vanilla JavaScript only (no libraries)
- localStorage for persistence
- Browser-native APIs (setTimeout)
- Follows existing state mutation pattern (Read-Modify-Save-Render)

**Feature Requirements:**
- Delete button on each todo (always visible)
- Grayed/faded during countdown
- Inline "Deleted - Undo" button replaces item content
- 3-second window to undo
- Multiple simultaneous pending deletions
- Permanent removal after timeout

**Design Pattern Reference:**
- Must follow ADR 001: State Mutation Pattern (Read-Modify-Save-Render)

## Initial Approach to Try

### 1. Tracking Deletion State

**Approach:** Add `pendingDelete` timestamp field to todo objects.

```javascript
// Normal todo
{
  id: 1732627800000,
  text: "Buy groceries",
  createdAt: "2025-11-26T10:30:00.000Z",
  completedAt: null
}

// Todo pending deletion
{
  id: 1732627800000,
  text: "Buy groceries",
  createdAt: "2025-11-26T10:30:00.000Z",
  completedAt: null,
  pendingDelete: 1732631400000  // timestamp when delete was clicked
}
```

**Why this approach:**
- Consistent with existing pattern (`completedAt` field)
- State persists in localStorage naturally
- Rendering can check `if (todo.pendingDelete)` to show different UI
- Follows state mutation pattern

**Trade-offs:**
- **Pro:** Deletion state survives across renders, simple to reason about
- **Pro:** Follows existing architectural pattern from ADR 001
- **Con:** Pending deletions persist in localStorage (but we'll cancel them on refresh)
- **Decision:** Consistency with existing patterns wins

### 2. Countdown Timer Management

**Approach:** Each todo gets its own independent `setTimeout`, no central tracking needed.

```javascript
function startDeleteCountdown(id) {
  const timeoutId = setTimeout(() => {
    permanentlyDeleteTodo(id);
  }, 3000);
  
  // No need to store timeoutId - we'll cancel via clearing pendingDelete
}
```

**Why this approach:**
- Simple implementation - one setTimeout per deletion
- Browser handles multiple timers automatically
- Timers are ephemeral (don't persist, don't need cleanup on unmount)
- Each timer is independent (parallel countdowns work naturally)

**Trade-offs:**
- **Pro:** Simplest possible implementation
- **Pro:** No need to track timeout IDs in memory or cleanup
- **Pro:** Browser-native solution (no manual timer management)
- **Con:** Can't easily show countdown progress (but spec doesn't require it)
- **Con:** Timers lost on refresh (but that's our decision - see below)
- **Decision:** Simplicity wins for this increment

### 3. Refresh Behavior

**Approach:** Refresh cancels pending deletions (todos stay).

```javascript
// On page load, clear all pendingDelete flags
function initializeTodos() {
  const todos = getTodos();
  const cleaned = todos.map(todo => {
    const { pendingDelete, ...rest } = todo;
    return rest; // Remove pendingDelete field
  });
  saveTodos(cleaned);
  renderTodos();
}
```

**Why this approach:**
- Safer default - users don't lose data unexpectedly
- Simpler than persisting countdown state
- Timers don't survive refresh anyway (can't resume countdown)
- Matches user mental model: "If I refresh, I cancel my action"

**Trade-offs:**
- **Pro:** Prevents accidental data loss
- **Pro:** No complex logic to resume timers
- **Pro:** Simple initialization code
- **Con:** User can "escape" deletion by refreshing (but that's intentional safety)
- **Decision:** Safety and simplicity win

### 4. Visual Rendering

**Approach:** Conditional rendering based on `pendingDelete` presence.

```javascript
function renderTodoItem(todo) {
  if (todo.pendingDelete) {
    // Show grayed out item with undo button
    return `
      <li class="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 opacity-50">
        <span class="text-gray-400 line-through">${escapeHtml(todo.text)}</span>
        <button data-action="undo" data-id="${todo.id}" class="...">
          Deleted - Undo
        </button>
      </li>
    `;
  }
  
  // Normal todo rendering
  return `
    <li ...>
      <input type="checkbox" ...>
      <span>...</span>
      <button data-action="delete" data-id="${todo.id}">Delete</button>
    </li>
  `;
}
```

**Why this approach:**
- Reuses existing `renderTodoItem()` function
- Single source of truth (`pendingDelete` field)
- CSS opacity for faded appearance (Tailwind `opacity-50`)
- Hides checkbox and original content when pending

**Trade-offs:**
- **Pro:** Leverages existing render architecture
- **Pro:** All visual state derived from data (no separate UI state)
- **Con:** Complete re-render on every change (acceptable for small lists)
- **Decision:** Consistency with existing render pattern

## Architecture Overview

```
User clicks delete button
  ↓
Event delegation catches click (data-action="delete")
  ↓
markForDeletion(id) - Read todos, set todo.pendingDelete = Date.now(), Save
  ↓
Start setTimeout(3000) to call permanentlyDeleteTodo(id)
  ↓
renderTodos() - Item shows grayed with "Deleted - Undo" button
  ↓
[User path A: Clicks Undo]
  ↓
cancelDeletion(id) - Read todos, delete todo.pendingDelete, Save, Render
  ↓
[User path B: 3 seconds elapse]
  ↓
permanentlyDeleteTodo(id) - Read todos, filter out by ID, Save, Render
```

**On page load:**
```
initializeTodos() runs
  ↓
Clean any pendingDelete flags from todos
  ↓
Save cleaned todos
  ↓
renderTodos()
```

## Key Functions to Add/Modify

**New:**
- `markForDeletion(id)` - Set `pendingDelete` timestamp, start timer
- `cancelDeletion(id)` - Remove `pendingDelete` flag
- `permanentlyDeleteTodo(id)` - Remove todo from array completely
- `initializeTodos()` - Clean pending deletions on load

**Modified:**
- `renderTodoItem()` - Add conditional rendering for pending delete state
- Event delegation - Add handlers for delete and undo buttons
- Page initialization - Call `initializeTodos()` instead of just `renderTodos()`

**Unchanged:**
- `getTodos()`, `saveTodos()` - work with extended data model
- State mutation pattern - all functions follow Read-Modify-Save-Render

## State Mutation Pattern Compliance

All three operations follow ADR 001:

**markForDeletion:**
```javascript
const todos = getTodos();           // 1. Read
const todo = todos.find(t => t.id === id);
todo.pendingDelete = Date.now();   // 2. Modify
saveTodos(todos);                   // 3. Save
renderTodos();                      // 4. Render
setTimeout(() => permanentlyDeleteTodo(id), 3000);
```

**cancelDeletion:**
```javascript
const todos = getTodos();           // 1. Read
const todo = todos.find(t => t.id === id);
delete todo.pendingDelete;         // 2. Modify
saveTodos(todos);                   // 3. Save
renderTodos();                      // 4. Render
```

**permanentlyDeleteTodo:**
```javascript
const todos = getTodos();           // 1. Read
const filtered = todos.filter(t => t.id !== id);  // 2. Modify
saveTodos(filtered);                // 3. Save
renderTodos();                      // 4. Render
```

## Trade-offs

**Chosen: pendingDelete field in todo objects**
- **Pro:** Consistent with existing architecture (`completedAt` pattern)
- **Pro:** Persists naturally with existing save/load
- **Con:** Slightly larger localStorage size during countdown
- **Decision:** Architecture consistency wins

**Chosen: Independent setTimeout per todo**
- **Pro:** Simplest implementation, browser handles concurrency
- **Pro:** No manual timer tracking or cleanup
- **Con:** Can't show live countdown seconds
- **Decision:** Simplicity wins (countdown display not in spec)

**Chosen: Refresh cancels deletions**
- **Pro:** Safer - prevents accidental data loss
- **Pro:** Simpler than persisting timer state
- **Con:** User can "cheat" by refreshing
- **Decision:** Safety first for delete operations

**Chosen: Opacity for grayed appearance**
- **Pro:** Simple CSS (Tailwind `opacity-50`)
- **Pro:** Entire item fades, clear visual distinction
- **Con:** Slightly less contrast than color change
- **Decision:** Tailwind utility classes align with constitution

## Success Criteria

- [ ] Delete button appears on each todo
- [ ] Clicking delete grays out item and shows "Deleted - Undo"
- [ ] Clicking undo restores todo to normal state
- [ ] After 3 seconds, todo is permanently removed
- [ ] Deletion persists across refresh (once timer completes)
- [ ] Multiple todos can be pending deletion simultaneously
- [ ] Page refresh cancels pending deletions
- [ ] Follows state mutation pattern (Read-Modify-Save-Render)

## Notes

This is an **initial sketch**. During implementation we may discover:
- Need for visual countdown indicator (seconds remaining)
- Better UX for the undo button positioning
- Performance considerations with many simultaneous timers

Those refinements belong in the **improve** phase after getting it working.
