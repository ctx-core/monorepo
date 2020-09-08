export function _promise_a1(workspace_a1, _promise) {
	const promise_a1 = []
	for (let i = 0; i < workspace_a1.length; i++) {
		const workspace_name = workspace_a1[i]
		promise_a1.push(_promise(workspace_name))
	}
	return promise_a1
}
