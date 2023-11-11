import glob from 'tiny-glob'
/**
 * @param {string}glob_txt
 * @param {(path:string)=>unknown}fn
 * @return {Promise<Awaited<unknown>[]>}
 */
export async function map_package_json_path_glob(glob_txt, fn) {
	const package_a = await glob(glob_txt)
	return await Promise.all(package_a.map(fn))
}
