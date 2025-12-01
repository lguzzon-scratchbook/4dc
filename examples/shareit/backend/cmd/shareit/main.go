// removed duplicate package declaration
package main

import (
	"net/http"
	"shareit-backend/pkg/catalog"
	"shareit-backend/pkg/static"
)

func main() {
	http.HandleFunc("/api/catalog", catalog.CatalogHandler)
	http.Handle("/", static.StaticFileHandler())
	http.ListenAndServe(":8080", nil)
}
