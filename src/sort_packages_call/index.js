import { sleep } from '@ctx-core/function'
import { queue_ } from '@ctx-core/queue'
import { sorted_pkg_o_a_ } from '../sorted_pkg_o_a_/index.js'
/** @type {import('./index.d.ts').sort_packages_call} */
export const sort_packages_call = async (fn, opts = {})=>{
	const completed_pkg_set = new Set()
	const pkg_o_a = await sorted_pkg_o_a_()
	const queue = queue_(8)
	for (const pkg_o of pkg_o_a) {
		queue.add(()=>process_pkg_o(pkg_o)).then()
	}
	await queue.close()
	async function process_pkg_o(pkg_o) {
		const { pkg, dependency_pkg_a } = pkg_o
		for (const dependency_pkg of dependency_pkg_a) {
			if (!completed_pkg_set.has(dependency_pkg)) {
				queue.add(async ()=>{
					const retry_delay = opts.retry_delay || 0
					if (retry_delay) {
						await sleep(retry_delay)
					}
					await process_pkg_o(pkg_o)
				}).then()
				return
			}
		}
		await fn(pkg)
		completed_pkg_set.add(pkg)
	}
}
