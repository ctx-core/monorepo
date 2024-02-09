#!/bin/sh
usage() { echo "Usage: $0 [-b] [-h]" 1>&2; exit 1; }
while getopts "b:h" o; do
	case "$o" in
	b)
		BUMP=$OPTARG
		;;
	h)
		usage
		exit
		;;
	esac
done

BUMP=${BUMP:-patch}
PWD=$(pwd)
LIST="$(pnpm list -r --depth -1)"
BIN_DIR="$(dirname $0)"
echo $DIR
while read line; do
	if [ -z "$(echo "$line" | xargs)" ]; then
		continue
	fi
	PKG="$(echo "$line" | awk '{print $1}')"
	MSG="$(echo "$line" | awk '{$1=""; print $0}' | "$BIN_DIR/surrounding-trim.sh")"
	CHANGESET_MD_PATH="$PWD/.changeset/$(cksum <<<$MSG | cut -f 1 -d ' ').md"
	FRONTMATTER=''
	if [ -f "$CHANGESET_MD_PATH" ]; then
		FRONTMATTER="$(perl -ne '/^---/ && $i++; !/^---/ && $i < 2 && print' "$CHANGESET_MD_PATH")"
	fi
	if [ -z "$(echo "$FRONTMATTER" | xargs | grep '^$PKG')" ]; then
		FRONTMATTER="$(
			echo "$FRONTMATTER"
			echo \"$PKG\": $BUMP
		)"
	fi
	FRONTMATTER="$(echo "$FRONTMATTER" | sed '/^$/d')"
	cat <<EOF >"$CHANGESET_MD_PATH"
---
$(echo "$FRONTMATTER")
---

$MSG
EOF
done
