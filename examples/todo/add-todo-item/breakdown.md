# Tasks: Add Todo Item

## Relevant Files

- `examples/todo/index.html` - Main page with input form and todo list container
- `examples/todo/app.js` - All JavaScript logic (add, render, localStorage)

**Note:** Only two files needed per constitutional "single HTML file when possible" principle.

## Progress Tracking

**As you complete each task, check it off by changing `- [ ]` to `- [x]`.**

## Implementation Tasks

- [x] **Setup**
  - [x] Create basic HTML structure with Tailwind CDN
  - [x] Add input field, Add button, and empty list container
  - [x] Create empty `app.js` and link via `<script type="module">`
  - [x] Verify: Open index.html in browser, see input and button

- [x] **localStorage helpers**
  - [x] Create `getTodos()` function - reads from localStorage, returns array
  - [x] Create `saveTodos(todos)` function - writes array to localStorage
  - [x] Handle missing/corrupted data (return empty array as default)
  - [x] Verify: Call functions in console, check localStorage in DevTools

- [x] **Add todo functionality**
  - [x] Create `addTodo(text)` function
  - [x] Generate todo object: `{id: Date.now(), text: text, createdAt: new Date().toISOString()}`
  - [x] Read existing todos, prepend new todo, save back
  - [x] Verify: Call `addTodo("test")` in console, check localStorage updates

- [x] **Render todo list**
  - [x] Create `renderTodos()` function
  - [x] Read todos from localStorage
  - [x] Generate HTML for each todo (list items)
  - [x] Update DOM container with todo list
  - [x] Verify: Call `renderTodos()` in console, see todos appear on page

- [x] **Handle button click**
  - [x] Get input value, trim whitespace
  - [x] If empty, return early (do nothing)
  - [x] Call `addTodo()` with input value
  - [x] Call `renderTodos()` to update display
  - [x] Clear input field
  - [x] Maintain input focus
  - [x] Verify: Click button with text, see todo appear at top of list

- [x] **Handle Enter key**
  - [x] Listen for keypress/keydown on input field
  - [x] Check if key is Enter
  - [x] Trigger same logic as button click
  - [x] Verify: Press Enter with text, see todo appear at top of list

- [x] **Load todos on page load**
  - [x] Call `renderTodos()` when page loads
  - [x] Verify: Add todos, refresh page, see todos still displayed

- [ ] **Integration & Verification**
  - [ ] Test: Type "Buy groceries" and press Enter → appears at top, input clears, focus maintained
  - [ ] Test: Type "Call mom" and click Add → appears at top, input clears, focus maintained
  - [ ] Test: Refresh page → both todos still visible
  - [ ] Test: Add "Buy groceries" again → duplicate appears (allowed)
  - [ ] Test: Press Enter with empty input → nothing happens
  - [ ] Test: Add todo, immediately start typing → can add next todo without clicking
  - [ ] Check browser console for errors (should be none)

- [ ] **Quick Review**
  - [ ] All acceptance criteria pass
  - [ ] Code follows design approach (objects with IDs, separate JS file, localStorage)
  - [ ] No debug console.logs or dead code
  - [ ] HTML and JS are clean and readable

- [ ] **Complete**
  - [ ] Commit: "Add todo item feature - vanilla JS with localStorage"
  - [ ] Feature ready for use (no deployment needed - static files)
