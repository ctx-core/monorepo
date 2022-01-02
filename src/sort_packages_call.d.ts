import { pnpm_list_package_T } from './sorted_pkg_o_a_.js'
export declare function sort_packages_call(fn:(pkg:pnpm_list_package_T)=>Promise<void>, opts?:sort_packages_call_opts_T):Promise<void>;
export interface sort_packages_call_opts_T {
	retry_delay?:number;
}
