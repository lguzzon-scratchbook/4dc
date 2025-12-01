# Design: Backend Serves Catalog Data
**Date:** 2025-12-01  
**Status:** Initial Technical Design

## Design Summary
We will build a basic Go backend that exposes a `/catalog` endpoint serving hardcoded sample catalog data in JSON format. The Svelte frontend will fetch and display this data. This approach supports rapid iteration and aligns with the constitution’s principles of simplicity and reliability.

## Technical Decisions
- **Framework:** Go (net/http)
	- **Rationale:** Go is reliable, simple, and well-suited for lightweight APIs.
	- **Trade-offs:** No database or persistence; data is hardcoded for MVP.
	- **Alternatives Considered:** Node.js (more dependencies), Python (less performance for concurrent requests).
- **Frontend Integration:** Svelte fetches from Go API
	- **Rationale:** Svelte is already used; fetch API is simple and idiomatic.
	- **Trade-offs:** No error handling for network failures in MVP.
	- **Alternatives Considered:** Axios or other HTTP clients (unnecessary for MVP).

## Initial Approach
### Serve Hardcoded Data from Go Backend
**Approach:** Catalog entries are stored as a Go slice/array and served as JSON at `/catalog`.  
**Rationale:** Fast to implement, no database setup required.  
**Trade-offs:** Not scalable; data changes require code changes.  
**Alternatives to Consider:** Move to database or config file for future extensibility.

### Frontend Fetches Data from API
**Approach:** Svelte frontend uses `fetch` to request `/catalog` and renders the response.  
**Rationale:** Keeps frontend logic simple and focused.  
**Trade-offs:** No caching or offline support.  
**Alternatives to Consider:** Add caching or fallback for offline use.

## Architecture Overview
**Components:**
- Go backend: Serves `/catalog` endpoint with hardcoded data.
- Svelte frontend: Fetches and displays catalog entries.

**Data Flow:**
Client (Svelte) → Go API (`/catalog`) → Client renders data

**Integration Points:**
- `/catalog` endpoint: JSON response consumed by frontend.

**State Management:**
- Catalog data lives in Go backend as a hardcoded array/slice.

## Implementation Constraints
- No database or persistent storage.
- Data changes require backend code changes.
- Only one endpoint (`/catalog`) for MVP.

## Open Questions
- How will catalog data be updated for future increments?
- Should error handling or fallback UI be added for network failures?
- When should we move to a database or config file for catalog data?
