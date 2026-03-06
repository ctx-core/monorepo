import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import glob from 'tiny-glob'
/** @typedef {import('../_types/index.d.ts').project_T} */
/**
 * @returns {Promise<project_T[]>}
 * @private
 */
export async function project_a_() {
	const pkg_json = JSON.parse(await readFile('./package.json', 'utf-8'))
	const workspace_globs = pkg_json.workspaces || []
	const pkg_paths = []
	for (const pattern of workspace_globs) {
		const matches = await glob(join(pattern, 'package.json'))
		pkg_paths.push(...matches)
	}
	const projects = []
	for (const pkg_path of pkg_paths) {
		const pkg = JSON.parse(await readFile(pkg_path, 'utf-8'))
		const package_dir = resolve(dirname(pkg_path))
		projects.push({
			package_name: pkg.name,
			package_version: pkg.version,
			package_dir,
		})
	}
	return projects
}
export {
	project_a_ as projects_,
}
