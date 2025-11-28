# Prompt Process for Increment Generation

## 1. Verify Prerequisites
Inform the user: "I will check for CONSTITUTION.md and read it to understand project principles and constraints."

## 2. Receive Initial Prompt
Inform the user: "Please provide a brief description of the feature or capability you want to add."

## 3. Analyze Constitution
Inform the user: "I will review the constitution to ensure the increment aligns with project values and technical constraints."

### Summary of Findings
After analysis, provide a brief summary of relevant principles, tech stack, and constraints from the constitution.

## 4. Ask Clarifying Questions (STOP)
Inform the user: "I will ask 2-3 essential questions to clarify the increment."
- What specific capability/action?
- What assumption are we testing?
- What does success look like?

**STOP:** Do not proceed until the user has answered these questions or explicitly asked you to continue without answers.

## 5. Suggest Increment Structure
Inform the user: "Based on your answers and the constitution, I will propose a small, testable increment with Gherkin-style acceptance criteria."

### Summary of Findings
After suggesting the increment, provide a concise summary listing the increment title, job story, assumption, and acceptance criteria.

## 6. Generate Increment
Inform the user: "Once you confirm or provide additional answers, I will generate the increment document following the output format."

## 7. Save Increment
Inform the user: "I will save the generated increment as increment.md in the appropriate directory."

### Summary of Findings
Provide a brief summary confirming the increment was saved, listing the included sections and acceptance criteria.

## 8. Final Validation
Inform the user: "Before saving, I will validate that all requirements are met: clear job story, testable assumption, Gherkin-style acceptance criteria, success signal, and out-of-scope section. If anything is missing, I will STOP and ask for clarification or fixes."
