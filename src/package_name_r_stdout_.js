import { entries_gen_ } from '@ctx-core/object'
/** @type {import('./package_name_r_stdout_.d.ts').package_name_r_stdout_} */
export const package_name_r_stdout_ = (package_name_a, stdout_aa)=>{
	const $ret = {}
	for (const [i, package_name] of entries_gen_(package_name_a)) {
		$ret[package_name] = stdout_aa[i]
	}
	return $ret
}
