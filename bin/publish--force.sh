#!/bin/sh
usage() {
	echo "Usage: $0 [-s] [-d] [-h]" 1>&2
	exit 1
}
while getopts "sdh" o; do
	case $o in
	s)
		SINGLE=true
		;;
	d)
		DRY=true
		;;
	h)
		usage
		exit
		;;
	esac
done

if [ -z $SINGLE ]; then
	JOBLOG="$(mktemp)"
	"$(dirname "$(readlink -f "$0")")/workspace-list.sh" | awk '{print $2}' \
		| awk -v cmd=$0 -v flags="-s$([[ -n $DRY ]] && echo ' -d')" '{print "(cd "$1"; "cmd" "flags")"}' \
		| parallel --eta --joblog "$JOBLOG"
	COLS="$(cat "$JOBLOG" | head -n1)"
	EXITVAL_COL="$(echo "$COLS" | awk -v RS='\t' '/Exitval/{print NR; exit}')"
	COMMAND_COL="$(echo "$COLS" | awk -v RS='\t' '/Command/{print NR; exit}')"
	FAILED=''
	while IFS= read -r ROW; do
		if [ "$(echo "$ROW" | cut -f$EXITVAL_COL)" != '0' ]; then
			FAILED="$FAILED\n$ROW"
		fi
	done <<<"$(cat "$JOBLOG" | tail -n +2)"
	STRIPPED_FAILED="$(echo "$FAILED" | "$(dirname "$(readlink -f "$0")")/surrounding-trim.sh")"
	if [ -n "$STRIPPED_FAILED" ]; then
		echo "Jobs with errors ($JOBLOG)"
		echo "$COLS"
		printf "$STRIPPED_FAILED"
		exit 1
	fi
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
LATEST=$(npm show "$NAME" | grep 'latest:' | awk '{print $2}')
if [ "$VERSION" = "$LATEST" ]; then
	if [ -z $DRY ]; then
		not_published 'Latest version'
	fi
	exit 0
fi
if [ -z $DRY ]; then
	set +x
	if ! publish_token="$(passage btak/GRANULAR_NPM_TOKEN)"; then
		printf '%s\n' 'NPM_CONFIG_TOKEN lookup failed' >&2
		exit 1
	fi
	if [ -z "$publish_token" ]; then
		printf '%s\n' 'NPM_CONFIG_TOKEN lookup returned empty' >&2
		exit 1
	fi
	NPM_CONFIG_TOKEN="$publish_token" bun publish --tag latest --access public
	publish_status=$?
	unset publish_token
	if [ "$publish_status" -ne 0 ]; then
		not_published 'Publish failed'
		exit 1
	fi
else
	echo "$NAME will be published"
fi
