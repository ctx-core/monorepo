#!/bin/sh
TEMP=$(mktemp)
cat <<'EOF' > $TEMP
DEFAULT_MSG=''
git add .
if [[ ( -f COMMIT_EDITMSG ) && ( -n "$(cat COMMIT_EDITMSG | surrounding-trim)" ) ]]; then
  git commit -a -F COMMIT_EDITMSG && rm COMMIT_EDITMSG
else
  git commit -am "$DEFAULT_MSG"
fi||echo ''
EOF
vim $TEMP
pnpm recursive exec --workspace-concurrency 1 -- sh "$TEMP"
