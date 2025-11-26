# Design: Toggle Todo Completion

## Context

We need to add checkbox functionality to toggle todo completion status. Completed todos should display with visual distinction (strikethrough, lighter color) and show relative completion time that updates automatically. The feature must persist completion state across page refreshes using localStorage.

**Constitutional Constraints:**
- Vanilla JavaScript only (no libraries for time formatting)
- localStorage for persistence
- Browser-native APIs
- Single-file simplicity where possible

**Feature Requirements:**
- Checkbox on left of todo text
- Toggle completion on/off
- Visual styling changes (strikethrough, gray text)
- Relative time display ("Completed 2 hours ago")
- Live updates every minute
- Persistence across refreshes

## Initial Approach to Try

### 1. Data Model Extension

**Approach:** Add `completedAt` timestamp field only - presence indicates completion.

```javascript
// Existing structure
{
  id: 1732627800000,
  text: "Buy groceries",
  createdAt: "2025-11-26T10:30:00.000Z"
}

// Extended structure
{
  id: 1732627800000,
  text: "Buy groceries",
  createdAt: "2025-11-26T10:30:00.000Z",
  completedAt: 1732631400000  // timestamp when checked (or null/undefined)
}
```

**Why this works:**
- Simple: one field instead of two (`completed` boolean + `completedAt` timestamp)
- `completedAt` presence = completed, absence = not completed
- Timestamp enables relative time calculation
- When unchecking, just set `completedAt` to `null`

### 2. Relative Time Calculation

**Approach:** Pure JavaScript time math, no libraries.

```javascript
function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
}
```

**Why this approach:**
- Browser-native (no date-fns, no moment.js)
- Simple logic, easy to understand
- Covers the requirement: seconds → minutes → hours → days
- Educational for vanilla JS learners

### 3. Live Time Updates

**Approach:** Use `setInterval()` to re-render every 60 seconds.

```javascript
// On page load
setInterval(() => {
  renderTodos(); // Re-render to update relative times
}, 60000); // 60 seconds
```

**Why this approach:**
- Meets acceptance criteria: "relative completion time updates"
- Simple implementation
- 60-second granularity is reasonable (not updating every second)
- Doesn't require tracking individual intervals per todo

**Trade-off:** Re-renders entire list every minute (could be optimized later to only update time text, but premature for current scope).

### 4. Event Handling Pattern

**Approach:** Event delegation on todo list container (single listener).

```javascript
// In renderTodos() - add data-id to each item
todoListElement.innerHTML = todos.map(todo => `
  <li data-id="${todo.id}">
    <input type="checkbox" data-action="toggle" ${todo.completedAt ? 'checked' : ''}>
    ...
  </li>
`).join('');

// Single event listener on container
todoListElement.addEventListener('click', (e) => {
  if (e.target.dataset.action === 'toggle') {
    const li = e.target.closest('[data-id]');
    const todoId = Number(li.dataset.id);
    toggleTodo(todoId);
    renderTodos();
  }
});
```

**Why this approach:**
- More efficient than individual listeners per checkbox
- Handles dynamically rendered todos automatically
- Standard pattern for list interactions
- Educational value: demonstrates event delegation

**Alternatives considered:**
- Individual listeners: Works but creates N listeners (not scalable pattern)
- Inline onclick: Violates separation of concerns, harder to test

### 5. Visual Styling

**Approach:** Use Tailwind utility classes conditionally.

```javascript
// In template
const completedClass = todo.completedAt 
  ? 'line-through text-gray-400' 
  : 'text-gray-900';

<li class="...">
  <input type="checkbox" ${todo.completedAt ? 'checked' : ''}>
  <span class="${completedClass}">${escapeHtml(todo.text)}</span>
  ${todo.completedAt ? `<span class="text-xs text-gray-400">Completed ${getRelativeTime(todo.completedAt)}</span>` : ''}
</li>
```

**Why this approach:**
- Tailwind classes align with constitutional decision (CDN styling)
- `line-through` for strikethrough (native CSS)
- `text-gray-400` for lighter color
- Conditional rendering based on `completedAt` presence

## Architecture Overview

```
User clicks checkbox
  ↓
Event delegation catches click (todoListElement listener)
  ↓
Extract todo ID from data-id attribute
  ↓
toggleTodo(id) - finds todo, sets/unsets completedAt timestamp
  ↓
saveTodos() - persist to localStorage
  ↓
renderTodos() - re-render with updated state
  ↓
Display: checkbox checked/unchecked, strikethrough if completed, relative time if completed
  ↓
setInterval re-renders every 60s to update relative times
```

## Key Functions to Add/Modify

**New:**
- `toggleTodo(id)` - Toggle completion state
- `getRelativeTime(timestamp)` - Calculate relative time string

**Modified:**
- `renderTodos()` - Include checkbox, conditional styling, completion time
- Initialization - Add event listener and setInterval

**Unchanged:**
- `getTodos()`, `saveTodos()` - work with extended data model automatically
- `addTodo()` - new todos have no `completedAt` (unchecked by default)

## Trade-offs

**Chosen:**
- Single `completedAt` field vs. separate `completed` boolean
  - **Pro:** Simpler data model, one source of truth
  - **Con:** Need to check `if (completedAt)` instead of `if (completed)`
  - **Decision:** Simplicity wins, nullable timestamp is idiomatic

**Chosen:**
- Event delegation vs. individual listeners
  - **Pro:** More efficient, scales better, educational pattern
  - **Con:** Slightly more complex setup (data-id attributes)
  - **Decision:** Better pattern to teach

**Chosen:**
- setInterval re-render vs. granular time updates
  - **Pro:** Simple implementation, entire UI stays in sync
  - **Con:** Re-renders even when no completed todos exist
  - **Decision:** Premature optimization to avoid, can refine in improve phase

**Chosen:**
- Custom time calculation vs. Intl.RelativeTimeFormat
  - **Pro:** More educational, explicit control, wider browser support
  - **Con:** More code, manual pluralization
  - **Decision:** Educational value wins for this demo project

## Success Criteria

- [ ] Checkbox appears on left of each todo
- [ ] Clicking checkbox toggles completion (check/uncheck)
- [ ] Completed todos show strikethrough and gray text
- [ ] Completed todos display "Completed X ago"
- [ ] Relative time updates every 60 seconds
- [ ] Completion state persists across page refresh
- [ ] Unchecking removes strikethrough, gray text, and time display
- [ ] No new dependencies added (vanilla JS only)

## Notes

This is an **initial sketch**, not final decisions. During implementation, we may discover:
- Better ways to structure the event handler
- Edge cases in time calculation (e.g., future timestamps)
- Performance considerations with large todo lists

Those refinements belong in the **improve** phase after getting it working.
