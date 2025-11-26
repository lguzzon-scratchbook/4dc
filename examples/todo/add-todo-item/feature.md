# Add Todo Item

## Job Story
**When** I think of something I need to do  
**I want to** quickly add it to my todo list  
**So I can** offload it from my mind and focus on current work

**Assumption Being Tested:** Users will capture more tasks if adding a todo takes less than 5 seconds and supports rapid batch entry.

## Acceptance Criteria

- **Given** I am on the todo app page  
  **When** I type "Buy groceries" in the input field and press Enter  
  **Then** "Buy groceries" appears at the top of the todo list, the input field clears, and the input stays focused

- **Given** I am on the todo app page  
  **When** I type "Buy groceries" in the input field and click the Add button  
  **Then** "Buy groceries" appears at the top of the todo list, the input field clears, and the input stays focused

- **Given** I have added "Buy groceries" to my list  
  **When** I refresh the page  
  **Then** "Buy groceries" still appears in my todo list (persisted in localStorage)

- **Given** I have "Buy groceries" already in my list  
  **When** I add "Buy groceries" again  
  **Then** both entries appear in the list (duplicates are allowed)

- **Given** the input field is empty  
  **When** I press Enter or click Add  
  **Then** nothing happens (no empty todos are created)

- **Given** I have just added a todo  
  **When** I start typing immediately  
  **Then** I can add another todo without clicking back into the input field (focus maintained)

## Success Signal
- User can add a todo and see it appear immediately
- Todo persists after page refresh
- Input is cleared and ready for next entry
- No errors in browser console

## Out of Scope
- Editing existing todos
- Deleting todos
- Marking todos as complete
- Sorting or filtering todos
- Todo categories or priorities
- Multi-line todos (single line text only)
