#!/usr/bin/env node
import { exec } from '@ctx-core/child_process'
import { sort_packages_call } from '../src/index.js'
const slice_idx = process.argv.indexOf('--') + 1
const cmd = slice_idx ? process.argv.slice(slice_idx).join(' ') : 'pwd'
sort_packages_call(async pkg=>{
	try {
		const res = await exec(`cd ${pkg.path} && ${cmd}`)
		console.info(res.stdout.trim())
	} catch (err) {
		console.error(err)
	}
}, { retry_delay: 250 })
	.then(()=>process.exit(0))
	.catch(()=>process.exit(1))
