import semver from 'semver'
const {
	valid, coerce, compare
} = semver
/**
 * @param {import('../_types').monorepo_thread_params_T}params
 * @returns {Promise<Record<string, string>>}
 */
export async function monorepo_pnpm__dependencies__update(params = {}) {
	const pkg_name_R_latest_version = pkg_name_R_latest_version_()
	return monorepo_npm__dependencies__update({
		...params, pkg_name_R_latest_version
	})
}
