#!/bin/sh
ls $1/bin | awk '{print "\""$1"\": \"bin/"$1"\","}' | xsel -b
