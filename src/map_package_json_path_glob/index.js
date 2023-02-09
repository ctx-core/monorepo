import glob from 'tiny-glob'
/**
 * @param glob_txt{string}
 * @param fn{(path:string)=>unknown}
 * @return {Promise<Awaited<unknown>[]>}
 */
export async function map_package_json_path_glob(glob_txt, fn) {
	const package_a = await glob(glob_txt)
	return await Promise.all(package_a.map(fn))
}
