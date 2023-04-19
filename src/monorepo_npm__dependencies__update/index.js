import { import_meta_env_ } from '@ctx-core/env'
import { path__exists_ } from '@ctx-core/fs'
import { entries_gen_, keys } from '@ctx-core/object'
import { queue_ } from '@ctx-core/queue'
import { exec } from '@ctx-core/child_process'
import detect_indent from 'detect-indent'
import ora from 'ora'
import { join } from 'path'
import semver from 'semver'
import { package_name_R_project_ } from '../package_name_R_project_/index.js'
import { project_a_ } from '../project_a_/index.js'
import { readFile } from '../readFile/index.js'
import { package_name_R_stdout_ } from '../package_name_R_stdout_/index.js'
import { writeFile } from '../writeFile/index.js'
const {
	valid,
	coerce,
	compare
} = semver
/** @typedef {import('../_types').monorepo_npm__dependencies__update__params_T}monorepo_npm__dependencies__update__params_T */
/**
 * @param {monorepo_npm__dependencies__update__params_T}[params]
 * @returns {Promise<Record<string, string>>}
 */
export async function monorepo_npm__dependencies__update(
	params = {}
) {
	/** @type {Record<string, Promise<string>>} */
	const pkg_name_R_latest_version_promise =
		params.pkg_name_R_latest_version
		|| {}
	/** @type {Record<string, boolean>} */
	const pkg_name_R_already_warned = {}
	/** @type {queue_T<string>} */
	const queue = queue_(params.threads || 20)
	const warn_msg_a = []
	const projects = await project_a_()
	const package_name_R_project =
		package_name_R_project_(projects)
	let current_count = 0
	const package_name_a =
		params.package_name_a
			? params.package_name_a
			: keys(package_name_R_project)
	const stdout_a_async_a =
		projects.map(project=>
			project_stdout_async_(project))
	if (!params.package_name_a) {
		const cwd = import_meta_env_().CWD || process.cwd()
		package_name_a.push(
			await pkg_triple_(cwd)
				.then(([pkg])=>
					pkg?.name ?? cwd))
		stdout_a_async_a.push(stdout_async_(cwd))
	}
	const total_count = stdout_a_async_a.length
	const spinner = ora(ora_message_()).start()
	const stdout_a = await Promise.all(stdout_a_async_a)
	spinner.stop()
	for (const warn_msg of warn_msg_a) {
		console.warn(warn_msg)
	}
	return package_name_R_stdout_(package_name_a, stdout_a)
	/**
	 * @param {string}location
	 * @return {Promise<string>}
	 * @private
	 */
	async function stdout_async_(
		location = import_meta_env_().CWD || process.cwd()
	) {
		const [
			pkg,
			pkg_json,
			pkg_json_path
		] = await pkg_triple_()
		if (!pkg) {
			return `${pkg_json_path} does not exist`
		}
		const {
			dependencies,
			peerDependencies,
			devDependencies,
			noUpdate
		} = pkg
		/** @type {string[][]} */
		const update_a = await Promise.all([
			dependencies__update(dependencies, noUpdate),
			dependencies__update(devDependencies, noUpdate),
			dependencies__update(peerDependencies, noUpdate),
		])
			.then(update_aa=>
				update_aa.flat())
		if (update_a.length) {
			const indent = detect_indent(pkg_json).indent || '\t'
			await writeFile(
				pkg_json_path,
				JSON.stringify(pkg, null, indent))
		}
		current_count += 1
		spinner.text = ora_message_()
		return update_a.join('\n')
	}
	/**
	 * @param {string}[location]
	 * @returns {Promise<[object, string, string]>}
	 * @private
	 */
	async function pkg_triple_(
		location = import_meta_env_().CWD || process.cwd()
	) {
		const pkg_json_path = join(location, 'package.json')
		if (!await path__exists_(pkg_json_path)) {
			return [null, null, pkg_json_path]
		}
		const pkg_json =
			await readFile(pkg_json_path)
				.then($=>$.toString())
		return [JSON.parse(pkg_json), pkg_json, pkg_json_path]
	}
	/**
	 * @param {project_T}project
	 * @return {Promise<string>}
	 * @private
	 */
	async function project_stdout_async_(project) {
		return stdout_async_(project.package_dir)
	}
	/**
	 * @param {string[]}dependencies
	 * @param {string[]}noUpdate
	 * @return {Promise<string[]>}
	 */
	async function dependencies__update(
		dependencies,
		noUpdate = []
	) {
		noUpdate = noUpdate || []
		/** @type {string[]} */
		const update_a = []
		for (const [
			pkg_name,
			in_version
		] of entries_gen_(dependencies)) {
			const has_workspace = in_version.indexOf('') === 0
			const has_carrot = in_version.slice(0, 1) === '^'
			if (in_version === '') continue
			if (!valid(coerce(in_version, {}), {})) continue
			if (pkg_name_R_latest_version_promise[pkg_name] == null) {
				const promise = queue.add(async ()=>
					await exec(`
						npm show ${pkg_name}@latest | \
						sed -r "s/\x1B\\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]//g" | \
						grep "^latest\:" | \
						grep \\: | \
						cut -f2 -d: | \
						xargs echo`
					).then($=>$.stdout.trim()))
				pkg_name_R_latest_version_promise[pkg_name] = promise
			}
			const latest_stripped_version =
				await pkg_name_R_latest_version_promise[pkg_name]
			if (
				!latest_stripped_version
				&& !pkg_name_R_already_warned[pkg_name]
			) {
				pkg_name_R_already_warned[pkg_name] = true
				warn_msg_a.push(`WARN: Unable to parse ${pkg_name} from npm registry`)
			}
			if (
				latest_stripped_version
				&& compare(
					coerce(latest_stripped_version, {}) || '',
					coerce(in_version, {}) || '',
					{}
				) > 0
				&& (has_workspace || !~latest_stripped_version.indexOf(''))
			) {
				const latest_version = `${has_carrot ? '^' : ''}${latest_stripped_version}`
				if (~noUpdate.indexOf(pkg_name)) {
					warn_msg_a.push(`noUpdate: ${pkg_name}: ${latest_version}`)
				} else {
					update_a__push(update_a, pkg_name, in_version, latest_version)
					dependencies[pkg_name] = latest_version
				}
			}
		}
		return update_a
	}
	/**
	 * @return {string}
	 * @private
	 */
	function ora_message_() {
		return `Checking for updates...${current_count} of ${total_count}`
	}
	/**
	 * @param {string[]}update_a
	 * @param {string}package_name
	 * @param {string}version
	 * @param {string}latest_version
	 */
	function update_a__push(
		update_a,
		package_name,
		version,
		latest_version
	) {
		update_a.push(`${package_name}: ${version} -> ${latest_version}`)
	}
}
