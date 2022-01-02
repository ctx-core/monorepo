/** @type {import('./package_name_h_project_.d.ts').package_name_h_project_} */
export const package_name_h_project_ = projects=>{
	const package_name_h_project = {}
	for (const project of projects) {
		package_name_h_project[project.package_name] = project
	}
	return package_name_h_project
}
