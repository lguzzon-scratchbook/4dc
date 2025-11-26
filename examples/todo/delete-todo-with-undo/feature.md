# Delete Todo with Undo

## Job Story
**When** I realize a todo item is no longer relevant or was added by mistake  
**I want to** delete it with a brief window to undo  
**So I can** keep my list clean while avoiding accidental permanent deletions

**Assumption Being Tested:** Users will feel more confident using delete if they have a 3-second safety window to reverse their decision, reducing anxiety about accidental deletions.

## Acceptance Criteria

- **Given** I have a todo item in my list  
  **When** I click the delete button on the todo  
  **Then** the todo item becomes grayed out/faded and is replaced inline with "Deleted - Undo" button

- **Given** a todo is in the "deleting" state (grayed out with undo button)  
  **When** I click the "Undo" button within 3 seconds  
  **Then** the todo returns to its normal appearance and remains in the list

- **Given** a todo is in the "deleting" state  
  **When** 3 seconds pass without clicking "Undo"  
  **Then** the todo is permanently removed from the list and localStorage

- **Given** I have deleted a todo and it was permanently removed  
  **When** I refresh the page  
  **Then** the deleted todo does not reappear (deletion persisted)

- **Given** I have multiple todos in the list  
  **When** I delete one todo  
  **Then** only that specific todo enters the "deleting" state, others remain unaffected

- **Given** a todo is in the "deleting" state (countdown active)  
  **When** I delete a different todo  
  **Then** the first todo's countdown continues independently, I can have multiple items pending deletion

- **Given** I click delete on a todo  
  **When** the item is grayed out and showing "Deleted - Undo"  
  **Then** the checkbox and original delete button are hidden (only undo button visible)

## Success Signal
- Users can successfully delete unwanted todos
- Users can recover from accidental deletions within the 3-second window
- Visual feedback clearly indicates deletion state vs. normal state
- Multiple todos can be queued for deletion simultaneously

## Out of Scope
- Configurable undo timeout (fixed at 3 seconds)
- "Delete all completed" bulk action
- Confirmation dialog before delete (undo mechanism replaces this)
- Trash/recycle bin for recovering old deletions (only 3-second window)
- Keyboard shortcuts for delete/undo
