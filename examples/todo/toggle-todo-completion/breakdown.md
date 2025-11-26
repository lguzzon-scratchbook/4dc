# Tasks: Toggle Todo Completion

## Relevant Files

- `examples/todo/app.js` - Add checkbox rendering, toggle logic, relative time calculation, event delegation, and auto-refresh interval
- `examples/todo/index.html` - No changes needed (checkbox added via JavaScript)

## Progress Tracking

**As you complete each task, check it off by changing `- [ ]` to `- [x]`.**

## Implementation Tasks

- [x] **Add relative time calculation**
  - [x] Create `getRelativeTime(timestamp)` function that returns human-readable string
  - [x] Handle seconds, minutes, hours, days cases with proper pluralization
  - [x] Verify: Call with various timestamps, check output ("2 minutes ago", "1 hour ago", "3 days ago")

- [x] **Extend data model for completion**
  - [x] Modify `addTodo()` to ensure new todos have no `completedAt` field (unchecked by default)
  - [x] Verify: Add new todo, check localStorage - should have no `completedAt` property

- [x] **Create toggle completion function**
  - [x] Create `toggleTodo(id)` function that finds todo by ID
  - [x] If `completedAt` exists, set to `null` (unchecking)
  - [x] If `completedAt` is null/undefined, set to `Date.now()` (checking)
  - [x] Call `saveTodos()` to persist
  - [x] Verify: Call function with test ID, check localStorage updates correctly

- [x] **Update render to show checkboxes**
  - [x] Modify `renderTodos()` to add checkbox before todo text
  - [x] Add `data-id` attribute to each list item for event delegation
  - [x] Set checkbox `checked` attribute based on `completedAt` presence
  - [x] Verify: View page, checkboxes appear unchecked for all todos

- [x] **Add conditional styling for completed todos**
  - [x] In `renderTodos()`, apply `line-through text-gray-400` classes when `completedAt` exists
  - [x] Keep normal `text-gray-900` when not completed
  - [x] Verify: Manually set `completedAt` in localStorage, refresh page - todo shows strikethrough and gray

- [x] **Display relative completion time**
  - [x] In `renderTodos()`, show "Completed X ago" text when `completedAt` exists
  - [x] Use `getRelativeTime(todo.completedAt)` for the time display
  - [x] Style with small gray text (`text-xs text-gray-400`)
  - [x] Verify: Manually set `completedAt`, refresh - see "Completed just now" or similar

- [x] **Set up event delegation for checkbox clicks**
  - [x] Add click event listener on `todoListElement` container
  - [x] Check if clicked element is a checkbox with `data-action="toggle"`
  - [x] Extract `data-id` from parent list item
  - [x] Call `toggleTodo(id)` and `renderTodos()`
  - [x] Verify: Click checkbox - todo toggles between checked/unchecked, styling updates, time appears/disappears

- [x] **Add auto-refresh for relative time updates**
  - [x] Add `setInterval(() => renderTodos(), 60000)` after initial render
  - [x] Verify: Complete a todo, wait 2+ minutes - time display updates ("just now" → "1 minute ago" → "2 minutes ago")

- [x] **Integration & Verification**
  - [x] Test complete flow: check todo → see strikethrough + time → refresh → persists → uncheck → resets
  - [x] Verify all acceptance criteria from feature.md
  - [x] Check multiple todos can be toggled independently
  - [x] Verify empty state still works when no todos exist

- [x] **Quick Review**
  - [x] All acceptance criteria pass
  - [x] Code follows existing patterns (escapeHtml, localStorage helpers, etc.)
  - [x] No console errors or warnings
  - [x] Remove any debug statements

- [x] **Completion**
  - [x] Commit changes: "Add todo completion toggle with relative time display"
  - [x] Feature complete and ready for improve phase
