import type { project_T } from '../_types/index.js'
export declare function promise_a_<
	O extends unknown = unknown
>(
	projects:project_T[],
	promise_:(project:project_T)=>Promise<O>
):Promise<O>[]
