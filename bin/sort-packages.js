#!/bin/env node
'use strict'
require = require('esm')(module)
const { sorted_pkg_o_a_ } = require('../src')
sorted_pkg_o_a_().then(sorted_pkg_o_a=>{
  for (const { pkg } of sorted_pkg_o_a) {
    console.info(pkg.name, pkg.path)
  }
})
