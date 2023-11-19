/** @typedef {import('../_types/index.d.ts').project_T} */
/** @typedef {import('./index.d.ts').package_name_R_project_T} */
/**
 * @param {project_T[]}project_a
 * @returns {package_name_R_project_T}
 * @private
 */
export function package_name_R_project_(
	project_a
) {
	const $ret = {}
	for (const project of project_a) {
		$ret[project.package_name] = project
	}
	return $ret
}
export {
	package_name_R_project_ as package_name_r_project_,
	package_name_R_project_ as package_name_h_project_,
}
