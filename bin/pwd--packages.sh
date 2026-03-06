#!/bin/sh
TEMP=$(mktemp); cat <<EOF > $TEMP; "$(dirname "$(readlink -f "$0")")/workspace-exec.sh" sh "$TEMP"
pwd
EOF
