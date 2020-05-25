#!/usr/bin/env node
import fs from 'fs'
import { promisify } from 'util'
import { each } from '@ctx-core/array'
import { each__package__json } from '../lib'
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const { keys } = Object
main()
async function main() {
	await each__package__json(`${__dirname}/../../*/package.json`, async package__json => {
		const txt = await readFile(package__json)
		const json = JSON.parse(txt)
		const json__ = {}
		each(keys(json), key => {
			if (key === 'main') {
				json__.main = json[key]
				json__.module = json[key]
			} else if (key === 'module') {
				json__.main = json[key]
				json__.module = json[key]
			} else if (key === 'homepage') {
				json__.homepage = json[key]
				json__.publishConfig = {
					access: 'public',
				}
			} else {
				json__[key] = json[key]
			}
		})
		await writeFile(package__json, JSON.stringify(json__, null, '\t'))
	})
}
