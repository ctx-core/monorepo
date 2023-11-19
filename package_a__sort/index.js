import { sleep } from '@ctx-core/function'
import { queue_ } from '@ctx-core/queue'
import { sorted_pkg_o_a_ } from '../sorted_pkg_o_a_/index.js'
/** @typedef {import('../sorted_pkg_o_a_/index.d.ts').pnpm_list_package_T} */
/** @typedef {import('./index.d.ts').package_a__sort__params_T} */
/**
 * @param {(pkg:pnpm_list_package_T):Promise<void>}fn
 * @param {package_a__sort__params_T}[params]
 * @returns {Promise<void>}
 */
export async function package_a__sort(
	fn,
	params = {}
) {
	const completed_pkg_set = new Set()
	const sorted_pkg_o_a = await sorted_pkg_o_a_()
	const queue = queue_(8)
	for (const pkg_o of sorted_pkg_o_a) {
		queue.add(()=>
			process_pkg_o(pkg_o)
		).then()
	}
	await queue.close()
	async function process_pkg_o(pkg_o) {
		const { pkg, dependency_pkg_a } = pkg_o
		for (const dependency_pkg of dependency_pkg_a) {
			if (!completed_pkg_set.has(dependency_pkg)) {
				const retry_delay = params.retry_delay || 0
				if (retry_delay) {
					await sleep(retry_delay)
				}
				await process_pkg_o(pkg_o)
				return
			}
		}
		await fn(pkg)
		completed_pkg_set.add(pkg)
	}
}
export {
	package_a__sort as sort_packages_call
}
