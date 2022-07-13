export declare function sorted_pkg_o_a_():Promise<pkg_r_T[]>
export declare type pnpm_list_package_dependencies_T = Record<string, string>
export interface pnpm_list_package_T {
	name:string;
	version:string;
	path:string;
	dependencies?:pnpm_list_package_dependencies_T;
	devDependencies?:pnpm_list_package_dependencies_T;
	peerDependencies?:pnpm_list_package_dependencies_T;
}
export interface pkg_r_T {
	pkg:pnpm_list_package_T;
	dependency_pkg_a:pnpm_list_package_T[];
}
export { sorted_pkg_o_a_ as sort_packages, }
