export function _packageName_h0_stdout_h1(packageName_a1, stdout_a1) {
	const packageName_stdout = {}
	for (let i = 0; i < packageName_a1.length; i++) {
		const packageName = packageName_a1[i]
		packageName_stdout[packageName] = stdout_a1[i]
	}
	return packageName_stdout
}
