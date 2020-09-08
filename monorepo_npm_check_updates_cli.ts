import { _param_h } from '@ctx-core/cli-args'
import { monorepo_npm_check_updates } from './monorepo_npm_check_updates'
export async function monorepo_npm_check_updates_cli() {
	const param_h = _param_h(process.argv.slice(2), {
		threads: '-t, --threads',
		workspace_name: '-w, --workspace-name'
	}, {
		threads: 20,
	})
	const h0_workspace_name_h1 = await monorepo_npm_check_updates(param_h)
	for (let workspace_name in h0_workspace_name_h1) {
		console.info(workspace_name)
		console.info(h0_workspace_name_h1[workspace_name])
	}
}
