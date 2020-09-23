#!/bin/sh

LIST="$(pnpm list -r)"
while read line; do
	PKG="$(echo "$line" | awk '{print $1}')"
	MSG="$(echo "$line" | awk '{$1=""; print $0}')"
	DIR="$(echo "$LIST" | grep "$PKG" | awk '{print $2}')"
	if [ -n "$DIR" ]; then
		(cd "$DIR" && echo "$MSG" >>COMMIT_EDITMSG)
	fi
done
