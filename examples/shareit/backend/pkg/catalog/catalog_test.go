package catalog

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCatalogHandler(t *testing.T) {
	req := httptest.NewRequest("GET", "/api/catalog", nil)
	w := httptest.NewRecorder()
	CatalogHandler(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("expected 200 OK, got %d", w.Code)
	}
	// Optionally, check response body for expected JSON
}
