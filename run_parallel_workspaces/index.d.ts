import type { monorepo_thread_params_T } from '../_types/index.js'
export declare function run_parallel_workspaces(
	cmd_a:string[],
	params?:monorepo_thread_params_T
):Promise<Record<string, string>>
