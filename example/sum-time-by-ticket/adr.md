# ADR: Sum Time by Ticket

**Date:** 2025-11-24  
**Status:** Draft

## Decision Summary
Aggregate time entries by ticket ID using bash associative arrays and minute-based arithmetic. Extract ticket IDs via grep, accumulate totals in memory, and format output as a readable table. Prioritizes simplicity and clarity over performance optimization.

## Technical Decisions

### Data Structure for Aggregation
**Choice:** Bash associative arrays (requires bash 4+) with ticket ID as key, accumulated minutes as value  
**Rationale:** Associative arrays provide O(1) lookup for accumulating totals per ticket. Native bash feature eliminates need for temporary files or external tools. Clean in-memory processing aligns with constitutional simplicity principle.  
**Trade-offs:** Requires bash 4+ (widely available on modern systems) but avoids file I/O overhead and complexity. All data held in memory (acceptable for typical CSV sizes). Accept bash version requirement for cleaner code.  
**Alternatives Rejected:** Temporary files per ticket (excessive I/O, harder to clean up), awk-only solution (less readable for time arithmetic and formatting)

### Ticket ID Extraction
**Choice:** Grep with extended regex and capture group to extract `[E#]` pattern from Description field  
**Rationale:** Grep excels at pattern matching. Use `grep -oE '\[E[0-9]+\]'` to extract just the ticket ID including brackets. Simple, readable, and leverages bash pipeline strength. Pattern already validated during CSV format check.  
**Trade-offs:** Spawns grep subprocess per row but keeps code clear and maintainable. Accept minor performance cost for readability (constitutional "clarity over optimization").  
**Alternatives Rejected:** Sed (more complex for extraction), pure bash regex (less clear), awk substr (requires field parsing logic duplication)

### Time Arithmetic Strategy
**Choice:** Convert H:MM to total minutes, accumulate, then convert back to H:MM for display  
**Rationale:** Minute-based arithmetic avoids carry-over complexity (60 minutes = 1 hour). Simple bash arithmetic: split on `:`, calculate `hours * 60 + minutes`, sum totals, then divide/modulo to get H:MM. Clear, testable logic.  
**Trade-offs:** Two conversions (to/from minutes) but eliminates edge cases like minute overflow. Accept conversion overhead for bug-free arithmetic and code clarity.  
**Alternatives Rejected:** Direct H:MM addition (complex overflow handling), decimal hours (loses H:MM format requirement), awk floating point (precision issues, less readable)

### Output Formatting
**Choice:** Printf-based table with fixed column widths for alignment  
**Rationale:** Bash `printf` provides clean columnar output. Format string `"%-12s | %-12s | %-8s\n"` ensures consistent alignment. Simple loop through associative array keys to print each ticket's summary.  
**Trade-offs:** Fixed column widths may truncate very long ticket IDs but keeps implementation simple. Accept this for v1 (constitutional "good enough" principle).  
**Alternatives Rejected:** Column utility (external dependency), dynamic width calculation (over-engineering), CSV output (less human-readable)

## Architecture Overview

**Components:**
- `sum_time_by_ticket()`: Main aggregation function that processes validated CSV
- Ticket ID extraction: Grep pipeline to isolate `[E#]` pattern
- Time conversion: Helper logic to convert H:MM ↔ minutes
- Associative arrays: `ticket_minutes` (total mins), `ticket_counts` (entry count)

**Data Flow:**
CSV validation passes → Skip header → For each row: extract ticket ID (grep) → extract time (awk field 6) → convert time to minutes → accumulate in `ticket_minutes[ID]` → increment `ticket_counts[ID]` → After all rows: convert minutes back to H:MM → format table → print to stdout

**Integration Points:**
- Called after `validate_csv_format` completes successfully
- Reads same CSV file passed as $1 argument
- Outputs directly to stdout (no file writes)

**State Management:**
- Associative arrays hold aggregated state in memory during processing
- No persistent state—pure transformation of CSV to summary output
- Arrays cleared after output (function scope)

## Implementation Constraints
- Requires bash 4+ for associative array support
- Input CSV must already be validated (depends on `validate_csv_format` function)
- Time format must be H:MM (single digit or double digit hours, colon, two digit minutes)
- Ticket IDs must match `[E#]` pattern (validated in CSV check)
- All processing in memory—CSV size limited by available RAM (acceptable for typical use cases)
- Output column widths fixed (ticket ID ≤12 chars, time ≤12 chars for display)

## Open Questions
- Should output be sorted by ticket ID or total time? (Defer: natural order from associative array for v1)
- Handle hours >99 in output (e.g., 125:30)? (Defer: unlikely in typical usage, accept potential display width issue)
- Grand total row at bottom? (Defer: not in acceptance criteria, add if users request)
