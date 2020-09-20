#!/bin/sh
usage() { echo "Usage: $0 [-d] [-h]" 1>&2; exit 1; }
while getopts "dh" o; do
	case $o in
		d)
			DRY=true
			;;
		h)
			usage
			exit
			;;
	esac
done
TEMP=$(mktemp)
cat <<EOF > $TEMP
DRY=$DRY
EOF
cat <<'EOF' >> $TEMP
NAME=$(cat package.json | jq -r '.name')
VERSION=$(cat package.json | jq -r '.version')
LATEST=$(npm show "$NAME" | grep latest | awk '{print $2}')
not_published() { echo "$NAME NOT PUBLISHED" }
if [ "$VERSION" = "$LATEST" ]; then
  if [ -z $DRY ]; then
    not_published
  fi
  exit 0
fi
if [ -z $DRY ]; then
  pnpm publish || not_published
else
  echo "$NAME will be published"
fi
EOF
pnpm recursive exec -- sh "$TEMP"
