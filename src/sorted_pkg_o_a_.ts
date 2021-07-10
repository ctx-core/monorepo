import { readFile } from 'fs'
import yaml from 'js-yaml'
import globby from 'globby'
import { promisify } from 'util'
const readFile_p_ = promisify(readFile)
export async function sorted_pkg_o_a_():Promise<pkg_o_T[]> {
	const file = await readFile_p_('./pnpm-workspace.yaml')
	const doc = yaml.load(file.toString()) as { packages:string[] }
	const pkg_glob_a = doc['packages']
	const pkg_path_a = await globby(pkg_glob_a, { onlyDirectories: true })
	const pkg_a:pnpm_list_package_T[] = await Promise.all(
		pkg_path_a.map(async (pkg_path:string)=>{
				const pkg = JSON.parse(
					(await readFile_p_(`${pkg_path}/package.json`)).toString()
				)
				pkg.path = pkg_path
				return pkg
			}
		)
	)
	const lookup_pkg_o = pkg_a.reduce((pkg_o, pkg)=>{
		pkg_o[pkg.name] = pkg
		return pkg_o
	}, {} as Record<string, pnpm_list_package_T>)
	const pkg_o_a:pkg_o_T[] = []
	const pkg_set = new Set<pnpm_list_package_T>()
	for (const pkg of pkg_a) {
		push_pkg_o_a(pkg)
	}
	return pkg_o_a
	function push_pkg_o_a(pkg:pnpm_list_package_T) {
		const run_pkg = !pkg_set.has(pkg)
		if (run_pkg) {
			pkg_set.add(pkg)
		}
		const dependency_pkg_a = []
		dependency_pkg_a.push(...dependency_pkg_a_(pkg, pkg.dependencies))
		dependency_pkg_a.push(...dependency_pkg_a_(pkg, pkg.devDependencies))
		dependency_pkg_a.push(...dependency_pkg_a_(pkg, pkg.peerDependencies))
		if (run_pkg) {
			pkg_o_a.push({
				pkg,
				dependency_pkg_a,
			})
		}
	}
	function dependency_pkg_a_(pkg:pnpm_list_package_T, dependencies:pnpm_list_package_dependencies_T|undefined) {
		const dependency_pkg_a:pnpm_list_package_T[] = []
		if (!dependencies) return dependency_pkg_a
		for (const [dep_pkg_name, dep_pkg_brief] of Object.entries(dependencies)) {
			if (pkg.name === dep_pkg_name) continue
			if (/^link:/.test(dep_pkg_brief.version)) {
				const dep_pkg = lookup_pkg_o[dep_pkg_name]
				if (dep_pkg && !pkg_set.has(dep_pkg)) {
					push_pkg_o_a(dep_pkg)
				}
			}
		}
		return dependency_pkg_a
	}
}
export interface pnpm_list_package_dependency_T {
	from:string
	version:string
	resolved?:string
}
export type pnpm_list_package_dependencies_T = Record<string, pnpm_list_package_dependency_T>
export interface pnpm_list_package_T {
	name:string
	version:string
	path:string
	dependencies?:pnpm_list_package_dependencies_T
	devDependencies?:pnpm_list_package_dependencies_T
	peerDependencies?:pnpm_list_package_dependencies_T
}
export interface pkg_o_T {
	pkg:pnpm_list_package_T,
	dependency_pkg_a:pnpm_list_package_T[]
}
export {
	sorted_pkg_o_a_ as sort_packages,
}
