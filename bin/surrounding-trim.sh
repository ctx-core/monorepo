#!/bin/sh
sed -e :a -e '/./,$!d;/^\n*$/{$d;N;};/\n$/ba' | awk '{$1=$1};1'
