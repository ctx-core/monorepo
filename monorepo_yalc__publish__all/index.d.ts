import type { monorepo_thread_params_T } from '../_types/index.js'
export declare function monorepo_yalc__publish__all(
	params?:monorepo_yalc__publish__all__params_T
):Promise<void>
export interface monorepo_yalc__publish__all__params_T
	extends monorepo_thread_params_T {
	push?:boolean
}
