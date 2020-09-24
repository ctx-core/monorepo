#!/bin/sh
usage() { echo "Usage: $0 [-f] [-h]" 1>&2; exit 1; }
while getopts "fh" o; do
	case $o in
	f)
		FORCE=true
		;;
	h)
		usage
		exit
		;;
	esac
done

LIST="$(pnpm list -r --depth -1)"
CHANGESETS="$(ls -1 .changeset/* | grep .*\.md | grep -v README)"
while IFS= read -r CHANGESET_MD_PATH; do
	FRONTMATTER="$(perl -ne '/^---/ && $i++; !/^---/ && $i < 2 && print' "$CHANGESET_MD_PATH")"
	MSG="$(
		perl -ne '$i > 1 ? print : /^---/ && $i++' "$CHANGESET_MD_PATH" \
		| "$(dirname $0)/surrounding-trim.sh"
	)"
	# sed script; See https://stackoverflow.com/questions/7359527/removing-trailing-starting-newlines-with-sed-awk-tr-and-friends
	PKGS="$(echo "$FRONTMATTER" | awk '{print $1}' | tr -d '":')"
	while IFS= read -r PKG; do
		DIR="$(echo "$LIST" | grep "$PKG@" | awk '{print $2}')"
		if [[ ! -f "$DIR/COMMIT_EDITMSG" || -z "$(grep -F "$MSG" "$DIR/COMMIT_EDITMSG")" ]]; then
			(cd "$DIR" && echo "- $MSG" >>COMMIT_EDITMSG)
		else
			if [ -n "$FORCE" ]; then
				(cd "$DIR" && echo "- $MSG" >COMMIT_EDITMSG)
			fi
		fi
	done <<<"$PKGS"
done <<<"$CHANGESETS"
