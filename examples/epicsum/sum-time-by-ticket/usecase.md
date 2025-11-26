# Sum Time by Ticket

## Job Story
When I have a CSV file with time entries across multiple tickets  
I want to see the total hours spent on each ticket  
So I can report time allocation without manual calculation

**Assumption Being Tested:** Automated time aggregation by ticket ID saves users time and reduces calculation errors.

## Acceptance Criteria

- **Given** a valid CSV file with multiple entries for ticket [E1]  
  **When** the script processes the file  
  **Then** output shows ticket ID, total time in H:MM format, and number of entries in a table format

- **Given** a CSV with entries for [E1] (2:00, 4:15) and [E2] (3:30)  
  **When** the script processes the file  
  **Then** output displays:
  ```
  Ticket ID | Total Time | Entries
  [E1]      | 6:15       | 2
  [E2]      | 3:30       | 1
  ```

- **Given** a CSV with a single entry for ticket [E3]  
  **When** the script processes the file  
  **Then** output includes [E3] with its time and entry count of 1 (same format as multi-entry tickets)

- **Given** a CSV with time entries like 2:00, 3:30, 4:15  
  **When** summing times for a ticket  
  **Then** totals correctly handle hour and minute carry-over (e.g., 2:50 + 0:30 = 3:20)

## Success Signal
Users can run the script and immediately see accurate time totals per ticket without manual calculation. Output is clear and readable in console.

## Out of Scope
- Decimal hour conversion (only H:MM format in output)
- Filtering by date range or person
- Sorting tickets by time or ID
- Export to file (console output only)
- Multiple ticket IDs in one Description field (already validated to have pattern, assume one ticket per row)
