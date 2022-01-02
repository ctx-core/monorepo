import { param_r_ } from '@ctx-core/cli-args'
import { monorepo_npm_check_updates } from './monorepo_npm_check_updates.js'
/** @type {import('./monorepo_npm_check_updates_cli.d.ts').monorepo_npm_check_updates_cli} */
export const monorepo_npm_check_updates_cli = async ()=>{
	const param_r = param_r_(process.argv.slice(2), {
		package_name_a: '-p, --package-name',
		threads_a: '-t, --threads'
	}, {
		threads_a: [
			'20'
		]
	})
	const stdout_h_package_name = await monorepo_npm_check_updates({
		package_name_a: param_r.package_name_a,
		threads: parseInt(param_r.threads_a[0])
	})
	for (let package_name in stdout_h_package_name) {
		const stdout = stdout_h_package_name[package_name]
		if (stdout) {
			stdout.split('\n').forEach((stdout_line)=>{
				console.info(package_name, stdout_line)
			})
		}
	}
}
