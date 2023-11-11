import { monorepo_thread_params_T } from '../_types/index.js'
export declare function _monorepo_npm__dependencies__update__cli():Promise<null>
export interface _monorepo_npm__dependencies__update__cli__params_T {
	help_msg_:()=>string
	monorepo_pnpm__dependencies__update:
		(params?:monorepo_thread_params_T)=>
			Promise<Record<string, string>>
}