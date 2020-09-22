import { _queue } from '@ctx-core/queue'
import { _stdout_h0_packageName_h1 } from './_stdout_h1_package_name_h0'
import { _projects } from './_projects'
import { _promise_a1 } from './_promise_a1'
import { exec } from './exec'
import type { monorepo_thread_opts_type } from './monorepo_thread_opts_type'
import type { rush_project_type } from './rush_project_type'
export async function run_parallel__workspaces(cmd_a1, opts:monorepo_thread_opts_type = {}) {
	const queue = _queue(opts.threads || 20)
	const projects = await _projects()
	const cmd = cmd_a1.join(' ')
	const packageName_a1 = projects.map(project=>project.packageName)
	const promise_a1 = _promise_a1(projects, _promise)
	const stdout_a1 = await Promise.all(promise_a1)
	return _stdout_h0_packageName_h1(packageName_a1, stdout_a1)
	async function _promise(project:rush_project_type) {
		const { projectFolder } = project
		return (
			queue.add(
				async ()=>
					(await exec(`cd ${projectFolder}; ${cmd}`)).stdout.trim()
			)
		)
	}
}
