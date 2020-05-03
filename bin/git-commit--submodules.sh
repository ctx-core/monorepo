#!/bin/sh
DIR="$(pwd)"
while read dir; do
  echo "$dir"
  cd "$dir"
  git add .
  git commit -av < /dev/tty > /dev/tty
done <<< $(git submodule foreach pwd | grep -v '^Entering')
cd $DIR
git add .
git commit -av < /dev/tty > /dev/tty
