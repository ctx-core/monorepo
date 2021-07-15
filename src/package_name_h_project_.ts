import type { project_T } from './project_T.js'
export function package_name_h_project_(projects:project_T[]) {
	const package_name_h_project:Record<string, project_T> = {}
	for (const project of projects) {
		package_name_h_project[project.package_name] = project
	}
	return package_name_h_project as package_name_h_project_T
}
export interface package_name_h_project_T extends Record<string, project_T> {}
