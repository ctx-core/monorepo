#!/bin/sh
DIR="$(dirname $0)"
TEMP=$(mktemp)
"$DIR/monorepo-npm-check-updates/index.mjs" -o $TEMP
cat "$TEMP" | "$DIR/package-manifest-changeset.sh"
