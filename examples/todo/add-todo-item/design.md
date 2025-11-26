# Design: Add Todo Item

**Date:** 2025-11-26  
**Status:** Initial Sketch

## Design Summary
Client-side todo management using vanilla JavaScript with localStorage persistence. Each todo is stored as an object with ID and timestamp for future extensibility (editing, sorting). Single JS module handles all logic to keep the example simple while maintaining clean separation from HTML.

## Initial Approach

### Data Structure in localStorage
**Approach:** Array of objects with IDs and timestamps: `[{id: 1, text: "Buy groceries", createdAt: "2025-11-26T10:30:00Z"}]`  
**Rationale:** IDs enable future features (edit, delete) without array index brittleness. Timestamps support future sorting/filtering and demonstrate best practice for data modeling.  
**Trade-offs:** Slightly more complex than string array, but sets up clean foundation. Accept minor overhead for future flexibility.  
**Alternatives to Consider:** String array would be simpler for MVP but would require migration later for edit/delete features.

### Todo List Rendering
**Approach:** User's choice - to be determined during implementation  
**Rationale:** Both innerHTML and DOM manipulation are valid. Will decide based on what feels cleaner when writing code.  
**Trade-offs:** innerHTML is simpler (template strings) but requires full rebuild. createElement is more surgical but verbose. Either works for this scale.  
**Alternatives to Consider:** innerHTML for initial implementation, refactor to DOM manipulation if performance becomes issue (unlikely with <100 todos).

### Code Organization
**Approach:** Separate JS module file (`app.js`) imported by HTML via `<script type="module">`  
**Rationale:** Separates logic from markup per constitutional "educational clarity" principle. Shows ES6 module usage without build tools.  
**Trade-offs:** Two files instead of one, but cleaner separation of concerns. Demonstrates real-world structure.  
**Alternatives to Consider:** Inline script would work but mixes concerns. Multiple modules (storage.js, ui.js, events.js) is over-engineering for this scope.

### localStorage Key and Operations
**Approach:** Single key `"todos"` storing JSON array. Read on page load, write on every add.  
**Rationale:** Simple synchronous operations fit constitutional "browser-native first". No need for async complexity or caching layers.  
**Trade-offs:** JSON.stringify/parse on every operation is fine for small datasets (<1000 items). Accept this simplicity over premature optimization.  
**Alternatives to Consider:** IndexedDB would handle larger datasets but violates "simplicity first" for a todo example.

### ID Generation
**Approach:** `Date.now()` for unique IDs (timestamp in milliseconds)  
**Rationale:** Simple, collision-resistant for single-user app, no libraries needed. Shows native JS approach.  
**Trade-offs:** Not cryptographically secure but sufficient for client-side todos. Accept this trade-off for simplicity.  
**Alternatives to Consider:** UUID library (constitutional violation), incrementing counter (requires tracking max ID), crypto.randomUUID (good option but Date.now() is more transparent).

## Architecture Overview

**Components:**
- `index.html`: Page structure, form with input + button, empty list container
- `app.js`: All JavaScript logic (event handlers, localStorage, rendering)

**Data Flow:**
User types → Enter/Click → `addTodo()` → Create object {id, text, createdAt} → Read existing array from localStorage → Prepend new todo → Save to localStorage → Re-render list → Clear input → Maintain focus

**Integration Points:**
- localStorage API: Read/write todo array
- Tailwind CSS CDN: Styling (loaded in HTML head)

**State Management:**
- **Persistent:** Todos array in localStorage under key `"todos"`
- **Transient:** Current input value (DOM manages this)
- **Derived:** Rendered list (generated from localStorage on each change)

## Implementation Constraints
- Must work without any build step (direct browser execution)
- localStorage size limit ~5-10MB (non-issue for text todos)
- Single HTML file + single JS module only
- No frameworks or libraries except Tailwind CSS via CDN
- Must handle Enter key AND button click
- Must maintain input focus after adding
- Empty input must be blocked (trim whitespace)

## Open Questions
- Should we add visual feedback during add (animation/transition)? Defer to implementation - try without first.
- Error handling if localStorage is full or disabled? Defer - unlikely in example, can add console warning if needed.
- Should we display timestamps to user? No for this increment - data supports it but UI doesn't need it yet.
