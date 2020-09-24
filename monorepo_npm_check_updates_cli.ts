import { _param_h } from '@ctx-core/cli-args'
import { monorepo_npm_check_updates } from './monorepo_npm_check_updates'
export async function monorepo_npm_check_updates_cli() {
	const param_h = _param_h(process.argv.slice(2), {
		threads: '-t, --threads',
		workspace_name: '-w, --workspace-name'
	}, {
		threads: 20,
	})
	const stdout_h0_packageName_h1 = await monorepo_npm_check_updates(param_h)
	for (let packageName in stdout_h0_packageName_h1) {
		const stdout = stdout_h0_packageName_h1[packageName]
		if (stdout) console.info(packageName, stdout)
	}
}