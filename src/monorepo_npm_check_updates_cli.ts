import { param_r_ } from '@ctx-core/cli-args'
import { monorepo_npm_check_updates } from './monorepo_npm_check_updates.js'
export async function monorepo_npm_check_updates_cli() {
	const param_r = param_r_(process.argv.slice(2), {
		threads: '-t, --threads',
		workspace_name: '-w, --workspace-name'
	}, {
		threads: 20,
	})
	const stdout_h_package_name = await monorepo_npm_check_updates(param_r)
	for (let package_name in stdout_h_package_name) {
		const stdout = stdout_h_package_name[package_name]
		if (stdout) {
			stdout.split('\n').forEach(stdout_line => {
				console.info(package_name, stdout_line)
			})
		}
	}
}
