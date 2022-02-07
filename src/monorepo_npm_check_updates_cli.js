import { param_r_ } from '@ctx-core/cli-args'
import { monorepo_npm_check_updates } from './monorepo_npm_check_updates.js'
import { entries_gen_ } from '@ctx-core/object'
/** @type {import('./monorepo_npm_check_updates_cli.d.ts').monorepo_npm_check_updates_cli} */
export const monorepo_npm_check_updates_cli = async ()=>{
	const param_r = param_r_(process.argv.slice(2), {
		package_name_a: '-p, --package-name',
		threads_a: '-t, --threads'
	}, {
		threads_a: ['20']
	})
	const package_name_r_stdout = await monorepo_npm_check_updates({
		package_name_a: param_r.package_name_a,
		threads: parseInt(param_r.threads_a[0])
	})
	for (const [package_name, stdout] of entries_gen_(package_name_r_stdout)) {
		if (stdout) {
			for (const stdout_line of stdout.split('\n')) {
				console.info(package_name, stdout_line)
			}
		}
	}
}
