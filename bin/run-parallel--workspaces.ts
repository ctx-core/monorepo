#!/usr/bin/env node
require = require('esm')(module)
import { run_parallel__workspaces } from '../run_parallel__workspaces'
const { _param_h } = require('@ctx-core/cli-args')
const cmd_a1 = process.argv.slice(2)
main().then()
async function main() {
	const opts = _opts()
	const workspace_name_stdout =
		await run_parallel__workspaces(cmd_a1, opts)
	for (let workspace_name in workspace_name_stdout) {
		console.info(workspace_name)
		console.info(workspace_name_stdout[workspace_name])
	}
}
function _opts() {
	const { threads, help } = _param_h(process.argv.slice(2), {
		threads: '-t, --threads',
		help: '-h, --help',
	})
	if (help) {
		console.info(_help_msg)
		process.exit(0)
	}
	return {
		threads: threads || 20,
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
