import { queue_ } from '@ctx-core/queue'
import { exec } from '@ctx-core/child_process'
import { projects_ } from '../projects_/index.js'
import { promise_a_ } from '../promise_a_/index.js'
import { package_name_r_stdout_ } from '../package_name_r_stdout_/index.js'
/** @type {typeof import('./index.d.ts').run_parallel_workspaces} */
export const run_parallel_workspaces = async (cmd_a, opts = {})=>{
	const queue = queue_(opts.threads || 20)
	const projects = await projects_()
	const cmd = cmd_a.join(' ')
	const package_name_a = projects.map((project)=>project.package_name
	)
	const promise_a = promise_a_(projects, promise_)
	const stdout_a = await Promise.all(promise_a)
	return package_name_r_stdout_(package_name_a, stdout_a)
	async function promise_(project) {
		const { package_dir } = project
		return await queue.add(async ()=>(await exec(`cd ${package_dir}; ${cmd}`)).stdout.trim()
		)
	}
}
