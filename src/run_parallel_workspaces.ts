import { queue_ } from '@ctx-core/queue'
import { projects_ } from './projects_.js'
import { promise_a_ } from './promise_a_.js'
import { exec } from './exec.js'
import type { monorepo_thread_opts_T } from './monorepo_thread_opts_T.js'
import type { project_T } from './project_T.js'
import { stdout_h_package_name_ } from './stdout_h_package_name_.js'
export async function run_parallel_workspaces(cmd_a:string[], opts:monorepo_thread_opts_T = {}) {
	const queue = queue_(opts.threads || 20)
	const projects = await projects_()
	const cmd = cmd_a.join(' ')
	const package_name_a = projects.map(project=>project.package_name)
	const promise_a = promise_a_<string>(projects, promise_)
	const stdout_a = await Promise.all(promise_a)
	return stdout_h_package_name_(package_name_a, stdout_a)
	async function promise_(project:project_T):Promise<string> {
		const { package_dir } = project
		return (
			await queue.add<string>(
				async ()=>
					(await exec(`cd ${package_dir}; ${cmd}`)).stdout.trim()
			)
		)
	}
}
