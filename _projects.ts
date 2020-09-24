import type { project_type } from './project_type'
import { exec } from './exec'
export async function _projects() {
	const raw_projects_str = (await exec(
		`pnpm list -r --depth -1 | sed '/^\\s*$/d'`
	)).stdout.trim()
	return (
		raw_projects_str.split('\n').map(
			raw_project_str=>{
				const raw_project_a1 = raw_project_str.split(/\s+/)
				const packageName_version_str = raw_project_a1[0]
				const index = packageName_version_str.lastIndexOf('@')
				const packageName = packageName_version_str.slice(0, index)
				const version = packageName_version_str.slice(index + 1)
				return {
					packageName,
					version,
					projectFolder: raw_project_a1[1],
				}
			}
		) as project_type[]
	)
}
