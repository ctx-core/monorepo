#!/bin/env node
require = require('esm')(module);
const { exec, sort_packages_call } = require('../src')
const cmd = process.argv.slice(2).join(' ')
sort_packages_call(async (pkg)=>{
  try {
    const res = await exec(`cd ${pkg.path} && ${cmd}`)
    console.info(res.stdout.trim())
  } catch (err) {
    console.error(err)
  }
}, { retry_delay: 250 }).then()
