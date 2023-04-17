/** @typedef {import('../_types').project_T}project_T */
/** @typedef {import('./index.d.ts').package_name_R_project_T}package_name_R_project_T */
/**
 * @param {project_T}projects
 * @returns {package_name_R_project_T}
 * @private
 */
export function package_name_R_project_(
	projects
) {
	const $ret = {}
	for (const project of projects) {
		$ret[project.package_name] = project
	}
	return $ret
}
export {
	package_name_R_project_ as package_name_r_project_,
	package_name_R_project_ as package_name_h_project_,
}
