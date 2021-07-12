export function stdout_h_package_name_(
	package_name_a:string[], stdout_aa:string[]
):Record<string, string> {
	const package_name_stdout:Record<string, string> = {}
	for (let i = 0; i < package_name_a.length; i++) {
		const package_name = package_name_a[i]
		package_name_stdout[package_name] = stdout_aa[i]
	}
	return package_name_stdout
}
