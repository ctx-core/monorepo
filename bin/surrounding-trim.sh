#!/bin/sh
sed -e :a -e '/./,$!d;/^\n*$/{$d;N;};/\n$/ba'
