import semver from 'semver'
import ora from 'ora'
const { valid, coerce, compare } = semver
import { _queue } from '@ctx-core/queue'
import detect_indent from 'detect-indent'
import type { monorepo_thread_opts_type } from './monorepo_thread_opts_type'
import { _projects } from './_projects'
import { readFile } from './readFile'
import { writeFile } from './writeFile'
import { exec } from './exec'
import type { project_type } from './project_type'
import { _packageName_h_project } from './_package_name_h_project'
import { _stdout_h0_packageName_h1 } from './_stdout_h0_packageName_h1'
export async function monorepo_npm_check_updates(opts:monorepo_thread_opts_type = {}) {
	const packageName_h_latest_version_promise = {} as Record<string, Promise<string>>
	const packageName_h_already_warned = {} as Record<string, boolean>
	const queue = _queue(opts.threads || 20)
	const projects = await _projects()
	const packageName_h_project = _packageName_h_project(projects)
	let current_count = 0
	const packageName_a1 =
		opts.packageName
		? [opts.packageName].flat()
		: Object.keys(packageName_h_project)
	const promise_a1 = projects.map((project:project_type)=>
		_project_promise(project)
	) as Promise<string>[]
	if (!opts.packageName) {
		packageName_a1.push('.')
		promise_a1.push(_promise('.'))
	}
	const total_count = promise_a1.length
	const spinner = ora(_ora_message(current_count, total_count)).start()
	const stdout_a1 = await Promise.all(promise_a1)
	spinner.stop()
	const stdout_h0_packageName_h1 = _stdout_h0_packageName_h1(packageName_a1, stdout_a1)
	return stdout_h0_packageName_h1
	async function _promise(location = '.') {
		const package_json_path = `${location}/package.json`
		const pkg_json = (await readFile(package_json_path)).toString()
		const pkg = JSON.parse(pkg_json)
		const { dependencies, peerDependencies, devDependencies, noUpdate } = pkg
		const update_a2 = [] as string[][]
		update_a2.push(await update_dependencies(dependencies, noUpdate))
		update_a2.push(await update_dependencies(devDependencies, noUpdate))
		update_a2.push(await update_dependencies(peerDependencies, noUpdate))
		const update_a1 = update_a2.flat()
		if (update_a1.length) {
			const indent = detect_indent(pkg_json).indent || '\t'
			await writeFile(package_json_path, JSON.stringify(pkg, null, indent))
		}
		current_count += 1
		spinner.text = _ora_message(current_count, total_count)
		return update_a1.join('\n')
	}
	async function _project_promise(project:project_type) {
		const { projectFolder } = project
		return _promise(projectFolder) as Promise<string>
	}
	async function update_dependencies(dependencies:Record<string, string>, noUpdate = [] as string[]) {
		noUpdate = noUpdate || []
		const update_a1 = []
		for (let packageName in dependencies) {
			if (~noUpdate.indexOf(packageName)) continue
			const in_version = dependencies[packageName] as string
			const has_carrot = in_version.slice(0, 1) === '^'
			if (~in_version.indexOf('workspace:')) continue
			if (!valid(coerce(in_version))) continue
			if (packageName_h_latest_version_promise[packageName] == null) {
				const promise = queue.add(async ()=>{
					const out_latest_version = (
						await exec(
							`npm show ${packageName}@latest | grep latest | grep \\: | cut -f2 -d: | xargs echo`
						)
					).stdout.trim()
					return out_latest_version
				}) as Promise<string>
				packageName_h_latest_version_promise[packageName] = promise
			}
			const latest_stripped_version = await packageName_h_latest_version_promise[packageName]
			if (!latest_stripped_version && !packageName_h_already_warned[packageName]) {
				packageName_h_already_warned[packageName] = true
				console.warn(
					`WARN: Unable to parse ${packageName} from npm registry`
				)
			}
			if (
				latest_stripped_version
				&& compare(
				coerce(latest_stripped_version) || '',
				coerce(in_version) || ''
				) > 0
			) {
				const latest_version = `${has_carrot ? '^' : ''}${latest_stripped_version}`
				push_update_a1(update_a1, packageName, in_version, latest_version)
				dependencies[packageName] = latest_version
			}
		}
		return update_a1 as string[]
	}
	function _ora_message(current_count, total_count) {
		return `Checking for updates...${current_count} of ${total_count}`
	}
	function push_update_a1(update_a1, packageName, version, latest_version) {
		update_a1.push(`${packageName}: ${version} -> ${latest_version}`)
	}
}