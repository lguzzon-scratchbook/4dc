SHELL := /bin/sh
APP_NAME ?= Pomodoro
BUNDLE_ID ?= co0p.pomodoro
DIST ?= dist
APP := $(DIST)/$(APP_NAME).app
EXECUTABLE := pomodoro
GO ?= go
UNAME_S := $(shell uname -s)
VERSION_CMD := $(shell if [ -f VERSION ]; then cat VERSION; else git describe --tags --always 2>/dev/null || echo 0.0.0; fi)
VERSION ?= $(VERSION_CMD)

.PHONY: bundle clean version open

bundle:
	@if [ "$(UNAME_S)" != "Darwin" ]; then echo "bundle: macOS only (skipping)"; exit 0; fi
	@mkdir -p "$(APP)/Contents/MacOS" "$(APP)/Contents/Resources"
	@echo "Building $(EXECUTABLE) -> $(APP)/Contents/MacOS/$(EXECUTABLE)"
	@$(GO) build -o "$(APP)/Contents/MacOS/$(EXECUTABLE)" ./app
	@echo "Writing Info.plist (version $(VERSION))"
	@sed -e 's/__BUNDLE_NAME__/$(APP_NAME)/g' -e 's/__BUNDLE_ID__/$(BUNDLE_ID)/g' -e 's/__BUNDLE_VERSION__/$(VERSION)/g' packaging/macos/Info.plist.tmpl > "$(APP)/Contents/Info.plist"
	@echo "Copying AppIcon.icns"
	@cp -f assets/AppIcon.icns "$(APP)/Contents/Resources/AppIcon.icns" || printf "" >"$(APP)/Contents/Resources/AppIcon.icns"
	@echo "Bundle created at $(APP)"

open:
	@if [ "$(UNAME_S)" != "Darwin" ]; then echo "open: macOS only (skipping)"; exit 0; fi
	open "$(APP)"

version:
	@echo $(VERSION)

clean:
	rm -rf "$(DIST)"
