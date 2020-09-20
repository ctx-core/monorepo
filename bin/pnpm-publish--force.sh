#!/bin/sh
usage() { echo "Usage: $0 [-s] [-p] [-h]" 1>&2; exit 1; }
while getopts "sdh" o; do
	case $o in
	  s)
	    SINGLE=true ;;
		d)
			DRY=true ;;
		h)
			usage
			exit ;;
	esac
done

if [ -z $SINGLE ]; then
  pnpm ls -r --depth -1 | sed '/^\s*$/d' | awk '{print $2}' \
  | awk -v cmd=$0 -v flags="-s$([[ -n $DRY ]] && echo ' -d')" '{print "(cd "$1"; "cmd" "flags")"}' \
  | parallel --eta
  exit 0
fi

NAME=$(cat package.json | jq -r '.name')
PRIVATE=$(cat package.json | jq -r '.private')
not_published() { echo "$NAME NOT PUBLISHED: $1"; }
if [ "$PRIVATE" = 'true' ]; then
  not_published 'Private package'
  exit 0
fi
VERSION=$(cat package.json | jq -r '.version')
LATEST=$(npm show "$NAME" | grep latest | awk '{print $2}')
if [ "$VERSION" = "$LATEST" ]; then
  if [ -z $DRY ]; then
    not_published 'Latest version'
  fi
  exit 0
fi
if [ -z $DRY ]; then
  pnpm publish || not_published 'Publish failed'
else
  echo "$NAME will be published"
fi
