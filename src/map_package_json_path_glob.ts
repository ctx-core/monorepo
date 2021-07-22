import { globby } from 'globby'
import { map } from '@ctx-core/array'
export async function map_package_json_path_glob<Out extends unknown = unknown>(
	glob_txt:string, fn:(path:string)=>Out
):Promise<Out[]> {
	const package_a = await globby(glob_txt)
	return await Promise.all(map(package_a, fn))
}
