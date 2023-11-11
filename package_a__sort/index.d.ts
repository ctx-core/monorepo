import type { pnpm_list_package_T } from '../sorted_pkg_o_a_/index.js'
export declare function package_a__sort(
	fn:(pkg:pnpm_list_package_T)=>Promise<void>,
	opts?:package_a__sort__params_T
):Promise<void>
export {
	package_a__sort as sort_packages_call
}
export interface package_a__sort__params_T {
	retry_delay?:number
}
export type sort_packages_call_opts_T = package_a__sort__params_T
