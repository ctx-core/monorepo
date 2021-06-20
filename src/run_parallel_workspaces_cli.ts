import { _param_h } from '@ctx-core/cli-args'
import { run_parallel_workspaces } from './run_parallel_workspaces'
const cmd_a = process.argv.slice(2)
export async function run_parallel_workspaces_cli() {
	const opts = opts_()
	const workspace_name_stdout =
		await run_parallel_workspaces(cmd_a, opts)
	for (let workspace_name in workspace_name_stdout) {
		console.info(workspace_name)
		console.info(workspace_name_stdout[workspace_name])
	}
}
function opts_() {
	const { threads, help } = _param_h(process.argv.slice(2), {
		threads: '-t, --threads',
		help: '-h, --help',
	})
	if (help) {
		console.info(_help_msg)
		process.exit(0)
	}
	return {
		threads: parseInt(threads.toString()) || 20,
	}
}
function _help_msg() {
	return `
Usage: run-parallel--workspaces.js [-t <thread-count>]

Options:

-h, --help    This help message
-t, --threads Number of threads to run (defaults to 20)
		`.trim()
}
