import { sleep } from '@ctx-core/function'
import { queue_ } from '@ctx-core/queue'
import { pkg_r_T, pnpm_list_package_T, sorted_pkg_o_a_ } from './sorted_pkg_o_a_'
export async function sort_packages_call(
	fn:(pkg:pnpm_list_package_T)=>Promise<void>, opts:sort_packages_call_opts_T = {}
) {
	const completed_pkg_set = new Set<pnpm_list_package_T>()
	const pkg_o_a = await sorted_pkg_o_a_()
	const queue = queue_(8)
	for (const pkg_o of pkg_o_a) {
		queue.add(()=>process_pkg_o(pkg_o))
	}
	await queue.close()

	async function process_pkg_o(pkg_o:pkg_r_T) {
		const { pkg, dependency_pkg_a } = pkg_o
		for (const dependency_pkg of dependency_pkg_a) {
			if (!completed_pkg_set.has(dependency_pkg)) {
				queue.add(async ()=>{
					const retry_delay = opts.retry_delay || 0
					if (retry_delay) {
						await sleep(retry_delay)
					}
					await process_pkg_o(pkg_o)
				})
				return
			}
		}
		await fn(pkg)
		completed_pkg_set.add(pkg)
	}
}
export interface sort_packages_call_opts_T {
	retry_delay?: number,
}
