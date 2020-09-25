import { _queue } from '@ctx-core/queue'
import { _projects } from './_projects'
import { _promise_a1 } from './_promise_a1'
import { exec } from './exec'
import type { monorepo_thread_opts_type } from './monorepo_thread_opts_type'
import type { project_type } from './project_type'
import { _stdout_h0_package_name_h1 } from './_stdout_h0_package_name_h1'
export async function run_parallel__workspaces(cmd_a1, opts:monorepo_thread_opts_type = {}) {
	const queue = _queue(opts.threads || 20)
	const projects = await _projects()
	const cmd = cmd_a1.join(' ')
	const package_name_a1 = projects.map(project=>project.package_name)
	const promise_a1 = _promise_a1<string>(projects, _promise)
	const stdout_a1 = await Promise.all(promise_a1)
	return _stdout_h0_package_name_h1(package_name_a1, stdout_a1)
	async function _promise(project:project_type) {
		const { package_dir } = project
		return (
			queue.add(
				async ()=>
					(await exec(`cd ${package_dir}; ${cmd}`)).stdout.trim()
			)
		) as Promise<string>
	}
}
