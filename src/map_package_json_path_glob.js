import { globby } from 'globby'
import { map } from '@ctx-core/array'
/** @type {import('./map_package_json_path_glob.d.ts').map_package_json_path_glob} */
export const map_package_json_path_glob = async (glob_txt, fn)=>{
	const package_a = await globby(glob_txt)
	return await Promise.all(map(package_a, fn))
}
