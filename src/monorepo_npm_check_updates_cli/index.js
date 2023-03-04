import { param_r_ } from '@ctx-core/cli-args'
import { entries_gen_ } from '@ctx-core/object'
import { createWriteStream } from 'fs'
import { readFile } from 'fs/promises'
import { monorepo_npm_check_updates } from '../monorepo_npm_check_updates/index.js'
/**
 * @returns {Promise<void>}
 */
export async function monorepo_npm_check_updates_cli() {
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
	const package_name_r_stdout = await monorepo_npm_check_updates({
		package_name_a: param_r.package_name_a,
		threads: parseInt(param_r.threads_a[0])
	})
	const output = param_r.output_a?.[0]
	const outstream = output ? createWriteStream(output) : null
	try {
		for (const [package_name, stdout] of entries_gen_(package_name_r_stdout)) {
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
			outstream.close(()=>process.exit(0))
			// Ensure that the contents are written to file before ending process
			await readFile(output)
			console.info(output)
		}
	}
}
function help_msg_() {
	return `
Usage: monorepo-npm-check-updates

Options:

-h, --help          This help message
-o, --output        [optional] Output path: If not set, output will go to STDOUT 
-p, --package-name  [optional] Package names to check for updates: If not set, all packages in monorepo will be checked
-t, --threads       [optional] Thread count: Default: 20
		`.trim()
}
