import { entries_gen_ } from '@ctx-core/object'
/**
 * @param {string[]}package_name_a
 * @param {string[]}stdout_aa
 * @returns {Record<string, string>}
 * @private
 */
export function package_name_R_stdout_(
	package_name_a,
	stdout_aa
) {
	const $ret = {}
	for (const [
		i,
		package_name
	] of entries_gen_(package_name_a)) {
		$ret[package_name] = stdout_aa[i]
	}
	return $ret
}
export {
	package_name_R_stdout_ as package_name_r_stdout_
}