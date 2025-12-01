# Increment: Go Backend for Catalog Entries

## Job Story
**When** I run the ShareIt frontend  
**I want to** have catalog entries served from a Go backend endpoint  
**So I can** display real data from the backend instead of hardcoded sample data

**Assumption Being Tested:**  
This approach is technically feasible for future features (Go backend can serve data, frontend can consume it)

## Acceptance Criteria
- **Given** the Go backend is running  
  **When** I access the `/catalog` endpoint  
  **Then** I receive a list of catalog entries in JSON format

- **Given** the frontend is running  
  **When** it requests catalog data from the backend  
  **Then** the catalog list is displayed using data from the backend

- **Given** the backend is unavailable  
  **When** the frontend requests catalog data  
  **Then** an error message or fallback UI is shown

## Success Signal
Frontend displays catalog entries fetched from the backend endpoint

## Out of Scope
- Real database integration
- Authentication and authorization
- Editing or adding catalog entries
- Additional endpoints beyond `/catalog`
