# ADR: Validate Input Argument

**Date:** 2025-11-24  
**Status:** Accepted

## Decision Summary
Implement argument validation at script entry point using bash conditionals and file test operators. Exit immediately with clear error messages if no argument provided or file doesn't exist.

## Technical Decisions

### Argument Check Approach
**Choice:** Check `$1` argument count with bash conditional at script start  
**Rationale:** Simplest bash pattern - test if first argument exists before any processing. Aligns with "Fail Fast, Fail Loud" principle.  
**Trade-offs:** No argument parsing library (more robust) but unnecessary complexity for single-argument script. Accept basic validation for simplicity.  
**Alternatives Rejected:** Using `getopts` for argument parsing - rejected as over-engineering for one required positional argument.

### File Existence Check
**Choice:** Use bash `-f` test operator to verify file exists and is readable  
**Rationale:** Standard bash file test, no external dependencies. Catches missing files before processing begins.  
**Trade-offs:** Doesn't check if file is actually CSV format (that's separate concern per use case). Accept this separation for cleaner error messages.  
**Alternatives Rejected:** Combined validation (arg + file + format) - rejected to keep error messages specific and focused.

### Error Message Strategy
**Choice:** Print error to stderr using `echo "message" >&2` and exit with code 1  
**Rationale:** Standard Unix convention - errors to stderr, non-zero exit for failures. Scriptable and composable.  
**Trade-offs:** Simple error messages (no color, no formatting) but aligns with portability principle. Works everywhere.  
**Alternatives Rejected:** Structured error output (JSON) - rejected as unnecessary; usage help text - rejected per "keep it minimal" in use case.

## Architecture Overview

**Components:**
- Argument validator: Checks if `$1` exists and is non-empty
- File existence validator: Tests if provided path points to existing file
- Error reporter: Prints clear message to stderr and exits

**Data Flow:**
Script invoked → Check `$1` exists → Check file at `$1` exists → Proceed to main logic (or exit with error at any step)

**Integration Points:**
- None (pure bash, no external dependencies)

**State Management:**
- Stateless validation - no persistence needed

## Implementation Constraints
- Must use bash built-in operators only (`[ ]`, `-f`, `-z`)
- Error messages must go to stderr (`>&2`)
- Exit code must be 1 for any validation failure
- Exit code must be 0 for successful validation (implicit - continue execution)

## Open Questions
- None - straightforward bash validation pattern
