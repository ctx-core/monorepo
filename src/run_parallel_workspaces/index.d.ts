import type { monorepo_thread_opts_T } from '../_types'
export declare function run_parallel_workspaces(
	cmd_a:string[], opts?:monorepo_thread_opts_T
):Promise<Record<string, string>>
