#!/bin/sh
usage() { echo "Usage: $0 [-f] [-h]" 1>&2; exit 1; }
while getopts "fh" o; do
	case $o in
	f)
		FORCE=true
		;;
	*)
		usage
		exit
		;;
	esac
done

LIST="$(pnpm list -r --depth -1)"
BIN_DIR="$(dirname $0)"
while IFS= read -r LINE; do
	DIR="$(echo "$LINE" | awk '{print $2}')"
	(
		cd "$DIR"
		if [ -f CHANGELOG.md ]; then
			CHANGES="$(
				git add . && git diff --cached CHANGELOG.md | tail -n+6 | grep -v '^@@' \
				| sed -r "s/\x1B\[[0-9;]*[JKmsu]//g" \
				| sed 's/^\+//' \
				| "$BIN_DIR/surrounding-trim.sh"
			)"
			if [[ ! -f "$DIR/COMMIT_EDITMSG" || -z "$(grep -F "$MSG" "$DIR/COMMIT_EDITMSG")" ]]; then
				echo "$CHANGES" >>COMMIT_EDITMSG
			else
				if [ -n "$FORCE" ]; then
					echo "$CHANGES" >COMMIT_EDITMSG
				fi
			fi
		fi
	)
done <<<"$LIST"
