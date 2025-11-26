# Tasks: Monthly Grouping with Ticket Breakdown

## Relevant Files

- `epicsum.sh` - Main bash script with aggregation logic

## Progress Tracking

**As you complete each task, check it off by changing `- [ ]` to `- [x]`.**

## Implementation Tasks

- [x] **Setup**
  - [x] Create feature branch: `git checkout -b feature/monthly-grouping`

- [x] **Add DATE_FORMAT variable**
  - [x] Add `DATE_FORMAT` variable near top of script (after `TICKET_PATTERN`, around line 5)
  - [x] Initialize as empty (will be auto-detected from first data row)
  - [x] Verify: Variable is accessible throughout script

- [x] **Implement date format auto-detection**
  - [x] In AWK: detect format by checking if date contains "." (DD.MM.YY) or "-" (YYYY-MM-DD)
  - [x] Parse each date inline during processing
  - [x] Verify: Format detection works for both input.csv and jwt.csv

- [x] **Implement date parsing logic**
  - [x] For DD.MM.YY format: extract day, month, year; convert YY to 20YY
  - [x] For YYYY-MM-DD format: extract year and month directly
  - [x] Create YYYYMM numeric key (e.g., 202411)
  - [x] Create YYYY/MM display string (e.g., "2024/11")
  - [x] Verify: Both date formats parse correctly to YYYY/MM

- [x] **Update AWK aggregation structure**
  - [x] Use concatenated keys for month+ticket (SUBSEP-based)
  - [x] Add `month_totals[month]` for monthly time sums
  - [x] Add `month_counts[month]` for monthly entry counts
  - [x] Add `month_display[month]` to store YYYY/MM display format
  - [x] Add `month_tickets_seen[month]` to track tickets per month
  - [x] Verify: Data accumulates correctly

- [x] **Implement month sorting logic**
  - [x] In AWK END block: collect all month keys
  - [x] Sort months in descending numeric order using bubble sort
  - [x] Verify: Months appear newest-first (2024/11 before 2024/06)

- [x] **Update output formatting**
  - [x] For each month (in sorted order):
    - [x] Print month header: "=== YYYY/MM - Total: H:MM (N entries) ==="
    - [x] Print ticket table header
    - [x] Print ticket breakdown for that month
    - [x] Add blank line between months
  - [x] Verify: Output shows month headers with totals followed by ticket details

- [x] **Test YYYY-MM-DD format**
  - [x] Run script with input.csv (YYYY-MM-DD format)
  - [x] Verify: Month header shows "2024/06 - Total: 14:45 (4 entries)"
  - [x] Verify: Tickets grouped correctly under month
  - [x] Verify: Monthly total equals sum of ticket times

- [x] **Test DD.MM.YY format**
  - [x] Run script with jwt.csv (DD.MM.YY format)
  - [x] Verify: Month headers show "2025/11", "2025/10", "2025/09"
  - [x] Verify: YY correctly converted to 20YY (25 → 2025)
  - [x] Verify: Tickets grouped correctly under each month
  - [x] Verify: Months in descending order (newest first)

- [x] **Test multi-month data**
  - [x] Run script with jwt.csv (has multiple months of data)
  - [x] Verify: Multiple month headers appear
  - [x] Verify: Months sorted descending (2025/11, 2025/10, 2025/09)
  - [x] Verify: Each month's total equals sum of its tickets

- [x] **Integration & Verification**
  - [x] Test complete flow with both CSV formats
  - [x] Verify all 5 acceptance criteria from feature.md pass
  - [x] Manual test: Output is readable and grouping makes sense

- [x] **Verify ADR Compliance**
  - [x] Confirm `DATE_FORMAT` variable defined at script start
  - [x] Confirm date parsing uses format detection logic
  - [x] Confirm concatenated keys for monthly grouping (SUBSEP-based)
  - [x] Confirm numeric YYYYMM keys for descending sort
  - [x] Confirm no external sort utilities used (bubble sort in AWK)

- [x] **Deploy**
  - [x] Commit changes: "Add monthly grouping with ticket breakdown"
  - [x] Merge to main (direct commit per constitution)
