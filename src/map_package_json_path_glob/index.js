import { globby } from 'globby'
/** @type {import('./index.d.ts').map_package_json_path_glob} */
export const map_package_json_path_glob = async (glob_txt, fn)=>{
	const package_a = await globby(glob_txt)
	return await Promise.all(package_a.map(fn))
}
