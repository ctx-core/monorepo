import type { rush_project_type } from './rush_project_type'
export function _packageName_h_project(projects:rush_project_type[]) {
	const packageName_h_project = {}
	for (const project of projects) {
		packageName_h_project[project.packageName] = project
	}
	return packageName_h_project as packageName_h_project_type
}
export type packageName_h_project_type = Record<string, rush_project_type>
