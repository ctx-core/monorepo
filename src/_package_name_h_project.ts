import type { project_type } from './project_type'
export function _package_name_h_project(projects:project_type[]) {
	const package_name_h_project:Record<string, project_type> = {}
	for (const project of projects) {
		package_name_h_project[project.package_name] = project
	}
	return package_name_h_project as package_name_h_project_type
}
export interface package_name_h_project_type extends Record<string, project_type> {}
