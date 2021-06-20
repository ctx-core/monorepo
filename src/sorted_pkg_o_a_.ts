import { exec } from './exec'
export async function sorted_pkg_o_a_():Promise<pkg_o_T[]> {
  const pkg_a_json = (await exec(
    `pnpm list -r --json`
  )).stdout.trim()
  const pkg_a:pnpm_list_package_T[] = JSON.parse(pkg_a_json)
  const lookup_pkg_o = pkg_a.reduce((pkg_o, pkg)=> {
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
    const dependency_pkg_a = []
    dependency_pkg_a.push(...dependency_pkg_a_(pkg, pkg.dependencies))
    dependency_pkg_a.push(...dependency_pkg_a_(pkg, pkg.devDependencies))
    dependency_pkg_a.push(...dependency_pkg_a_(pkg, pkg.peerDependencies))
    if (!pkg_set.has(pkg)) {
      pkg_o_a.push({
        pkg,
        dependency_pkg_a,
      })
      pkg_set.add(pkg)
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
  dependencies?: pnpm_list_package_dependencies_T
  devDependencies?: pnpm_list_package_dependencies_T
  peerDependencies?: pnpm_list_package_dependencies_T
}
export interface pkg_o_T {
  pkg:pnpm_list_package_T,
  dependency_pkg_a:pnpm_list_package_T[]
}
export {
  sorted_pkg_o_a_ as sort_packages,
}