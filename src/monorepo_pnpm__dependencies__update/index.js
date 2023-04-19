import { line__parse } from '@ctx-core/string'
import { monorepo_npm__dependencies__update } from '../monorepo_npm__dependencies__update/index.js'
import { spawn } from 'child_process'
import { Readable } from 'stream'
/**
 * @param {import('../_types').monorepo_thread_params_T}params
 * @returns {Promise<Record<string, string>>}
 */
export async function monorepo_pnpm__dependencies__update(params = {}) {
	const pkg_name_R_latest_version =
		await pkg_name_R_latest_version_()
	return monorepo_npm__dependencies__update({
		...params,
		pkg_name_R_latest_version
	})
	/**
	 * @returns {Promise<Record<string, string>>}
	 * @private
	 */
	async function pkg_name_R_latest_version_() {
		const pkg_name_R_latest_version = {}
		await new Promise(res=>{
			const pnpm_recursive_list =
				spawn(
					'pnpm', ['recursive', 'list'],
					{
						stdio: ['pipe', 'pipe', process.stderr]
					})
			line__parse(line=>{
				const word_a = line.split(' ')
				if (word_a.length !== 2) return
				const pkg_name_version_word = word_a[0]
				const pkg_name_version_match =
					/^(@?.*)@((\d\.?)+)$/.exec(pkg_name_version_word)
				if (!pkg_name_version_match) return
				const pkg_name = pkg_name_version_match[1]
				const version = pkg_name_version_match[2]
				if (!pkg_name || !version) return
				pkg_name_R_latest_version[pkg_name] = version
			}, Readable.toWeb(pnpm_recursive_list.stdout))
			pnpm_recursive_list.on('close',
				()=>res(null))
		})
		return pkg_name_R_latest_version
	}
}
