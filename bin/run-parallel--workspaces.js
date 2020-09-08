#!/usr/bin/env node
require = require('esm')(module)
const { workspace_a1_run_parallel } = require('../lib')
const { _param_h } = require('@ctx-core/cli-args')
const a1__cmd = process.argv.slice(2)
main()
async function main() {
	const opts = _opts()
	const stdout__name__workspace =
		await workspace_a1_run_parallel(a1__cmd, opts)
	for (let name__workspace in stdout__name__workspace) {
		console.info(name__workspace)
		console.info(stdout__name__workspace[name__workspace])
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
