#!/bin/sh
TEMP=$(mktemp); cat <<EOF > $TEMP; pnpm recursive exec -- sh "$TEMP"
if "$(cat package.json | jq -r '.version')" = " $(npm show $(cat package.json | jq -r '.name') | grep latest | awk '{print $2}')"; then
  echo 'NOT PUBLISHED'
  exit 0
fi
pnpm publish || echo 'NOT PUBLISHED'
EOF
