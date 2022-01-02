import { queue_ } from '@ctx-core/queue'
import { exec } from './exec.js'
import { projects_ } from './projects_.js'
import { promise_a_ } from './promise_a_.js'
import { stdout_h_package_name_ } from './stdout_h_package_name_.js'
/** @type {import('./run_parallel_workspaces.d.ts').run_parallel_workspaces} */
export const run_parallel_workspaces = async (cmd_a, opts = {})=>{
	const queue = queue_(opts.threads || 20)
	const projects = await projects_()
	const cmd = cmd_a.join(' ')
	const package_name_a = projects.map((project)=>project.package_name
	)
	const promise_a = promise_a_(projects, promise_)
	const stdout_a = await Promise.all(promise_a)
	return stdout_h_package_name_(package_name_a, stdout_a)
	async function promise_(project) {
		const { package_dir } = project
		return await queue.add(async ()=>(await exec(`cd ${package_dir}; ${cmd}`)).stdout.trim()
		)
	}
}
