#!/bin/env node
'use strict'
import { sorted_pkg_o_a_ } from '../dist/index.mjs'
const sorted_pkg_o_a = await sorted_pkg_o_a_()
for (const { pkg } of sorted_pkg_o_a) {
	console.info(pkg.name, pkg.path)
}
