#!/bin/sh
pnpx changeset version \
	&& package-refactor \
	&& CHANGELOG-diff-COMMIT_EDITMSG
