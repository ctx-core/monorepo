import { last_ } from '@ctx-core/array'
import { line__transform_stream_ } from '@ctx-core/string'
import { spawn } from 'child_process'
import { Readable } from 'stream'
const { keys } = Object
/**
 * @param {import('../_types/index.js').monorepo_thread_params_T}params
 * @returns {Promise<Record<string, string>>}
 */
export async function monorepo_pnpm__circular_dependencies__detect(params = {}) {
	const package_name_R_dependency_a =
		await package_name_R_dependency_a_()
	const circular__package_name_M_dependency_path_a =
		circular__package_name_M_dependency_path_a_()
	return (
		circular__package_name_M_dependency_path_a.size
			? Object.fromEntries([
				...circular__package_name_M_dependency_path_a.entries()])
			: null)
	/**
	 * @returns {Map<string, string[]>}
	 * @private
	 */
	function circular__package_name_M_dependency_path_a_() {
		/**
		 * @type {Map<string, string[]>}
		 */
		const package_name_M_circular__dependency_path_a = new Map()
		const package_name_a = keys(package_name_R_dependency_a)
		for (let i = 0; i < package_name_a.length; i++) {
			const package_name = package_name_a[i]
			const circular__dependency_path_a =
				circular__dependency_path_a_([package_name])
			if (circular__dependency_path_a) {
				package_name_M_circular__dependency_path_a.set(
					package_name,
					circular__dependency_path_a)
			}
		}
		return package_name_M_circular__dependency_path_a
		/**
		 * @param {string[]}[dependency_path_a]
		 * @private
		 */
		function circular__dependency_path_a_(
			dependency_path_a
		) {
			const package_name = last_(dependency_path_a)
			const dependency_a = package_name_R_dependency_a[package_name] || []
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
	async function package_name_R_dependency_a_() {
		const package_name_R_dependency_a = {}
		let current__package_name
		const pnpm_recursive_list =
			spawn(
				'pnpm', ['recursive', 'list'],
				{
					stdio: ['pipe', 'pipe', process.stderr]
				})
		await Readable.toWeb(pnpm_recursive_list.stdout)
			.pipeThrough(new TransformStream())
			.pipeThrough(line__transform_stream_())
			.pipeTo(new WritableStream({
				write(line) {
					const word_a = line.split(' ')
					if (word_a.length !== 2) return
					const package_name_version_word = word_a[0]
					const package_name_version_match =
						/^(@?.*)@((\d\.?)+)$/.exec(package_name_version_word)
					if (package_name_version_match) {
						current__package_name = package_name_version_match[1]
						package_name_R_dependency_a[current__package_name] = []
					} else if (current__package_name) {
						package_name_R_dependency_a[current__package_name].push(word_a[0])
					}
				}
			}))
		return package_name_R_dependency_a
	}
}
