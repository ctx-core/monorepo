#!/usr/bin/env bun
import { readdir } from 'node:fs/promises'
import { basename, extname } from 'node:path'
const files = await readdir(process.argv[2])
for (const file of files.sort()) {
	if (file === 'index.ts') continue
	if (file === '_test') continue
	if (file === 'test') continue
	const ext = extname(file)
	switch (ext) {
		case '':
			console.info(`export * from './${file}/index.js'`)
			break
		case '.ts':
			console.info(`export * from './${basename(file, '.ts')}.js'`)
			break
	}
}
