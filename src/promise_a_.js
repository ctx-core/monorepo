/** @type {import('./promise_a_.d.ts').promise_a_} */
export const promise_a_ = (projects, promise_)=>{
	const promise_a = []
	for (let i = 0; i < projects.length; i++) {
		const project = projects[i]
		promise_a.push(promise_(project))
	}
	return promise_a
}
