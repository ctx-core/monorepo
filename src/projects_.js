import { exec } from './exec.js'
/** @type {import('./projects_.d.ts').projects_} */
export const projects_ = async ()=>{
	const raw_projects_str = (await exec(`pnpm list -r --depth -1 | grep -v WARN | sed '/^\\s*$/d'`)).stdout.trim()
	return raw_projects_str.split('\n').map((raw_project_str)=>{
		const [package_name_package_version_str, package_dir] = raw_project_str.split(/\s+/)
		const index = package_name_package_version_str.lastIndexOf('@')
		const package_name = package_name_package_version_str.slice(0, index)
		const package_version = package_name_package_version_str.slice(index + 1)
		return {
			package_name,
			package_version,
			package_dir
		}
	})
}