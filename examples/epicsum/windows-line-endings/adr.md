# ADR: Windows Line Ending Support

**Date:** 2025-11-24  
**Status:** Accepted

## Decision Summary
Use bash's built-in line reading with proper IFS handling to transparently strip carriage returns from Windows CSV files. This allows the tool to process files from any platform without external dependencies or performance overhead.

## Technical Decisions

### Line Ending Normalization Strategy
**Choice:** Use bash's `read -r` with IFS to automatically handle CRLF line endings throughout the pipeline  
**Rationale:** Bash's `read` command with `-r` flag and default IFS already strips trailing carriage returns when reading lines. This is built-in, requires no external tools, and aligns with "Simplicity Over Flexibility" principle. No need for `tr`, `sed`, or other text processing utilities.  
**Trade-offs:** Relies on bash's default behavior which may vary slightly across versions, but this is acceptable given the target is modern bash on Unix systems. More portable than using external commands.  
**Alternatives Rejected:**
- Using `tr -d '\r'` globally - rejected as adds external dependency and processing overhead
- Using `sed` to strip carriage returns - rejected as over-engineering
- Manual string manipulation in bash - rejected as more complex than built-in behavior

### Header Validation Approach
**Choice:** Strip carriage returns in header validation using `tr -d '\r'` only where exact string match is needed  
**Rationale:** Header validation uses exact string comparison, so we need explicit carriage return removal. Using `tr` here is acceptable as it's a one-time operation on a single line. The rest of the validation can rely on bash's built-in IFS handling.  
**Trade-offs:** Slight inconsistency (using `tr` for header but relying on bash for data lines), but this is pragmatic—use the right tool for each specific need.  
**Alternatives Rejected:**
- Stripping \r from expected header instead - rejected as less clear intent
- Regex match instead of exact match - rejected as changes validation logic unnecessarily

### AWK Processing
**Choice:** Let bash's line reading handle normalization; AWK processes already-clean lines  
**Rationale:** Since the validation loop uses bash's `read` to iterate through lines, AWK receives data without carriage returns. AWK doesn't need to handle CRLF because bash already normalized it. This keeps AWK code simple and focused on aggregation logic.  
**Trade-offs:** Creates dependency on bash preprocessing, but this is acceptable since we're already in a bash script. Simpler than adding CRLF handling to AWK.  
**Alternatives Rejected:**
- Adding `gsub(/\r/, "", $0)` in AWK - rejected as redundant if bash handles it
- Processing file directly with AWK and handling CRLF there - rejected as AWK already gets clean input

## Architecture Overview

**Components:**
- Header Validation: Uses `head -n 1 "$file" | tr -d '\r'` for exact match (line 24)
- Line-by-Line Validation: Uses `while IFS= read -r line` with bash's built-in CRLF handling (line 32)
- AWK Aggregation: Receives normalized lines from bash, no CRLF handling needed (line 64)

**Data Flow:**
1. Header: `head` extracts → `tr -d '\r'` strips CRLF → exact match validation
2. Data rows: `while read -r` strips CRLF automatically → field validation → pattern validation
3. AWK: Receives file directly, but bash validation already confirmed clean format

**Integration Points:**
- No external integrations—pure bash with standard utilities (tr, awk)

**State Management:**
- No state—stateless processing with transparent line ending normalization

## Implementation Constraints
- Must maintain backward compatibility with Unix (LF-only) files
- Header validation requires explicit `tr -d '\r'` due to exact string match
- Data validation relies on bash's `read -r` stripping trailing \r automatically
- AWK doesn't need CRLF handling—receives normalized input from file
- No file modification—processing is read-only and non-destructive

## Open Questions
- Should we warn users about mixed line endings? Defer until users report issues.
- Should we support old Mac line endings (CR only)? Defer—rarely used in modern systems.
