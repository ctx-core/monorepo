import { param_r_ } from 'ctx-core/cli-args'
import { monorepo_yalc__publish__all } from '../monorepo_yalc__publish__all/index.js'
/**
 * @returns {Promise<void>}
 */
export async function monorepo_yalc__publish__all__cli() {
	const params = params_()
	await monorepo_yalc__publish__all(params)
}
function params_() {
	const {
		no_push,
		threads_a,
		help
	} = param_r_(process.argv.slice(2), {
		no_push: '--no-push',
		threads_a: '-t, --threads',
		help: '-h, --help'
	})
	if (help) {
		console.info(help_msg_())
		process.exit(0)
	}
	return {
		push: !no_push,
		threads: parseInt(threads_a?.[0]) || 20
	}
}
function help_msg_() {
	return `
Usage: monorepo_yalc__publish__all [options]

Publish all non-private workspace packages to the local yalc store.

Options:

-h, --help      This help message
--no-push       Publish only, don't push to consumers (default: push)
-t, --threads   Number of parallel threads (default: 20)
	`.trim()
}
