import { queue_ } from '@ctx-core/queue'
import { pkg_o_T, pnpm_list_package_T, sorted_pkg_o_a_ } from './sorted_pkg_o_a_'
export async function sort_packages_call(fn:(pkg:pnpm_list_package_T)=>Promise<void>) {
	const completed_pkg_set = new Set<pnpm_list_package_T>()
	const pkg_o_a = await sorted_pkg_o_a_()
	const queue = queue_(8)
	for (const pkg_o of pkg_o_a) {
		queue.add(()=>process_pkg_o(pkg_o))
	}
	await queue.close()

	async function process_pkg_o(pkg_o:pkg_o_T) {
		const { pkg, dependency_pkg_a } = pkg_o
		for (const dependency_pkg of dependency_pkg_a) {
			if (!completed_pkg_set.has(dependency_pkg)) {
				queue.add(()=>process_pkg_o(pkg_o))
				return
			}
		}
		await fn(pkg)
		completed_pkg_set.add(pkg)
	}
}
