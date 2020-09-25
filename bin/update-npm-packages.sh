#!/bin/sh
DIR="$(dirname $0)"
TEMP=$(mktemp)
"$DIR/npm-check-updates--monorepo.js" > $TEMP
echo "$TEMP"
cat "$TEMP"
cat "$TEMP" | "$DIR/package-manifest-changeset.sh"
