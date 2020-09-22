export function _stdout_h0_packageName_h1(packageName_a1: string[], stdout_a1: string[]): Record<string, string> {
	const packageName_stdout = {}
	for (let i = 0; i < packageName_a1.length; i++) {
		const packageName = packageName_a1[i]
		packageName_stdout[packageName] = stdout_a1[i]
	}
	return packageName_stdout
}
