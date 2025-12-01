package static

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestStaticFileHandler_ValidFile(t *testing.T) {
	StaticDir = "testdata"
	req := httptest.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()
	StaticFileHandler(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("expected 200 OK, got %d", w.Code)
	}
}

func TestStaticFileHandler_MissingFile(t *testing.T) {
	req := httptest.NewRequest("GET", "/missing.html", nil)
	w := httptest.NewRecorder()
	StaticFileHandler(w, req)
	if w.Code != http.StatusNotFound {
		t.Errorf("expected 404 Not Found, got %d", w.Code)
	}
	// Optionally, check log output if log is redirected in tests
}
