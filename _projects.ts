import fs from 'fs'
import type { rush_project_type } from './rush_project_type'
export async function _projects() {
	const rush_json_buffer = await fs.promises.readFile('./rush.json')
	const rush_json_str = rush_json_buffer.toString()
	const rush_json = JSON.parse(rush_json_str)
	return rush_json.projects as rush_project_type[]
}
