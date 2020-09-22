import type { rush_project_type } from './rush_project_type'
export function _promise_a1<O extends unknown>(
	projects:rush_project_type[],
	_promise:(project:rush_project_type) => Promise<O>
) {
	const promise_a1 = [] as Promise<O>[]
	for (let i = 0; i < projects.length; i++) {
		const project = projects[i]
		promise_a1.push(_promise(project))
	}
	return promise_a1
}
