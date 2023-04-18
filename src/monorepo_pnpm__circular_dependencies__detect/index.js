import { last_ } from '@ctx-core/array'
import { line__parse } from '@ctx-core/string'
import { spawn } from 'child_process'
import { Readable } from 'stream'
const { keys } = Object
/**
 * @param {import('../_types').monorepo_thread_params_T}params
 * @returns {Promise<Record<string, string>>}
 */
export async function monorepo_pnpm__circular_dependencies__detect(params = {}) {
	const pkg_name_R_dependency_a =
		await pkg_name_R_dependency_a_()
	const circular__pkg_name_M_dependency_path_a =
		circular__pkg_name_M_dependency_path_a_()
	return (
		circular__pkg_name_M_dependency_path_a.size
			? Object.fromEntries([
				...circular__pkg_name_M_dependency_path_a.entries()])
			: null)
	/**
	 * @returns {Map<string, string[]>}
	 * @private
	 */
	function circular__pkg_name_M_dependency_path_a_() {
		/**
		 * @type {Map<string, string[]>}
		 */
		const pkg_name_M_circular__dependency_path_a = new Map()
		const pkg_name_a = keys(pkg_name_R_dependency_a)
		for (let i = 0; i < pkg_name_a.length; i++) {
			const pkg_name = pkg_name_a[i]
			const circular__dependency_path_a =
				circular__dependency_path_a_([pkg_name])
			if (circular__dependency_path_a) {
				pkg_name_M_circular__dependency_path_a.set(
					pkg_name,
					circular__dependency_path_a)
			}
		}
		return pkg_name_M_circular__dependency_path_a
		/**
		 * @param {string[]}[dependency_path_a]
		 * @private
		 */
		function circular__dependency_path_a_(
			dependency_path_a
		) {
			const pkg_name = last_(dependency_path_a)
			const dependency_a = pkg_name_R_dependency_a[pkg_name] || []
			for (let i = 0; i < dependency_a.length; i++) {
				const dependency = dependency_a[i]
				if (~dependency_path_a.indexOf(dependency)) return dependency_path_a
				const circular__dependency_path_a =
					circular__dependency_path_a_(
						[...dependency_path_a, dependency])
				if (circular__dependency_path_a) return circular__dependency_path_a
			}
			return null
		}
	}
	/**
	 * @returns {Promise<Record<string, string[]>>}
	 * @private
	 */
	async function pkg_name_R_dependency_a_() {
		const pkg_name_R_dependency_a = {}
		await new Promise(async res=>{
			let current__pkg_name
			const pnpm_recursive_list =
				spawn(
					'pnpm', ['recursive', 'list'],
					{
						stdio: ['pipe', 'pipe', process.stderr]
					})
			await line__parse(line=>{
				const word_a = line.split(' ')
				if (word_a.length !== 2) return
				const pkg_name_version_word = word_a[0]
				const pkg_name_version_match =
					/^(@?.*)@((\d\.?)+)$/.exec(pkg_name_version_word)
				if (pkg_name_version_match) {
					current__pkg_name = pkg_name_version_match[1]
					pkg_name_R_dependency_a[current__pkg_name] = []
				} else if (current__pkg_name) {
					pkg_name_R_dependency_a[current__pkg_name].push(word_a[0])
				}
			}, Readable.toWeb(pnpm_recursive_list.stdout))
			pnpm_recursive_list.on('close',
				()=>res(null))
		})
		return pkg_name_R_dependency_a
	}
}
