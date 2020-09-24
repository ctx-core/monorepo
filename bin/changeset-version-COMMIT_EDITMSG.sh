#!/bin/sh
pnpx changeset version && package-refactor.js && CHANGELOG-diff-COMMIT_EDITMSG
