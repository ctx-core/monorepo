import { param_r_ } from 'ctx-core/cli-args'
import { createWriteStream } from 'fs'
import { monorepo_pnpm__circular_dependencies__detect } from '../monorepo_pnpm__circular_dependencies__detect/index.js'
/**
 * @returns {Promise<void>}
 */
export async function monorepo_pnpm__circular_dependencies__detect__cli() {
	const param_r = param_r_(process.argv.slice(2), {
		help: '-h, --help',
		output_a: '-o, --output',
		package_name_a: '-p, --package-name',
		threads_a: '-t, --threads',
	}, {
		threads_a: ['20']
	})
	if (param_r.help) {
		console.info(help_msg_())
		process.exit(0)
	}
	const package_name_R_circular__dependency_a =
		await monorepo_pnpm__circular_dependencies__detect({
			package_name_a: param_r.package_name_a,
			threads: parseInt(param_r.threads_a[0])
		})
	const output = param_r.output_a?.[0]
	const outstream =
		output
			? createWriteStream(output)
			: null
	try {
		const msg =
			package_name_R_circular__dependency_a
				? JSON.stringify(package_name_R_circular__dependency_a, null, '\t')
				: 'No circular dependencies!'
		if (outstream) {
			outstream.write(msg)
		} else {
			console.info(msg)
		}
	} finally {
		if (outstream) {
			await new Promise(res=>{
				outstream.on('end', ()=>res(null))
			})
		}
	}
}
function help_msg_() {
	return `
Usage: monorepo_pnpm__circular_dependencies__detect

Options:

-h, --help          This help message
-o, --output        [optional] Output path: If not set, output will go to STDOUT 
-p, --package-name  [optional] Package names to check for updates: If not set, all packages in monorepo will be checked
-t, --threads       [optional] Thread count: Default: 20
		`.trim()
}
