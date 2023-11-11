import { exec } from '@ctx-core/child_process'
/** @typedef {import('../_types/index.d.ts').project_T}project_T */
/**
 * @returns {Promise<project_T[]>}
 * @private
 */
export async function project_a_() {
	const raw_projects_str = await exec(
		`pnpm list -r --depth -1 | grep -v WARN | sed '/^\\s*$/d' | grep -v ' hook'`
	).then($=>
		$.stdout.trim())
	return raw_projects_str.split('\n').map($=>{
		const [
			package_name_package_version_str,
			package_dir
		] = $.split(/\s+/)
		const index =
			package_name_package_version_str.lastIndexOf('@')
		const package_name =
			~index
				? package_name_package_version_str.slice(0, index)
				: package_name_package_version_str
		const package_version =
			~index
				? package_name_package_version_str.slice(index + 1)
				: null
		return {
			package_name,
			package_version,
			package_dir,
		}
	})
}
export {
	project_a_ as projects_,
}
