import type { monorepo_thread_params_T } from '../_types'
export declare function monorepo_npm__dependencies__update(
	params?:monorepo_npm__dependencies__update__params_T
):Promise<Record<string, string>>
export interface monorepo_npm__dependencies__update__params_T
	extends monorepo_thread_params_T {
	package_name_R_latest_version?:Record<string, string>
}