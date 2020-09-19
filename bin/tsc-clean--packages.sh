#!/bin/sh
TEMP=$(mktemp); cat <<EOF > $TEMP; pnpm recursive exec -- sh "$TEMP"
rm -f tsconfig.tsbuildinfo
EOF
