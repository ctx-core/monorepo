import detect_indent from 'detect-indent'
import ora from 'ora'
import { values } from '@ctx-core/object'
import { queue_ } from '@ctx-core/queue'
import { exec } from '@ctx-core/child_process'
import semver from 'semver'
import { package_name_R_project_ } from '../package_name_R_project_/index.js'
import { project_a_ } from '../project_a_/index.js'
import { readFile } from '../readFile/index.js'
import { writeFile } from '../writeFile/index.js'
const {
	coerce,
	compare
} = semver
/**
 * @param {import('../_types').monorepo_thread_params_T}[params]
 * @returns {Promise<Record<string, string>>}
 */
export async function monorepo_npm__version__sync(
	params = {}
) {
	const queue = queue_(params.threads || 20)
	const warn_msg_a = []
	const projects = await project_a_()
	const package_name_R_project =
		package_name_R_project_(projects)
	let current_count = 0
	const project_a =
		params.package_name_a
		? params.package_name_a.map(package_name =>
			package_name_R_project[package_name])
		: values(package_name_R_project)
	const stdout_a_async_a =
		projects.map(
			project =>
				project_stdout_async_(project))
	const total_count = stdout_a_async_a.length
	const spinner = ora(ora_message_()).start()
	await Promise.all(stdout_a_async_a)
	spinner.stop()
	for (const warn_msg of warn_msg_a) {
		console.warn(warn_msg)
	}
	/**
	 * @param {project_T}project
	 * @return {Promise<string>}
	 * @private
	 */
	async function project_stdout_async_(project) {
		const package_json_path = `${project.package_dir}/package.json`
		queue.add(async () => {
			const pkg_json = await readFile(package_json_path)
				.then($ => $.toString())
			const pkg = JSON.parse(pkg_json)
			const version = await exec(`
				npm show ${project.package_name}@latest | \
				sed -r "s/\x1B\\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]//g" | \
				grep "^latest\:" | \
				grep \\: | \
				cut -f2 -d: | \
				xargs echo
			`).then($ => $.stdout.trim())
			if (
				version
				&& pkg.version
				&& compare(coerce(version), coerce(pkg.version)) > 0
			) {
				pkg.version = version
				const indent = detect_indent(pkg_json).indent || '\t'
				await writeFile(package_json_path, JSON.stringify(pkg, null, indent))
			}
			current_count += 1
			spinner.text = ora_message_()
		})
	}
	/**
	 * @return {string}
	 * @private
	 */
	function ora_message_() {
		return `Checking for updates...${current_count} of ${total_count}`
	}
}
