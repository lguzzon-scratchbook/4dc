#!/usr/bin/env bash
set -euo pipefail

# Generate the self-contained increment.prompt.md from the template fragments.
#
# Usage (from repo root):
#   ./templates/increment/generate.sh > increment.prompt.md
#
# Or:
#   ./templates/increment/generate.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TEMPLATES_DIR="${ROOT_DIR}/templates/increment"
OUT_FILE="${ROOT_DIR}/increment.prompt.md"

# If you want to write to stdout instead of a file, set WRITE_TO_STDOUT=1
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
  render < "${TEMPLATES_DIR}/03-inputs.md"
  echo
  render < "${TEMPLATES_DIR}/04-goal.md"
  echo
  render < "${TEMPLATES_DIR}/05-task.md"
  echo
  render < "${TEMPLATES_DIR}/06-process.md"
  echo
  render < "${TEMPLATES_DIR}/07-output-structure.md"
}

if [ "$WRITE_TO_STDOUT" = "1" ]; then
  generate
else
  generate > "$OUT_FILE"
  echo "Wrote increment prompt to: $OUT_FILE"
fi