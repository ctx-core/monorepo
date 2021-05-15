export function _stdout_h0_package_name_h1(
	package_name_a1:string[], stdout_a2:string[]
):Record<string, string> {
	const package_name_stdout:Record<string, string> = {}
	for (let i = 0; i < package_name_a1.length; i++) {
		const package_name = package_name_a1[i]
		package_name_stdout[package_name] = stdout_a2[i]
	}
	return package_name_stdout
}
