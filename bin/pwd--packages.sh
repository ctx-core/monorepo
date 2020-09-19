#!/bin/sh
TEMP=$(mktemp); cat <<EOF > $TEMP; pnpm recursive exec -- sh "$TEMP"
pwd
EOF
