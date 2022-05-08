import detect_indent from 'detect-indent'
import ora from 'ora'
import semver from 'semver'
import { entries_gen_, keys } from '@ctx-core/object'
import { queue_ } from '@ctx-core/queue'
import { exec } from './exec.js'
import { package_name_r_project_ } from './package_name_r_project_.js'
import { projects_ } from './projects_.js'
import { readFile } from './readFile.js'
import { package_name_r_stdout_ } from './package_name_r_stdout_.js'
import { writeFile } from './writeFile.js'
const { valid, coerce, compare } = semver
/** @type {import('./monorepo_npm_check_updates.d.ts').monorepo_npm_check_updates} */
export const monorepo_npm_check_updates = async (opts = {})=>{
	/** @type {Record<string, Promise<string>>} */
	const package_name_r_latest_version_promise = {}
	/** @type {Record<string, boolean>} */
	const package_name_r_already_warned = {}
	/** @type {queue_T<string>} */
	const queue = queue_(opts.threads || 20)
	const warn_msg_a = []
	const projects = await projects_()
	const package_name_r_project = package_name_r_project_(projects)
	let current_count = 0
	const package_name_a = opts.package_name_a ? opts.package_name_a : keys(package_name_r_project)
	const stdout_a_async_a = projects.map($=>project_stdout_async_($))
	if (!opts.package_name_a) {
		package_name_a.push('.')
		stdout_a_async_a.push(stdout_async_('.'))
	}
	const total_count = stdout_a_async_a.length
	const spinner = ora(ora_message_()).start()
	const stdout_a = await Promise.all(stdout_a_async_a)
	spinner.stop()
	for (const warn_msg of warn_msg_a) {
		console.warn(warn_msg)
	}
	return package_name_r_stdout_(package_name_a, stdout_a)
	/**
	 * @param {string}location
	 * @return {Promise<string>}
	 * @private
	 */
	async function stdout_async_(location = '.') {
		const package_json_path = `${location}/package.json`
		const pkg_json = (await readFile(package_json_path)).toString()
		const pkg = JSON.parse(pkg_json)
		const { dependencies, peerDependencies, devDependencies, noUpdate } = pkg
		/** @type {string[][]} */
		const update_aa = []
		update_aa.push(await update_dependencies(dependencies, noUpdate))
		update_aa.push(await update_dependencies(devDependencies, noUpdate))
		update_aa.push(await update_dependencies(peerDependencies, noUpdate))
		const update_a = update_aa.flat()
		if (update_a.length) {
			const indent = detect_indent(pkg_json).indent || '\t'
			await writeFile(package_json_path, JSON.stringify(pkg, null, indent))
		}
		current_count += 1
		spinner.text = ora_message_()
		return update_a.join('\n')
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
	async function update_dependencies(dependencies, noUpdate = []) {
		noUpdate = noUpdate || []
		/** @type {string[]} */
		const update_a = []
		for (const [package_name, in_version] of entries_gen_(dependencies)) {
			const has_workspace = in_version.indexOf('') === 0
			const has_carrot = in_version.slice(0, 1) === '^'
			if (in_version === '') continue
			if (!valid(coerce(in_version))) continue
			if (package_name_r_latest_version_promise[package_name] == null) {
				const promise = queue.add(async ()=>
					(await exec(`
							npm show ${package_name}@latest | \
							sed -r "s/\x1B\\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]//g" | \
							grep "^latest\:" | \
							grep \\: | \
							cut -f2 -d: | \
							xargs echo`)).stdout.trim())
				package_name_r_latest_version_promise[package_name] = promise
			}
			const latest_stripped_version = await package_name_r_latest_version_promise[package_name]
			if (!latest_stripped_version && !package_name_r_already_warned[package_name]) {
				package_name_r_already_warned[package_name] = true
				warn_msg_a.push(`WARN: Unable to parse ${package_name} from npm registry`)
			}
			if (
				latest_stripped_version
				&& compare(
					coerce(latest_stripped_version) || '', coerce(in_version) || ''
				) > 0
				&& (has_workspace || !~latest_stripped_version.indexOf(''))
			) {
				const latest_version = `${has_carrot ? '^' : ''}${latest_stripped_version}`
				if (~noUpdate.indexOf(package_name)) {
					warn_msg_a.push(`noUpdate: ${package_name}: ${latest_version}`)
				} else {
					push_update_a(update_a, package_name, in_version, latest_version)
					dependencies[package_name] = latest_version
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
	function push_update_a(update_a, package_name, version, latest_version) {
		update_a.push(`${package_name}: ${version} -> ${latest_version}`)
	}
}
