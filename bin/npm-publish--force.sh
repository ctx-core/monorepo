#!/bin/sh
TEMP=$(mktemp); cat <<EOF > $TEMP; pnpm recursive exec -- sh "$TEMP"
npm publish || echo 'NOT PUBLISHED'
EOF
