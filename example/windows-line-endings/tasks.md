# Tasks: Windows Line Ending Support

## Relevant Files

- `epicsum.sh` - Main bash script with validation and aggregation logic

## Progress Tracking

**As you complete each task, check it off by changing `- [ ]` to `- [x]`.**

## Implementation Tasks

- [x] **Setup**
  - [x] Create feature branch: `git checkout -b feature/windows-line-endings`

- [x] **Update header validation**
  - [x] Modify header validation to use `tr -d '\r'` when reading header (line 24)
  - [x] Verify: Header validation is already updated (check if present from earlier fix)

- [x] **Verify bash read handles CRLF**
  - [x] Confirm `while IFS= read -r line` in validation loop strips \r automatically
  - [x] No code changes needed if bash's built-in behavior works
  - [x] Test: Create Windows CRLF test file and verify `read -r` strips carriage returns
  - [x] **Result:** Added `line="${line%$'\r'}"` to manually strip carriage returns (bash doesn't do this automatically)

- [x] **Test Unix line endings (backward compatibility)**
  - [x] Run script with input.csv (Unix LF line endings)
  - [x] Verify: Processes successfully with correct output
  - [x] Verify: No regressions from previous functionality

- [x] **Test Windows line endings**
  - [x] Run script with jwt.csv (Windows CRLF line endings)
  - [x] Verify: Header validation passes
  - [x] Verify: Field count validation passes
  - [x] Verify: Ticket pattern validation passes
  - [x] Verify: Aggregation produces correct output

- [x] **Test mixed line endings**
  - [x] Create test CSV with some LF lines and some CRLF lines
  - [x] Verify: Script processes successfully
  - [x] Verify: Output is correct regardless of mixed line endings

- [x] **Integration & Verification**
  - [x] Test complete flow with both Unix and Windows CSV files
  - [x] Verify all 5 acceptance criteria from feature.md pass
  - [x] Compare outputs: Unix file vs Windows file should produce identical results

- [x] **Verify ADR Compliance**
  - [x] Confirm header uses `tr -d '\r'` (explicit stripping for exact match)
  - [x] Confirm validation loop uses `line="${line%$'\r'}"` (bash parameter expansion)
  - [x] Confirm AWK doesn't add CRLF handling (receives clean input)
  - [x] Remove any unnecessary CRLF processing code

- [x] **Deploy**
  - [x] Commit changes: "Add Windows line ending support"
  - [x] Merge to main (direct commit per constitution)
