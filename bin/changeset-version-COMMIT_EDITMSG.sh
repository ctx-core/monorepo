#!/bin/sh
pnpm changeset version \
	&& package-refactor \
	&& CHANGELOG-diff-COMMIT_EDITMSG
