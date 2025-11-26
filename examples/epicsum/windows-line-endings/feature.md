# Windows Line Ending Support

## Job Story
When I export CSV files from Windows or Excel  
I want epicsum to process them without line ending errors  
So I can use the tool regardless of which OS exported the CSV

**Assumption Being Tested:** Normalizing line endings during processing (stripping carriage returns) allows the tool to work with CSV files from any platform without requiring users to manually convert files.

## Acceptance Criteria

- **Given** a CSV with Unix line endings (LF only)  
  **When** validation and aggregation run  
  **Then** the tool processes successfully with correct output

- **Given** a CSV with Windows line endings (CRLF)  
  **When** validation and aggregation run  
  **Then** the tool processes successfully with correct output

- **Given** a CSV with mixed line endings (some LF, some CRLF)  
  **When** validation and aggregation run  
  **Then** the tool processes successfully with correct output

- **Given** a Windows CSV with valid headers and data  
  **When** header validation runs  
  **Then** header is recognized as valid (carriage returns stripped)

- **Given** a Windows CSV with ticket patterns  
  **When** ticket extraction runs  
  **Then** ticket IDs are extracted correctly (no trailing \r in patterns)

## Success Signal
CSV files exported from Windows/Excel (with CRLF line endings) process successfully and produce the same output as Unix files (LF only). Users don't need to convert files manually.

## Out of Scope
- Converting files permanently to Unix format (non-destructive processing only)
- Auto-detecting line ending type and reporting it to user
- Supporting old Mac line endings (CR only) - rare in modern systems
- Handling other character encoding issues (UTF-8 BOM, etc.)
