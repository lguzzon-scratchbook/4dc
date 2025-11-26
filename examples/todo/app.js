// Constants
const STORAGE_KEY = 'todos';
const EMPTY_STATE_MESSAGE = '<li class="text-gray-400 text-center py-4">No todos yet. Add one above!</li>';
const REFRESH_INTERVAL_MS = 60000; // 60 seconds
const DELETE_UNDO_TIMEOUT_MS = 3000; // 3 seconds
const COMPLETED_CLASS = 'line-through text-gray-400';
const ACTIVE_CLASS = 'text-gray-900';

// localStorage helpers
function getTodos() {
    try {
        const todos = localStorage.getItem(STORAGE_KEY);
        return todos ? JSON.parse(todos) : [];
    } catch (error) {
        console.warn('Failed to read todos from localStorage:', error);
        return [];
    }
}

function saveTodos(todos) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.warn('Failed to save todos to localStorage:', error);
    }
}

// Helper to check if todo is completed
const isCompleted = (todo) => !!todo.completedAt;

// Helper to check if todo is pending deletion
const isPendingDelete = (todo) => !!todo.pendingDelete;

// Helper to find todo by ID
const findTodoById = (todos, id) => todos.find(t => t.id === id);

// Relative time calculation
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

// Add todo functionality
function addTodo(text) {
    // Store as objects with IDs and timestamps for future extensibility
    // (enables edit/delete features without array index brittleness)
    const todo = {
        id: Date.now(),
        text: text,
        createdAt: new Date().toISOString()
        // No completedAt - new todos are unchecked by default
    };
    
    const todos = getTodos();
    todos.unshift(todo); // Prepend to show most recent first
    saveTodos(todos);
}

// Toggle todo completion
// Follows the State Mutation Pattern:
//   1. Read current state (getTodos)
//   2. Modify the data (toggle completedAt)
//   3. Save to localStorage (saveTodos)
//   4. Update UI (renderTodos - called by event handler)
// This pattern ensures localStorage and UI stay in sync.
// All future todo operations should follow this same sequence.
function toggleTodo(id) {
    const todos = getTodos();
    const todo = findTodoById(todos, id);
    
    if (!todo) return;
    
    // Toggle: if completed, uncomplete. If uncompleted, complete.
    if (todo.completedAt) {
        todo.completedAt = null;
    } else {
        todo.completedAt = Date.now();
    }
    
    saveTodos(todos);
}

// Mark todo for deletion (starts 3-second countdown)
// Follows State Mutation Pattern
// 
// Timer Pattern: Combines persistent state marker with ephemeral browser timer
// - Persistent: pendingDelete timestamp stored in localStorage
// - Ephemeral: setTimeout callback (lost on page refresh)
// - Cleanup: initializeTodos() removes orphaned pendingDelete flags on load
// - Defensive: Timer callback checks if marker still exists before deleting
function markForDeletion(id) {
    const todos = getTodos();           // 1. Read
    const todo = findTodoById(todos, id);
    
    if (!todo) return;
    
    todo.pendingDelete = Date.now();   // 2. Modify
    saveTodos(todos);                   // 3. Save
    renderTodos();                      // 4. Render
    
    // Start countdown to permanent deletion
    setTimeout(() => {
        // Defensive: verify todo still has pendingDelete flag
        const currentTodos = getTodos();
        const currentTodo = findTodoById(currentTodos, id);
        if (currentTodo && isPendingDelete(currentTodo)) {
            permanentlyDeleteTodo(id);
        }
    }, DELETE_UNDO_TIMEOUT_MS);
}

// Cancel deletion (undo)
// Follows State Mutation Pattern
function cancelDeletion(id) {
    const todos = getTodos();           // 1. Read
    const todo = findTodoById(todos, id);
    
    if (!todo) return;
    
    delete todo.pendingDelete;         // 2. Modify (remove field)
    saveTodos(todos);                   // 3. Save
    renderTodos();                      // 4. Render
}

// Permanently delete todo from list
// Follows State Mutation Pattern
function permanentlyDeleteTodo(id) {
    const todos = getTodos();           // 1. Read
    const filtered = todos.filter(t => t.id !== id);  // 2. Modify
    saveTodos(filtered);                // 3. Save
    renderTodos();                      // 4. Render
}

// Render a single todo item as HTML
function renderTodoItem(todo) {
    // Pending delete state: show grayed out with undo button
    if (isPendingDelete(todo)) {
        return `
            <li class="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3 opacity-50" data-id="${todo.id}">
                <span class="line-through text-gray-400 flex-1">${escapeHtml(todo.text)}</span>
                <button data-action="undo" class="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600">
                    Deleted - Undo
                </button>
            </li>
        `;
    }
    
    // Normal state: show checkbox, text, completion time, delete button
    const completed = isCompleted(todo);
    const textClass = completed ? COMPLETED_CLASS : ACTIVE_CLASS;
    const completionTime = completed 
        ? `<span class="text-xs text-gray-400 ml-2">Completed ${getRelativeTime(todo.completedAt)}</span>` 
        : '';
    
    return `
        <li class="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3" data-id="${todo.id}">
            <input type="checkbox" ${completed ? 'checked' : ''} data-action="toggle" class="w-4 h-4 cursor-pointer">
            <span class="${textClass} flex-1">${escapeHtml(todo.text)}</span>
            ${completionTime}
            <button data-action="delete" class="px-2 py-1 text-red-500 text-sm hover:text-red-700">
                Delete
            </button>
        </li>
    `;
}

// Render todo list
function renderTodos() {
    const todos = getTodos();
    
    if (todos.length === 0) {
        todoListElement.innerHTML = EMPTY_STATE_MESSAGE;
        return;
    }
    
    // Use innerHTML with template strings for simplicity
    // escapeHtml() prevents XSS attacks from user input
    todoListElement.innerHTML = todos.map(renderTodoItem).join('');
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle add todo action
function handleAddTodo() {
    const text = todoInputElement.value.trim();
    
    // Block empty input
    if (!text) {
        return;
    }
    
    addTodo(text);
    renderTodos();
    todoInputElement.value = ''; // Clear input
    todoInputElement.focus(); // Maintain focus for rapid batch entry
}

// Cache DOM element references (after DOM is ready)
const todoInputElement = document.getElementById('todoInput');
const addButtonElement = document.getElementById('addButton');
const todoListElement = document.getElementById('todoList');

// Event listeners
addButtonElement.addEventListener('click', handleAddTodo);

todoInputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleAddTodo();
    }
});

// Event delegation for todo interactions (checkbox, delete, undo)
todoListElement.addEventListener('click', (event) => {
    const action = event.target.dataset.action;
    if (!action) return;
    
    const li = event.target.closest('[data-id]');
    if (!li) return; // Defensive: prevent errors if DOM structure changes
    const todoId = Number(li.dataset.id);
    
    // Action handler dispatch
    const handlers = {
        toggle: () => { toggleTodo(todoId); renderTodos(); },
        delete: () => markForDeletion(todoId),
        undo: () => cancelDeletion(todoId)
    };
    
    const handler = handlers[action];
    if (handler) {
        handler();
    }
});

// Initialize todos: clean any pending deletions from previous session
function initializeTodos() {
    const todos = getTodos();
    // Remove pendingDelete flags (refresh cancels pending deletions)
    const cleaned = todos.map(todo => {
        const { pendingDelete, ...rest } = todo;
        return rest;
    });
    saveTodos(cleaned);
    renderTodos();
}

// Load todos on page load
initializeTodos();

// Auto-refresh relative times every 60 seconds
setInterval(() => {
    renderTodos();
}, REFRESH_INTERVAL_MS);
