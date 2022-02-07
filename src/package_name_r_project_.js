/** @type {import('./package_name_r_project_.d.ts').package_name_r_project_} */
export const package_name_r_project_ = projects=>{
	const $ret = {}
	for (const project of projects) {
		$ret[project.package_name] = project
	}
	return $ret
}
export { package_name_r_project_ as package_name_h_project_ }
