import type { rush_project_type } from './rush_project_type'
export function _promise_a1(projects: rush_project_type[], _promise) {
	const promise_a1 = []
	for (let i = 0; i < projects.length; i++) {
		const project = projects[i]
		promise_a1.push(_promise(project))
	}
	return promise_a1
}
