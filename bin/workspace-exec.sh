#!/bin/sh
# Runs a command in every workspace package directory.
# Replacement for: pnpm recursive exec -- <cmd>
# Usage: workspace-exec.sh <cmd> [args...]
if [ $# -eq 0 ]; then
  echo "Usage: $0 <cmd> [args...]" 1>&2
  exit 1
fi
BIN_DIR="$(dirname "$(readlink -f "$0")")"
"$BIN_DIR/workspace-list.sh" | while IFS= read -r line; do
  DIR="$(echo "$line" | awk '{print $2}')"
  if [ -n "$DIR" ] && [ -d "$DIR" ]; then
    (cd "$DIR" && "$@")
  fi
done
