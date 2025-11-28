# Increment Output Format

The generated increment should include the following sections:

## 1. Title
Short, descriptive title for the increment.

## 2. Job Story
**When** [situation]  
**I want to** [action]  
**So I can** [outcome]

## 3. Assumption Being Tested
Specific hypothesis for this increment.

## 4. Acceptance Criteria
Gherkin-style (Given/When/Then) acceptance criteria for observable outcomes.

## 5. Success Signal
How we know this increment works—metric or observation.

## 6. Out of Scope
What this increment does NOT include.

---
**Example Structure:**
```markdown
# [Increment Title]

## Job Story
**When** [situation]  
**I want to** [action]  
**So I can** [outcome]

**Assumption Being Tested:** [Specific hypothesis for this increment]

## Acceptance Criteria
- **Given** [precondition]  
  **When** [action]  
  **Then** [observable outcome]
- **Given** [precondition]  
  **When** [action]  
  **Then** [observable outcome]
- **Given** [error condition]  
  **When** [action]  
  **Then** [error handling outcome]

## Success Signal
[How we know this increment works - metric or observation]

## Out of Scope
- [What this increment does NOT include]
```
