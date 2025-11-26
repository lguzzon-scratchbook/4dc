# ADR: Monthly Grouping with Ticket Breakdown

**Date:** 2025-11-24  
**Status:** Accepted

## Decision Summary
Enhance AWK aggregation to group tickets by month (YYYY/MM format) with monthly summary headers showing total time and entry count. Support both DD.MM.YY and YYYY-MM-DD date formats, sort months in descending chronological order using numeric month keys.

## Technical Decisions

### Date Format Configuration
**Choice:** Define date format pattern as a bash variable `DATE_FORMAT` at script start, similar to `TICKET_PATTERN`  
**Rationale:** Consistent with existing pattern of defining reusable patterns as variables (like `TICKET_PATTERN`). Makes date format explicit and changeable in one location. Follows "Simplicity Over Flexibility" principle—no configuration file needed, just a variable.  
**Trade-offs:** Still supports only one format per execution (not auto-detection of mixed formats). Accept this for simplicity—users typically have consistent date formats in their CSVs.  
**Alternatives Rejected:**
- Auto-detection of multiple formats per file - rejected as adds complexity
- Configuration file for date format - rejected as violates "no configuration files" principle
- Hardcoded format detection - rejected as less maintainable than variable approach

### Date Format Parsing Strategy
**Choice:** AWK regex pattern matching to detect format and extract year/month accordingly based on `DATE_FORMAT` variable  
**Rationale:** Single-pass detection and extraction keeps code simple. Use regex to identify format (contains "/" vs contains "."), then extract year/month using appropriate field separators. Pass format hint to AWK via `-v` parameter. Aligns with "Simplicity Over Flexibility" principle—no external date utilities needed.  
**Trade-offs:** Assumes well-formed dates; malformed dates may parse incorrectly. Accept this for v1 simplicity—CSV validation already ensures basic format compliance.  
**Alternatives Rejected:**
- Two-pass processing (detect then parse) - rejected as unnecessary complexity
- External date parsing tools - rejected as adds dependencies violating constitution
- Strict format validation - rejected as over-engineering; basic regex sufficient

### Monthly Aggregation Structure
**Choice:** Single-pass collection using nested AWK arrays: `month_ticket_minutes[month][ticket]` and `month_totals[month]`  
**Rationale:** AWK's associative arrays naturally support multi-level grouping. Single pass through data collects both per-ticket-per-month and monthly totals simultaneously. Efficient and straightforward to implement in pure AWK.  
**Trade-offs:** More complex array structure than flat ticket aggregation, but necessary for monthly grouping. Accept this complexity as it enables the required feature without external tools.  
**Alternatives Rejected:**
- Multiple AWK passes - rejected as less efficient
- Temporary files for intermediate data - rejected as unnecessary I/O overhead
- External grouping tools (jq, etc.) - rejected as violates "no dependencies" principle

### Descending Chronological Sort
**Choice:** Store months as numeric YYYYMM keys (e.g., 202411, 202406), iterate in descending numeric order in AWK END block  
**Rationale:** Numeric month keys enable simple descending sort without external `sort` command. AWK can iterate keys, sort them numerically in memory, then output in reverse order. Pure bash solution, no pipes needed.  
**Trade-offs:** Requires converting month string to numeric key and back to display format. Accept this for independence from external sort utilities.  
**Alternatives Rejected:**
- Piping to `sort -r` - rejected to minimize external dependencies, though acceptable per constitution
- String-based month comparison - rejected as more complex than numeric sorting
- No sorting (CSV order) - rejected as doesn't meet acceptance criteria for chronological ordering

### Date Format Detection Logic
**Choice:** AWK pattern matching on Date field: if contains "." treat as DD.MM.YY, else treat as YYYY-MM-DD  
**Rationale:** Simple conditional check distinguishes formats reliably for valid dates. Extract year/month differently based on format. Minimal code, handles both acceptance criteria formats.  
**Trade-offs:** Doesn't validate date correctness, just format. Assumes CSV validation ensures dates are well-formed. Accept this trade-off for simplicity.  
**Alternatives Rejected:**
- Complex regex for full date validation - rejected as over-engineering
- Third format support (ISO 8601, etc.) - rejected as out of scope per feature.md
- Strict format enforcement - rejected; let users provide either format flexibly

## Architecture Overview

**Components:**
- Date Format Variable: `DATE_FORMAT` defined at script start (auto-detected or defaulted)
- Date Parser: Detects format and extracts YYYY/MM from Date field (field 1) using `DATE_FORMAT`
- Monthly Aggregator: Groups tickets by month, accumulates time per ticket per month
- Month Sorter: Sorts months in descending order using numeric YYYYMM keys
- Output Formatter: Prints month headers with totals, then ticket breakdowns per month

**Data Flow:**
1. AWK reads each CSV line (skip header)
2. Extract date from field 1, parse to YYYY/MM based on format
3. Convert YYYY/MM to numeric YYYYMM key for sorting
4. Extract ticket ID and time, accumulate in `month_ticket_minutes[YYYYMM][ticket]`
5. Accumulate monthly totals in `month_totals[YYYYMM]` and `month_counts[YYYYMM]`
6. In END block: sort months descending, print month header + ticket breakdown for each

**Integration Points:**
- No external integrations—pure bash and AWK

**State Management:**
- AWK associative arrays: `month_ticket_minutes[month][ticket]`, `month_totals[month]`, `month_counts[month]`, `month_display[month]`
- No persistent state—stateless processing

## Implementation Constraints
- `DATE_FORMAT` variable defined near top of script (after `TICKET_PATTERN`)
- Must parse both DD.MM.YY (e.g., "20.11.25") and YYYY-MM-DD (e.g., "2024-06-01") formats
- Date format auto-detected from first data row, stored in `DATE_FORMAT` variable
- Must convert DD.MM.YY to 4-digit year (25 → 2025, assuming 20xx century)
- Months sorted as numeric YYYYMM descending (202411 before 202406)
- Monthly totals must equal sum of all ticket times in that month
- Output format: "YYYY/MM - Total: H:MM (N entries)" followed by ticket table
- No external sort or date utilities—pure AWK/bash solution

## Open Questions
- Should we handle YY → YYYY conversion for years beyond 2099? Defer until issue arises.
- Should we add empty month detection (months with zero entries)? Not applicable—only show months with data.
