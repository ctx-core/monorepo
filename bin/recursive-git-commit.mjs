import { file_exists_ } from '@ctx-core/fs'
import { readFile } from 'fs/promises'
main()
	.then(()=>process.exit(0))
	.catch(err=>{
		console.error(err)
		process.exit(1)
	})
async function main() {
	let pnpm_workspace_exists = await file_exists_('./pnpm-workspace.yaml')
	if (await file_exists_('./pnpm-workspace.yaml')) {

	}
	let package_json = await readFile('./package.json').then(buf=>JSON.parse(buf.toString()))
	let package_glob_a = package_json?.workspaces?.packages
	for (let paackage_glob of package_glob_a) {

	}
}
