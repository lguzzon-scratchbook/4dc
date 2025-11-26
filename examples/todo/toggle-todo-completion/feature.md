# Toggle Todo Completion

## Job Story
**When** I've finished a task on my todo list  
**I want to** check it off to mark it complete (and uncheck it if I made a mistake)  
**So I can** see what I've accomplished while keeping completed items visible for reference

**Assumption Being Tested:** Users want to track completion status without deleting todos, and will use visual distinction (strikethrough, lighter color) to scan active vs. completed items.

## Acceptance Criteria

- **Given** I have a todo item in my list  
  **When** I click the checkbox to the left of the todo text  
  **Then** the todo text shows with strikethrough and lighter gray color, and displays "Completed X ago" (e.g., "Completed 2 minutes ago")

- **Given** I have a checked (completed) todo  
  **When** I click the checkbox again  
  **Then** the todo returns to normal appearance (no strikethrough, normal dark text, no completion time), and the checked state is reset

- **Given** I have checked off a todo  
  **When** I refresh the page  
  **Then** the todo remains checked with strikethrough, lighter color, and completion time persists

- **Given** I have both checked and unchecked todos  
  **When** I view my list  
  **Then** completed items stay in their original position (not moved to bottom), allowing me to see completion in context

- **Given** the page has been open for several minutes  
  **When** I view completed todos  
  **Then** the relative completion time updates (e.g., "Completed 5 minutes ago" becomes "Completed 6 minutes ago")

- **Given** I completed a todo yesterday  
  **When** I view my list  
  **Then** it shows appropriate relative time (e.g., "Completed 1 day ago")

## Success Signal
- Users can toggle completion status on/off reliably
- Visual distinction between active and completed todos is immediately clear
- Completion state and timestamp persist across page refreshes
- Relative time display helps users understand when tasks were completed

## Out of Scope
- Deleting completed todos (keep visible indefinitely)
- Filtering/hiding completed items (all todos visible always)
- Editing completion timestamp (set automatically on check)
- Moving completed items to separate section or bottom of list
- Absolute date display (relative time only: "2 hours ago", "3 days ago")
