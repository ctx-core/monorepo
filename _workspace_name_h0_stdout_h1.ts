export function _workspace_name_h0_stdout_h1(workspace_name_a1, stdout_a1) {
	const workspace_name_stdout = {}
	for (let i = 0; i < workspace_name_a1.length; i++) {
		const workspace_name = workspace_name_a1[i]
		workspace_name_stdout[workspace_name] = stdout_a1[i]
	}
	return workspace_name_stdout
}
