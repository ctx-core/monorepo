#!/usr/bin/env node
import { exec, sort_packages_call } from '../lib/index.js'
const cmd = process.argv.slice(process.argv.indexOf('--') + 1).join(' ')
await sort_packages_call(async (pkg)=>{
  try {
    const res = await exec(`cd ${pkg.path} && ${cmd}`)
    console.info(res.stdout.trim())
  } catch (err) {
    console.error(err)
  }
}, { retry_delay: 250 })
