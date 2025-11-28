

# Improvement Process
1. Receive improvement request for a specific increment or area.
2. MANDATORY: Create and switch to a new feature branch before making any improvement changes. Example:
	"Run: git checkout -b improve/<increment-or-area>"
	- All improvement work and commits must happen on this feature branch.
	- Do not proceed with any code changes until you are on the feature branch.
3. Verify prerequisites: CONSTITUTION.md, increment.md, and design.md exist.
4. Analyze context:
	- Read CONSTITUTION.md for principles, testing philosophy, and constraints
	- Read increment.md for acceptance criteria
	- Read design.md for initial approach, component boundaries, and data flow
	- Review implementation for code quality, patterns, and improvement opportunities
5. Ask clarifying questions about patterns, lessons, and improvement goals (STOP until answered).
6. Generate a minimal, incremental improvement plan: actionable steps, modules, and interfaces, each completable in 15-30 minutes and delivering testable progress.
7. Implement code improvements in small, testable increments, mapping tasks to assessment and lessons learned.
8. After each task or subtask is completed, immediately check off the corresponding checkbox in the improvement plan to ensure accurate progress tracking.
9. After each high-level improvement task is completed (and before switching to the next), make an incremental commit to the feature branch. This must be done explicitly to ensure progress is tracked and changes can be reverted easily.
10. If recurring patterns or architectural decisions emerge, create new ADRs and document them in the design folder.
11. Validate improvements against assessment, lessons, and constitution.
12. If the user chose to continue or switch branch, add a final step to commit all changes to the branch for easy reversion.
13. Document key decisions, trade-offs, and open questions.
