import { _monorepo_npm__dependencies__update__cli } from '../_monorepo_npm__dependencies__update__cli/index.js'
import { monorepo_pnpm__dependencies__update } from '../monorepo_pnpm__dependencies__update/index.js'
/**
 * @returns {Promise<void>}
 */
export async function monorepo_pnpm__dependencies__update__cli() {
	return _monorepo_npm__dependencies__update__cli({
		help_msg_,
		monorepo_npm__dependencies__update:
			monorepo_pnpm__dependencies__update
	})
}
function help_msg_() {
	return `
Usage: monorepo_pnpm__dependencies__update

Options:

-h, --help          This help message
-o, --output        [optional] Output path: If not set, output will go to STDOUT 
-p, --package-name  [optional] Package names to check for updates: If not set, all packages in monorepo will be checked
-t, --threads       [optional] Thread count: Default: 20
		`.trim()
}
