#!/bin/sh
TEMP=$(mktemp); cat <<'EOF' > $TEMP; pnpm recursive exec -- sh "$TEMP"
NAME=$(cat package.json | jq -r '.name')
VERSION=$(cat package.json | jq -r '.version')
LATEST=$(npm show "$NAME" | grep latest | awk '{print $2}')
if [ "$VERSION" = "$LATEST" ]; then
  echo 'NOT PUBLISHED'
  exit 0
fi
pnpm publish || echo 'NOT PUBLISHED'
EOF
