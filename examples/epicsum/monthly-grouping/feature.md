# Monthly Grouping with Ticket Breakdown

## Job Story
When I review time tracking reports  
I want to see tickets grouped by month with monthly totals  
So I can understand effort distribution over time and which tickets consumed time each month

**Assumption Being Tested:** Grouping tickets by month with summary totals helps users track effort trends and identify high-activity periods more easily than a flat ticket list.

## Acceptance Criteria

- **Given** a CSV with dates in YYYY-MM-DD format (e.g., "2024-06-01", "2024-06-02")  
  **When** aggregation runs  
  **Then** output shows month header "2024/06 - Total: X:XX (N entries)" followed by ticket breakdown for that month

- **Given** a CSV with dates in DD.MM.YY format (e.g., "20.11.25", "17.11.25")  
  **When** aggregation runs  
  **Then** output shows month header "2024/11 - Total: X:XX (N entries)" followed by ticket breakdown for that month

- **Given** a CSV with entries spanning multiple months  
  **When** aggregation runs  
  **Then** output shows each month in descending chronological order (newest first) with its own header and ticket breakdown

- **Given** a CSV with multiple tickets in the same month  
  **When** aggregation runs  
  **Then** monthly total equals the sum of all ticket times in that month

- **Given** a CSV with entries from "2024/11" and "2024/06"  
  **When** aggregation runs  
  **Then** "2024/11" appears first, then "2024/06" (descending chronological order)

## Success Signal
Reports show clear monthly groupings with totals, making it easy to see effort distribution across months and identify which tickets consumed time in each period.

## Out of Scope
- Filtering by specific month (show all months)
- Configurable sort order (descending only for v1)
- Year-only grouping (month granularity required)
- Cross-month ticket summaries (tickets shown per month only)
- Custom date format support beyond DD.MM.YY and YYYY-MM-DD
