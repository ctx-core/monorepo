import { _queue } from '@ctx-core/queue'
import type { monorepo_thread_opts_type } from './monorepo_thread_opts_type'
import { _workspaces } from './_workspaces'
import { _promise_a1 } from './_promise_a1'
import { exec } from './exec'
import { _workspace_name_h0_stdout_h1 } from './_workspace_name_h0_stdout_h1'
export async function run_parallel__workspaces(cmd_a1, opts:monorepo_thread_opts_type = {}) {
	const queue = _queue(opts.threads || 20)
	const workspaces = await _workspaces()
	const cmd = cmd_a1.join(' ')
	const workspace_name_a1 = Object.keys(workspaces)
	const promise_a1 = _promise_a1(workspace_name_a1, _promise)
	const stdout_a1 = await Promise.all(promise_a1)
	return _workspace_name_h0_stdout_h1(workspace_name_a1, stdout_a1)
	async function _promise(name__workspace) {
		const workspace = workspaces[name__workspace]
		const { location } = workspace
		return (
			queue.add(
				async ()=>
					(await exec(`cd ${location}; ${cmd}`)).stdout.trim()
			)
		)
	}
}
