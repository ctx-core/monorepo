#!/bin/sh
lerna exec "$@" -- "npm publish || echo 'NOT PUBLISHED'"
