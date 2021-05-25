import fs from 'fs'
import { promisify } from 'util'
import { each } from '@ctx-core/array'
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const { keys } = Object
import { map_package_json_path_glob } from './map_package_json_path_glob'
export async function refresh_ctx_core_package() {
	await map_package_json_path_glob(
		`${__dirname}/../../../**/package.json`,
		async (package_json:string)=>{
			const txt = await readFile(package_json).toString()
			const in_json:json_T = JSON.parse(txt)
			const out_json = {} as json_T
			each(keys(in_json), (key:string)=>{
				if (key === 'main') {
					out_json.main = in_json[key]
					out_json.module = in_json[key]
				} else if (key === 'module') {
					out_json.main = in_json[key]
					out_json.module = in_json[key]
				} else if (key === 'homepage') {
					out_json.homepage = in_json[key]
					out_json.publishConfig = {
						access: 'public',
					}
				} else {
					out_json[key] = in_json[key]
				}
			})
			await writeFile(package_json, JSON.stringify(out_json, null, '\t'))
		})
}
interface json_T extends Record<string, string|{ access:string }> {
	main:string
	module:string
	homepage:string
	access:string
	publishConfig:{
		access:string
	}
}