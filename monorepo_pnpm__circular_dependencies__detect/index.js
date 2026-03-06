/// <reference types="../types/index.d.ts" />
import { last_ } from 'ctx-core/array'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { project_a_ } from '../project_a/index.js'
const { keys } = Object
/**
 * @returns {Promise<Record<string, string>>}
 */
export async function monorepo_pnpm__circular_dependencies__detect() {
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
		const projects = await project_a_()
		for (const project of projects) {
			const pkg = JSON.parse(await readFile(join(project.package_dir, 'package.json'), 'utf-8'))
			const deps = []
			for (const dep_name of Object.keys(pkg.dependencies || {})) {
				if (projects.some(p => p.package_name === dep_name)) {
					deps.push(dep_name)
				}
			}
			for (const dep_name of Object.keys(pkg.devDependencies || {})) {
				if (projects.some(p => p.package_name === dep_name)) {
					deps.push(dep_name)
				}
			}
			package_name_R_dependency_a[project.package_name] = deps
		}
		return package_name_R_dependency_a
	}
}
