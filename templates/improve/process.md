
# Improvement Process (Codebase-Wide)

## 1. Receive Initial Improvement Request
Inform the user: "You have requested a refactoring and codebase improvement."

## 2. Analyze Project Context
Inform the user: "I will now review your project files (especially README.md, CONSTITUTION.md, and recent increments/designs) as well as ADRs to understand the technical landscape and identify refactoring opportunities."

### Summary of Findings
After context analysis, provide a brief summary to the user outlining the project's purpose and tech stack.

## 3. Analyse Codebase Through Lenses
After analyzing the project context, proactively suggest and implement specific refactorings by examining the codebase through the context-based lenses described in lenses.md:
   - Naming & Clarity
   - Modularity & Separation
   - Architecture & Patterns
   - Testing & Reliability
   - Duplication & Simplicity
   - Documentation & Communication

- Identify and list actionable refactorings relevant to the codebase, grouped by these lens contexts.
- For each suggestion, reference the relevant lens group and provide a clear rationale inspired by industry best practices.
Use these context-based lenses as the organizing principle for improvement suggestions, guiding the analysis and recommendations.
Do not ask the user what to look for; instead, use your analysis and the lenses to recommend actionable refactorings.

Proceed to implement the selected refactorings first, grouped and labeled by lens context. Only after refactorings are completed and patterns or architectural decisions emerge, suggest and document ADRs as needed.


## 4. Suggest Lenses-Based Refactoring Plan & User Selection

Inform the user: "Based on the findings and suggested improvements, I will propose a refactoring plan, mapping each suggestion to a lens context, with clear rationale. All suggestions are based on factual problems observed in the codebase."

When asking the user which improvement actions to tackle or skip, clearly state that each suggestion is a factual problem, and show examples for clarity. Use the interaction style described in the interaction section (numbered questions, lettered options, X to skip, _ for custom text answers). Present each finding as a numbered question, offer lettered options, and mention briefly the relevance of each finding using your analysis and examples.

### Summary of Findings
After user selection, provide a concise summary listing the chosen refactorings, their mapped lens contexts, and the rationale for each.

## 5. Implement Improvements (Detailed Steps)
All improvement work must be performed on a dedicated feature branch (e.g., `improve/codebase`).

**Implementation Steps:**
1. Explicitly create and switch to a new feature branch before making any improvement changes. Example:
   - Run: `git checkout -b improve/codebase`
   - All improvement work and commits must happen on this feature branch.
   - Do not proceed with any code changes until you are on the feature branch.
2. For each selected refactoring, break it down into actionable tasks and subtasks, each completable in 15-30 minutes and delivering testable progress. Group and label each task by lens context.
3. Implement code improvements in small, testable increments, mapping tasks to the relevant lens context and rationale.
4. After each task or subtask is completed, immediately check off the corresponding checkbox in the improvement plan to ensure accurate progress tracking.
5. After each high-level improvement task is completed (and before switching to the next), make an incremental commit to the feature branch. This must be done explicitly to ensure progress is tracked and changes can be reverted easily.
6. After refactorings are completed, review the codebase for recurring patterns or architectural decisions. If any emerge, create new ADRs and document them in the design folder, but only for big impactful changes that align or unify the codebase.
7. Validate improvements against assessment, lessons, and constitution.
8. If the user chose to continue or switch branch, add a final step to commit all changes to the branch for easy reversion.
9. Document key decisions, trade-offs, and open questions.


## 5. Ask Clarifying Questions
Inform the user: "If any critical information is missing or the suggested refactorings need refinement, I will ask targeted follow-up questions."

## 6. Generate Improvement Plan
Inform the user: "Once you confirm or provide additional answers, I will generate the improvement document strictly following the shared implementation output format. The plan will always include a section specifying which lenses were applied."

For all actionable improvement tasks and subtasks, use the output format described in the output section of ../implement/output.md:
   - Progress tracking using checkboxes for each task and subtask
   - Clear labeling and mapping to the relevant lens context
   - Code snippets for each change or refactoring
   - Validation steps to confirm correctness
   - Documentation of decisions and rationale
This format ensures clarity, traceability, and actionable progress for each improvement.

For any architectural decisions (ADRs) required during the improve phase, use the ADR format described in the ard.md:
   - Context: Briefly describe the situation or problem that led to the decision
   - Decision: State the architectural choice made
   - Rationale: Explain why this decision was made, including trade-offs
   - Consequences: List the expected outcomes, both positive and negative
   - Alternatives: Mention other options considered and why they were not chosen
Ensure ADRs are clearly separated from refactoring tasks and only created for impactful architectural changes that unify or significantly alter the codebase.

## 7. Save Improvement Plan
Inform the user: "I will save the generated improvement plan as improve.md in the project root."

**Action:** Write the improvement plan as `improve.md` in the project root directory. Ensure the file is created and contains only the assessment and the improvement plan sections, minimizing noise.

### Summary of Findings
Provide a brief summary confirming the plan was saved, listing the included sections and lenses covered.

## 8. Final Validation
Inform the user: "Before saving, I will validate that all requirements are met: actionable refactorings, at least 3 lenses covered, each refactoring labeled, lens coverage summary, and technical decisions section. If anything is missing, I will STOP and ask for clarification or fixes."
