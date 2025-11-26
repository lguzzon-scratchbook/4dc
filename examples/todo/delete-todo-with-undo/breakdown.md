# Tasks: Delete Todo with Undo

## Relevant Files

- `examples/todo/app.js` - Add delete button rendering, deletion functions (mark/cancel/permanent), timer management, initialization cleanup

## Progress Tracking

**As you complete each task, check it off by changing `- [ ]` to `- [x]`.**

## Implementation Tasks

- [x] **Add deletion state cleanup on initialization**
  - [x] Create `initializeTodos()` function that reads todos from localStorage
  - [x] Remove any `pendingDelete` fields from all todos (clean slate on page load)
  - [x] Save cleaned todos back to localStorage
  - [x] Replace the initial `renderTodos()` call with `initializeTodos()`
  - [x] Verify: Manually add `pendingDelete` to localStorage, refresh page - field should be removed

- [x] **Create mark for deletion function**
  - [x] Create `markForDeletion(id)` function following state mutation pattern
  - [x] Read todos, find todo by ID, set `todo.pendingDelete = Date.now()`
  - [x] Save todos, render
  - [x] Start `setTimeout(() => permanentlyDeleteTodo(id), 3000)`
  - [x] Verify: Call function, check localStorage - `pendingDelete` field appears

- [x] **Create cancel deletion function**
  - [x] Create `cancelDeletion(id)` function following state mutation pattern
  - [x] Read todos, find todo by ID, use `delete todo.pendingDelete` to remove field
  - [x] Save todos, render
  - [x] Verify: Call on pending delete todo - field removed, renders normally

- [x] **Create permanent delete function**
  - [x] Create `permanentlyDeleteTodo(id)` function following state mutation pattern
  - [x] Read todos, filter to remove todo with matching ID: `todos.filter(t => t.id !== id)`
  - [x] Save filtered array, render
  - [x] Verify: Call function, todo disappears from list and localStorage

- [x] **Add delete button to normal todo rendering**
  - [x] In `renderTodoItem()`, add delete button for normal state (when no `pendingDelete`)
  - [x] Add `data-action="delete"` attribute for event delegation
  - [x] Style with Tailwind: red text, hover effect
  - [x] Verify: Delete button appears on each normal todo

- [x] **Add pending delete state rendering**
  - [x] In `renderTodoItem()`, check `if (todo.pendingDelete)` at the start
  - [x] Return different HTML: grayed item with `opacity-50`, strikethrough text
  - [x] Show "Deleted - Undo" button with `data-action="undo"` attribute
  - [x] Hide checkbox and original content
  - [x] Verify: Manually set `pendingDelete`, refresh - see grayed item with undo button

- [x] **Add delete button event handler**
  - [x] In event delegation listener, add case for `data-action="delete"`
  - [x] Extract todo ID from `data-id` attribute
  - [x] Call `markForDeletion(id)`
  - [x] Verify: Click delete - todo grays out, shows undo button

- [x] **Add undo button event handler**
  - [x] In event delegation listener, add case for `data-action="undo"`
  - [x] Extract todo ID from `data-id` attribute  
  - [x] Call `cancelDeletion(id)`
  - [x] Verify: Click undo on grayed todo - returns to normal appearance

- [x] **Test 3-second automatic deletion**
  - [x] Click delete on a todo
  - [x] Wait 3 seconds without clicking undo
  - [x] Verify: Todo disappears from list and localStorage after timeout

- [x] **Test multiple simultaneous deletions**
  - [x] Click delete on multiple todos quickly
  - [x] Verify: All show grayed with independent undo buttons
  - [x] Undo one, let others complete
  - [x] Verify: Undone todo stays, others delete after 3 seconds

- [x] **Integration & Verification**
  - [x] Test complete delete flow: click delete → wait → permanent removal
  - [x] Test undo flow: click delete → click undo → todo restored
  - [x] Test refresh behavior: delete todo → refresh before 3 seconds → todo still there
  - [x] Verify all acceptance criteria from feature.md
  - [x] Check deletion persists: delete → wait 3s → refresh → confirm still gone

- [x] **Quick Review**
  - [x] All acceptance criteria pass
  - [x] Code follows state mutation pattern (Read-Modify-Save-Render)
  - [x] No console errors or warnings
  - [x] All three new functions properly documented
  - [x] Remove any debug statements

- [x] **Completion**
  - [x] Commit changes: "Add delete with 3-second undo functionality"
  - [x] Feature complete and ready for improve phase
