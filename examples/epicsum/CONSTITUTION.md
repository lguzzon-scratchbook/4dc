# Project Constitution

## About This Project

EpicSum is a CLI utility that helps controlling persons sum hours booked on tickets from CSV input. It parses ticket IDs from comments and aggregates time entries, serving anyone who needs quick time reporting from structured data.

---

## Core Principles

### 1. Simplicity Over Flexibility

**Statement:** We build the simplest solution that works. No abstractions, no frameworks, no dependencies. Pure bash that runs everywhere.

**Rationale:** This tool solves one problem well. Adding complexity would make it harder to maintain, debug, and run across different environments. Portability and simplicity are more valuable than features.

**In Practice:**
- No external dependencies—pure bash only
- No configuration files—behavior is obvious from code
- No abstractions until pain is real and repeated
- If it needs more than bash, reconsider if it belongs in this tool

### 2. Fail Fast, Fail Loud

**Statement:** Invalid input aborts immediately with clear error messages. We don't guess, we don't skip, we don't continue with corrupted data.

**Rationale:** Time tracking data must be accurate. Silent failures or assumptions about malformed data lead to wrong reports. Better to stop and fix the input than produce incorrect sums.

**In Practice:**
- Missing ticket pattern `[<ticketid>]` → abort with error
- Invalid CSV format → abort with error
- Missing required columns → abort with error
- Error messages show exactly what's wrong and where

### 3. Ship Fast and Iterate

**Statement:** We move fast and improve based on real usage. Get working features to users quickly, gather feedback, and refine. Perfect is the enemy of useful.

**Rationale:** Users need solutions now. A working 80% solution today is more valuable than a perfect solution next month. Real-world usage reveals problems faster than planning.

**In Practice:**
- Ship minimal viable features and iterate based on feedback
- Manual testing is sufficient for this scope
- "Good enough for v1" is a valid decision criteria
- Add features when users ask, not speculatively

### 4. Minimal Testing, Maximum Clarity

**Statement:** We verify manually that the tool works. Code should be clear enough that bugs are obvious on inspection.

**Rationale:** For a single-purpose bash script, automated tests add overhead without proportional value. Clear, readable code and manual verification are faster and sufficient.

**In Practice:**
- Manual testing with sample CSV files before releasing
- Code reviews focus on readability and correctness
- Keep functions small and obvious—no hidden behavior
- If it's too complex to verify manually, simplify it

---

## Technical Decisions

### Languages

- **Bash**: Universal availability on Unix systems, no installation needed, perfect for simple text processing and CSV manipulation.

### Frameworks

- **None**: Standard bash utilities only (`awk`, `grep`, `sed` if needed). No external dependencies ensures it runs anywhere bash exists.

### Deployment

- **Direct execution**: Single script file that users download and run. No build process, no installation, no package management.

---

**Last Updated:** 2025-11-24
