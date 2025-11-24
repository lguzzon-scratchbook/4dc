# Validate Input Argument

## Job Story
When I run the EpicSum tool without specifying which CSV file to process  
I want to see a clear error message telling me to provide an input file  
So I can quickly understand what's wrong and run the command correctly

**Assumption Being Tested:** Clear error messages help users correct their mistakes immediately without needing documentation.

## Acceptance Criteria

- **Given** I run the script without any arguments  
  **When** the script executes  
  **Then** it exits with a non-zero status code and displays "please specify an input csv"

- **Given** I run the script with a file path that does not exist  
  **When** the script executes  
  **Then** it exits with a non-zero status code and displays an error that the file cannot be found

- **Given** I run the script with a valid file path that exists  
  **When** the script executes  
  **Then** it proceeds to process the CSV (no error about missing input)

- **Given** I run the script and see the error message  
  **When** I read the error  
  **Then** I immediately understand I need to provide a valid CSV file path as an argument

## Success Signal
- Users who forget the argument can self-correct without asking for help
- Error message is clear enough that no one needs to read documentation to understand it

## Out of Scope
- Validating the file format/content (separate concern)
- Showing usage examples or help text (keep it minimal)
