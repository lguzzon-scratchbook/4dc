#!/bin/bash

# Argument validation: Check if input file argument is provided
if [ -z "$1" ]; then
    echo "please specify an input csv" >&2
    exit 1
fi

# File existence check: Verify the file exists
if [ ! -f "$1" ]; then
    echo "Error: File '$1' not found" >&2
    exit 1
fi

# Main logic will go here
echo "Processing file: $1"
