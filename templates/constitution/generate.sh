#!/usr/bin/env bash
set -euo pipefail

# Directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="${SCRIPT_DIR}/../.."

OUTPUT_FILE="${ROOT_DIR}/create-constitution.prompt.md"

PARTS=(
  "00-header.md"
  "01-persona.md"
  "02-inputs.md"
  "03-task.md"
  "04-output-structure.md"
  "05-footer.md"
)

echo "Generating ${OUTPUT_FILE} from templates/constitution parts..."

: > "${OUTPUT_FILE}"  # truncate output file

for part in "${PARTS[@]}"; do
  PART_PATH="${SCRIPT_DIR}/${part}"
  if [[ ! -f "${PART_PATH}" ]]; then
    echo "Warning: missing part ${PART_PATH}, skipping"
    continue
  fi
  echo "" >> "${OUTPUT_FILE}"
  cat "${PART_PATH}" >> "${OUTPUT_FILE}"
  echo "" >> "${OUTPUT_FILE}"
done

echo "Done."