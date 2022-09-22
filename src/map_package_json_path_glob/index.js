import glob from 'tiny-glob'
export async function map_package_json_path_glob(/** @type {string} */glob_txt, fn) {
	const package_a = await glob(glob_txt)
	return await Promise.all(package_a.map(fn))
}
