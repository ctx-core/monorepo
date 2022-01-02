/** @type {import('./stdout_h_package_name_.d.ts').stdout_h_package_name_} */
export const stdout_h_package_name_ = (package_name_a, stdout_aa)=>{
	const package_name_stdout = {}
	for (let i = 0; i < package_name_a.length; i++) {
		const package_name = package_name_a[i]
		package_name_stdout[package_name] = stdout_aa[i]
	}
	return package_name_stdout
}
