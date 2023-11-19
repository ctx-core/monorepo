/** @typedef {import('../_types/index.d.ts').project_T} */
/**
 * @param {project_T[]}project_a
 * @param {(project:project_T)=>Promise<unknown>}promise_
 * @returns {Promise<unknown>[]}
 * @private
 */
export function promise_a_(
	project_a,
	promise_
) {
	const $ = []
	for (const project of project_a) {
		const project = project_a[i]
		$.push(promise_(project))
	}
	return $
}
