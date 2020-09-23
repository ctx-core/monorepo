#!/bin/sh
TEMP=$(mktemp); cat <<'EOF' > $TEMP; vim $TEMP; pnpm recursive exec -- sh "$TEMP"
if [ ! -f COMMIT_EDITMSG ]; then exit 0; fi
COMMIT_EDITMSG_TEMP="$(mktemp)"
cat COMMIT_EDITMSG | surrounding-trim.sh > $COMMIT_EDITMSG_TEMP; cat $COMMIT_EDITMSG_TEMP > COMMIT_EDITMSG
EOF
