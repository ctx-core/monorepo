import globby from 'globby'
import { map } from '@ctx-core/array'
export async function map_package_json_path_glob(glob_txt, fn) {
	const package_a1 = await globby(glob_txt)
	return await Promise.all(map(package_a1, fn))
}
