import { readFile } from 'fs/promises'
import { dirname, join } from 'path'
import glob from 'tiny-glob'
import yaml from 'js-yaml'
import { compact, flatten } from '@ctx-core/array'
/** @typedef {import('./index').pkg_r_T}pkg_r_T */
/**
 * @returns {Promise<pkg_r_T[]>}
 */
export async function sorted_pkg_o_a_() {
	const file = await readFile('./pnpm-workspace.yaml')
	const doc = yaml.load(file.toString(), {})
	/** @type {string[]} */
	const pkg_dir_a = doc['packages']
	const pkg_path_a =
		pkg_dir_a.map(project_dir =>
			join(project_dir, 'package.json'))
	const pkg_json_path_set =
		new Set(
			compact(
				await Promise.all(
					pkg_path_a.map(pkg_path =>
						glob(pkg_path)))))
	const pkg_json_path_a =
		flatten([...pkg_json_path_set])
	const pkg_a =
		await Promise.all(pkg_json_path_a
			.map(async $ => {
				const pkg =
					JSON.parse(
						await readFile($).then($ => $.toString()))
				pkg.path = dirname($)
				return pkg
			})).then($a => compact($a))
	const lookup_pkg_r = pkg_a.reduce((pkg_r, pkg) => {
		pkg_r[pkg.name] = pkg
		return pkg_r
	}, {})
	const pkg_r_a = []
	const pkg_set = new Set()
	for (const pkg1 of pkg_a) {
		push_pkg_o_a(pkg1)
	}
	return pkg_r_a
	function push_pkg_o_a(pkg) {
		const run_pkg = !pkg_set.has(pkg)
		if (run_pkg) {
			pkg_set.add(pkg)
		}
		const dependency_pkg_a = []
		dependency_pkg_a.push(...dependency_pkg_a_(pkg, pkg.dependencies))
		dependency_pkg_a.push(...dependency_pkg_a_(pkg, pkg.devDependencies))
		dependency_pkg_a.push(...dependency_pkg_a_(pkg, pkg.peerDependencies))
		if (run_pkg) {
			pkg_r_a.push({ pkg, dependency_pkg_a })
		}
	}
	function dependency_pkg_a_(pkg, dependencies) {
		const dependency_pkg_a = []
		if (!dependencies) return dependency_pkg_a
		for (const [dep_package_name, _dep_version] of Object.entries(dependencies)) {
			if (pkg.name === dep_package_name) continue
			/** @type {string} */
			const dep_version = _dep_version
			if (/^/.test(dep_version)) {
				const dep_pkg = lookup_pkg_r[dep_package_name]
				if (dep_pkg && !pkg_set.has(dep_pkg)) {
					push_pkg_o_a(dep_pkg)
				}
			}
		}
		return dependency_pkg_a
	}
}
export { sorted_pkg_o_a_ as sort_packages, }
