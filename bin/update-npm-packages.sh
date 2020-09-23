#!/bin/sh
DIR="$(dirname $0)"
#TEMP=$(mktemp)
TEMP=/tmp/tmp.apEX2sOUuh
#"$DIR/npm-check-updates--monorepo.js" > $TEMP
echo "$TEMP"
cat "$TEMP"
cat "$TEMP" | "$DIR/package-manifest-changesets.sh"
