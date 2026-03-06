/// <reference types="../types/index.d.ts" />
import { monorepo_npm__dependencies__update } from '../monorepo_npm__dependencies__update/index.js'
import { project_a_ } from '../project_a/index.js'
/**
 * @param {monorepo_thread_params_T}params
 * @returns {Promise<Record<string, string>>}
 */
export async function monorepo_pnpm__dependencies__update(params = {}) {
	const package_name_R_latest_version =
		await package_name_R_latest_version_()
	return monorepo_npm__dependencies__update({
		...params,
		package_name_R_latest_version
	})
	/**
	 * @returns {Promise<Record<string, string>>}
	 * @private
	 */
	async function package_name_R_latest_version_() {
		const package_name_R_latest_version = {}
		const projects = await project_a_()
		for (const project of projects) {
			if (project.package_name && project.package_version) {
				package_name_R_latest_version[project.package_name] = project.package_version
			}
		}
		return package_name_R_latest_version
	}
}
