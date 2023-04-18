#!/bin/sh
export CWD=$(pwd)
cd $(dirname $0)
node ./index.mjs $@
