#!/usr/bin/env node
import { lstat, readdir } from 'node:fs/promises'
import { join } from 'node:path'
const dir = process.argv[2]
const files = await readdir(dir)
const dir_a = []
for (const file of files.sort()) {
	const stat = await lstat(join(dir, file))
	if (!stat.isDirectory()) continue
	if (file === 'node_modules') continue
	dir_a.push(file)
}
console.info(
	dir_a
		.map(dir=>'"./' + dir + '"')
		.join(',\n'))
