#!/bin/sh
TEMP=$(mktemp); cat <<EOF > $TEMP; pnpm recursive exec -- sh "$TEMP"
pnpm publish || echo 'NOT PUBLISHED'
EOF
