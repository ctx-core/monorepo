import { exec } from '@ctx-core/child_process'
import { queue_ } from '@ctx-core/queue'
import { package_name_R_stdout_ } from '../package_name_R_stdout_/index.js'
import { project_a_ } from '../project_a_/index.js'
import { promise_a_ } from '../promise_a_/index.js'
/** @typedef {import('../_types/index.d.ts').monorepo_thread_params_T} */
/**
 * @param {string[]}cmd_a
 * @param {monorepo_thread_params_T}[params]
 * @returns {Record<string, string>}
 */
export async function run_parallel_workspaces(
	cmd_a,
	params
) {
	const queue = queue_(params.threads || 20)
	const projects = await project_a_()
	const cmd = cmd_a.join(' ')
	const package_name_a = projects.map((project)=>project.package_name
	)
	const promise_a = promise_a_(projects, promise_)
	const stdout_a = await Promise.all(promise_a)
	return package_name_R_stdout_(package_name_a, stdout_a)
	async function promise_(project) {
		const { package_dir } = project
		return await queue.add(async ()=>(await exec(`cd ${package_dir}; ${cmd}`)).stdout.trim()
		)
	}
}
