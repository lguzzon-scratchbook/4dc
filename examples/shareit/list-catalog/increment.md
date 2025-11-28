# List Catalog (Mobile-First)

## Job Story
**When** I open the ShareIt app on my mobile device  
**I want to** see a list of catalog items, each with an image, last used date, and by whom  
**So I can** quickly understand what’s available and who last used each item

**Assumption Being Tested:** Sample data is sufficient for initial design and usability testing of the catalog list screen.

## Acceptance Criteria
- **Given** I am on the catalog screen on a mobile device  
  **When** the screen loads  
  **Then** I see a list of sample catalog items, each showing an image, last used date, and user name

- **Given** the sample data is loaded  
  **When** I scroll through the list  
  **Then** all items are displayed responsively and are readable on mobile

- **Given** a catalog item has never been used  
  **When** it is displayed  
  **Then** the "last used" and "by whom" fields show "Never" or "N/A"

## Success Signal
- User can view all catalog items with image, last used, and by whom on a mobile device
- Sample data renders correctly and is readable

## Out of Scope
- Real backend data integration
- Editing or adding catalog items
- Desktop-specific layout and features
- Advanced filtering or sorting
