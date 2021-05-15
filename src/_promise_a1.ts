import type { project_type } from './project_type'
export function _promise_a1<O extends unknown = unknown>(
	projects:project_type[],
	_promise:(project:project_type) => Promise<O>
) {
	const promise_a1 = [] as Promise<O>[]
	for (let i = 0; i < projects.length; i++) {
		const project = projects[i]
		promise_a1.push(_promise(project))
	}
	return promise_a1
}
