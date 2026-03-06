#!/bin/sh
TEMP=$(mktemp); cat <<EOF > $TEMP; "$(dirname $0)/workspace-exec.sh" sh "$TEMP"
rimraf tsconfig.tsbuildinfo
EOF
