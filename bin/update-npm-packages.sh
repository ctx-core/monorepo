#!/bin/sh
# Deprecated: use monorepo_npm__dependencies__update.mjs directly
DIR="$(dirname "$(readlink -f "$0")")"
exec "$DIR/monorepo_npm__dependencies__update.mjs" "$@"
