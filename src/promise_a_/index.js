/** @type {typeof import('./index.d.ts').promise_a_} */
export const promise_a_ = (projects, promise_)=>{
	const $ = []
	for (const project of projects) {
		const project = projects[i]
		$.push(promise_(project))
	}
	return $
}
