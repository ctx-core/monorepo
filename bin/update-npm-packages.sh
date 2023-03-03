#!/bin/sh
DIR="$(dirname $0)"
TEMP=$(mktemp)
"$DIR/monorepo-npm-check-updates/index.mjs" -o $TEMP
echo "$TEMP"
cat "$TEMP"
cat "$TEMP" | "$DIR/package-manifest-changeset.sh"
