import { readFile } from 'fs/promises'
import yaml from 'js-yaml'
import { globby } from 'globby'
export async function sorted_pkg_o_a_():Promise<pkg_r_T[]> {
	const file = await readFile('./pnpm-workspace.yaml')
	const doc = yaml.load(file.toString()) as { packages:string[] }
	const pkg_glob_a = doc['packages']
	const pkg_path_a = await globby(pkg_glob_a, { onlyDirectories: true })
	const pkg_a:pnpm_list_package_T[] = await Promise.all(
		pkg_path_a.map(async (pkg_path:string)=>{
				const pkg = JSON.parse(
					(await readFile(`${pkg_path}/package.json`)).toString()
				)
				pkg.path = pkg_path
				return pkg
			}
		)
	)
	const lookup_pkg_r = pkg_a.reduce((pkg_r, pkg)=>{
		pkg_r[pkg.name] = pkg
		return pkg_r
	}, {} as Record<string, pnpm_list_package_T>)
	const pkg_r_a:pkg_r_T[] = []
	const pkg_set = new Set<pnpm_list_package_T>()
	for (const pkg of pkg_a) {
		push_pkg_o_a(pkg)
	}
	return pkg_r_a
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
			pkg_r_a.push({
				pkg,
				dependency_pkg_a,
			})
		}
	}
	function dependency_pkg_a_(pkg:pnpm_list_package_T, dependencies:pnpm_list_package_dependencies_T|undefined) {
		const dependency_pkg_a:pnpm_list_package_T[] = []
		if (!dependencies) return dependency_pkg_a
		for (const [dep_pkg_name, dep_pkg_version] of Object.entries(dependencies)) {
			if (pkg.name === dep_pkg_name) continue
			if (/^workspace:/.test(dep_pkg_version)) {
				const dep_pkg = lookup_pkg_r[dep_pkg_name]
				if (dep_pkg && !pkg_set.has(dep_pkg)) {
					push_pkg_o_a(dep_pkg)
				}
			}
		}
		return dependency_pkg_a
	}
}
export type pnpm_list_package_dependencies_T = Record<string, string>
export interface pnpm_list_package_T {
	name:string
	version:string
	path:string
	dependencies?:pnpm_list_package_dependencies_T
	devDependencies?:pnpm_list_package_dependencies_T
	peerDependencies?:pnpm_list_package_dependencies_T
}
export interface pkg_r_T {
	pkg:pnpm_list_package_T,
	dependency_pkg_a:pnpm_list_package_T[]
}
export {
	sorted_pkg_o_a_ as sort_packages,
}
