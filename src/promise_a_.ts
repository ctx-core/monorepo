import type { project_T } from './project_T.js'
export function promise_a_<O extends unknown = unknown>(
	projects:project_T[],
	promise_:(project:project_T) => Promise<O>
) {
	const promise_a = [] as Promise<O>[]
	for (let i = 0; i < projects.length; i++) {
		const project = projects[i]
		promise_a.push(promise_(project))
	}
	return promise_a
}
