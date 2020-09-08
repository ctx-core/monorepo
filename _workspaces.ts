import { exec } from './exec'
export async function _workspaces() {
	const workspaces_txt = (await exec('yarn workspaces info')).stdout
	const workspaces_txt_a1 = workspaces_txt.split('\n')
	const workspaces_json_start_line = workspaces_txt_a1.indexOf('{')
	const workspaces_json_end_line = workspaces_txt_a1.indexOf('}')
	const workspaces_json =
		workspaces_txt_a1.slice(
			workspaces_json_start_line,
			workspaces_json_end_line + 1
		).join('\n')
	return JSON.parse(workspaces_json)
}
