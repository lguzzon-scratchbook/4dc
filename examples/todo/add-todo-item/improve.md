# Refactor: Add Todo Item

## Current State
Feature works perfectly - all acceptance criteria pass. Users can add todos via Enter/button, todos persist in localStorage, focus is maintained, empty input is blocked. Code is clean and readable with good separation of concerns.

However, there are minor improvements that would enhance maintainability and educational value:
- Magic string for localStorage key ('todos') appears in two places
- DOM element IDs are duplicated across functions (could be cached)
- Empty state message is hard-coded HTML in JS
- No inline comments explaining the "why" behind design choices for learners

## Refactoring Goals
- Extract magic values to constants (DRY, maintainability)
- Cache DOM references (minor performance, clearer intent)
- Add educational comments explaining key patterns
- Keep code aligned with constitutional "educational clarity" principle

## Refactor Tasks

### 1. Extract localStorage Key Constant
**Why:** String 'todos' appears in both `getTodos()` and `saveTodos()` - duplication risk if we ever need to change it  
**What:** Create constant `const STORAGE_KEY = 'todos'` at top of file  
**How:** Add constant declaration, replace both string occurrences  
**Verify:** Open app in browser, add/refresh todos - should work identically

### 2. Cache DOM Element References
**Why:** `document.getElementById('todoInput')` and `getElementById('addButton')` called multiple times - shows pattern of element lookup  
**What:** Cache references in variables at module level after DOM loads  
**How:** Move element lookups to bottom of file (after DOM ready), store in `const` variables  
**Verify:** All interactions still work (Enter, button click, focus)

### 3. Add Educational Comments
**Why:** As an educational example, code should explain design decisions for learners  
**What:** Add 3-4 concise comments explaining key patterns (why objects not strings, why unshift, why escapeHtml)  
**How:** Add comments above key sections without cluttering  
**Verify:** Read through code - comments clarify without noise

### 4. Extract Empty State Message
**Why:** HTML string buried in renderTodos() - harder to update or localize  
**What:** Move empty state message to constant at top  
**How:** Create `const EMPTY_STATE_MESSAGE` constant, reference in renderTodos  
**Verify:** Clear all todos, see empty state message displays correctly

## Success Criteria
- [x] All acceptance criteria still pass (Enter, button, persistence, focus, empty block, duplicates)
- [x] No magic strings in code (localStorage key, messages extracted)
- [x] DOM lookups cached and clear
- [x] Code includes helpful educational comments
- [x] No new functionality added (strictly refactoring)
- [x] Code still fits constitutional "simplicity first" principle
