import { param_r_ } from '@ctx-core/cli-args'
import { entries_gen_ } from '@ctx-core/object'
import { createWriteStream } from 'fs'
import { readFile } from 'fs/promises'
/** @typedef {import('./index.d.ts')._monorepo_npm__dependencies__update__cli__params_T} */
/**
 * @param {_monorepo_npm__dependencies__update__cli__params_T}params
 * @returns {Promise<null>}
 * @private
 */
export async function _monorepo_npm__dependencies__update__cli(
	params
) {
	const {
		help_msg_,
		monorepo_npm__dependencies__update,
	} = params
	const param_r = param_r_(
		process.argv.slice(2), {
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
	const package_name_R_stdout =
		await monorepo_npm__dependencies__update({
			package_name_a: param_r.package_name_a,
			threads: parseInt(param_r.threads_a[0])
		})
	const output = param_r.output_a?.[0]
	const outstream =
		output
			? createWriteStream(output)
			: null
	await new Promise(async res=>{
		try {
			for (const [
				package_name,
				stdout
			] of entries_gen_(package_name_R_stdout)) {
				if (stdout) {
					for (const stdout_line of stdout.split('\n')) {
						if (outstream) {
							outstream.write(`${package_name} ${stdout_line}\n`)
						} else {
							console.info(package_name, stdout_line)
						}
					}
				}
			}
		} finally {
			if (outstream) {
				// Ensure that the contents are written to file before ending process
				await readFile(output)
				console.info(output)
				outstream.end(()=>
					res(null))
			} else {
				res(null)
			}
		}
	})
}