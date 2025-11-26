# ADR 001: State Mutation Pattern

## Status
Accepted

## Context

After implementing two features (add todo and toggle completion), a consistent pattern has emerged for how we modify todo list state. We need to ensure all future features follow this pattern to prevent bugs where localStorage and UI get out of sync.

**Problem:** Without a clear pattern, developers might:
- Update UI without saving to localStorage (data lost on refresh)
- Save to localStorage without updating UI (stale display)
- Directly mutate state without proper read/write cycle (race conditions)

## Decision

All state mutations must follow the **Read-Modify-Save-Render** cycle:

1. **Read:** Get current state from localStorage via `getTodos()`
2. **Modify:** Make changes to the in-memory array
3. **Save:** Persist changes via `saveTodos(todos)`
4. **Render:** Update UI via `renderTodos()` (called by event handler)

**Example from `toggleTodo()`:**
```javascript
function toggleTodo(id) {
    const todos = getTodos();           // 1. Read
    const todo = todos.find(t => t.id === id);
    todo.completedAt = Date.now();     // 2. Modify
    saveTodos(todos);                   // 3. Save
    // renderTodos() is called by event handler after this returns
}
```

**Example from `addTodo()`:**
```javascript
function addTodo(text) {
    const todo = { id: Date.now(), text, createdAt: new Date().toISOString() };
    const todos = getTodos();           // 1. Read
    todos.unshift(todo);               // 2. Modify
    saveTodos(todos);                   // 3. Save
    // renderTodos() is called by event handler after this returns
}
```

## Consequences

### Positive
- **Data integrity:** localStorage and UI always stay in sync
- **Predictability:** All operations follow same pattern, easier to understand
- **Testability:** Each step is isolated and can be tested independently
- **Maintainability:** New developers can follow established pattern

### Negative
- **Performance:** Re-reading entire array each time (acceptable for small todo lists)
- **Strictness:** Pattern feels repetitive for simple operations
- **Not enforced:** JavaScript doesn't prevent breaking the pattern

### Future Considerations
- If performance becomes an issue with large lists, consider:
  - Caching todos in memory (invalidate on mutation)
  - Incremental localStorage updates
  - Virtual scrolling for rendering
- Pattern applies to: delete todo, edit todo, reorder todos, bulk operations, filter/sort state

## Examples of Wrong Patterns

❌ **Skipping Save:**
```javascript
const todos = getTodos();
todos[0].text = 'New text';
renderTodos(); // UI updated, but localStorage NOT saved
// Bug: Refresh page loses changes
```

❌ **Skipping Render:**
```javascript
const todos = getTodos();
todos.push(newTodo);
saveTodos(todos);
// Bug: UI doesn't update until next render
```

❌ **Direct Mutation:**
```javascript
todoListElement.innerHTML += `<li>New todo</li>`;
// Bug: State not saved, manual DOM manipulation breaks event delegation
```

## Related Documents
- `CONSTITUTION.md` - Principle 3: Browser-Native First (localStorage for persistence)
- `examples/todo/app.js` - Implementation of this pattern in `addTodo()` and `toggleTodo()`

---

**Date:** 2025-11-26  
**Author:** AI Assistant (via 4DC improve phase)  
**Features:** add-todo-item, toggle-todo-completion
