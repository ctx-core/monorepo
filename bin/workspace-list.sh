#!/bin/sh
# Lists all workspace packages in format: name@version /absolute/path
# Replacement for: pnpm list -r --depth -1
ROOT="$(pwd)"
WORKSPACES="$(node -e "
  const pkg = JSON.parse(require('fs').readFileSync('package.json', 'utf-8'));
  const ws = pkg.workspaces || [];
  console.log(ws.join('\n'));
")"
for pattern in $WORKSPACES; do
  for dir in $pattern; do
    if [ -f "$dir/package.json" ]; then
      NAME="$(node -e "console.log(JSON.parse(require('fs').readFileSync('$dir/package.json','utf-8')).name||'')")"
      VERSION="$(node -e "console.log(JSON.parse(require('fs').readFileSync('$dir/package.json','utf-8')).version||'0.0.0')")"
      if [ -n "$NAME" ]; then
        echo "${NAME}@${VERSION} $(cd "$dir" && pwd)"
      fi
    fi
  done
done
