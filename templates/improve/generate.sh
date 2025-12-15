#!/usr/bin/env bash
set -euo pipefail

# Generate the self-contained improve.prompt.md from the template fragments.
#
# Usage (from repo root):
#   ./templates/improve/generate.sh > improve.prompt.md
#
# Or:
#   ./templates/improve/generate.sh
#
# To force stdout:
#   WRITE_TO_STDOUT=1 ./templates/improve/generate.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TEMPLATES_DIR="${ROOT_DIR}/templates/improve"
OUT_FILE="${ROOT_DIR}/improve.prompt.md"

WRITE_TO_STDOUT="${WRITE_TO_STDOUT:-0}"
COMMIT_HASH="$(git -C "${ROOT_DIR}" rev-parse --short HEAD 2>/dev/null || echo unknown)"
GENERATED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
SOURCE_URL="https://github.com/co0p/4dc"

render() {
  sed -e "s/{{VERSION}}/${COMMIT_HASH}/g" \
      -e "s/{{GENERATED_AT}}/${GENERATED_AT}/g" \
      -e "s#{{SOURCE_URL}}#${SOURCE_URL}#g"
}

generate() {
  render < "${TEMPLATES_DIR}/00-header.md"
  echo
  render < "${TEMPLATES_DIR}/01-subject-scope.md"
  echo
  render < "${TEMPLATES_DIR}/02-persona.md"
  echo
  render < "${TEMPLATES_DIR}/03-goal.md"
  echo
  render < "${TEMPLATES_DIR}/04-lenses.md"
  echo
  render < "${TEMPLATES_DIR}/05-output.md"
  echo
  render < "${TEMPLATES_DIR}/06-process.md"
  echo
  render < "${TEMPLATES_DIR}/07-adr.md"
  echo
}

if [ "$WRITE_TO_STDOUT" = "1" ]; then
  generate
else
  generate > "$OUT_FILE"
  echo "Wrote improve prompt to: $OUT_FILE"
fi