#!/bin/sh
TEMP=$(mktemp)
cat <<'EOF' > $TEMP
DEFAULT_MSG=''
git add .
if [[ ( -f COMMIT_EDITMSG ) && ( -n "$(cat COMMIT_EDITMSG | surrounding-trim)" ) ]]; then
  git commit -a -F COMMIT_EDITMSG && rm COMMIT_EDITMSG
else
  git commit -am "$DEFAULT_MSG"
  # git add . && (git diff --quiet HEAD || git commit -C HEAD --amend)
fi||echo ''
EOF
EDITOR=$(git config --get core.editor) || ${EDITOR:=vi}
"$EDITOR" "$TEMP"
if [ -f pnpm-workspace.yaml ] || [ -f pnpm-workspace.yml ]; then
  pnpm recursive exec -- sh "$TEMP"
else
  WDA=$(
    node -e "import('node:fs/promises').then(fs=>fs.readFile('./package.json').then(buf=>JSON.parse(buf.toString())?.workspaces||[])).then(a=>console.info(...a))"
  )
  for wd in $WDA; do
    for d in $wd; do
      (cd $d && [ "$(git rev-parse --show-toplevel)" = "$(pwd)" ] && sh "$TEMP" || exit 0)
    done
  done
fi
