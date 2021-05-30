import semver from 'semver'
import ora from 'ora'
import detect_indent from 'detect-indent'
import { flatten } from '@ctx-core/array'
import { _queue } from '@ctx-core/queue'
import type { monorepo_thread_opts_T } from './monorepo_thread_opts_T'
import { projects_ } from './projects_'
import { readFile } from './readFile'
import { writeFile } from './writeFile'
import { exec } from './exec'
import type { project_T } from './project_T'
import { package_name_h_project_ } from './package_name_h_project_'
import { stdout_h_package_name_ } from './stdout_h_package_name_'
const { valid, coerce, compare } = semver
export async function monorepo_npm_check_updates(opts:monorepo_thread_opts_T = {}) {
	const package_name_h_latest_version_promise = {} as Record<string, Promise<string>>
	const package_name_h_already_warned = {} as Record<string, boolean>
	const queue = _queue(opts.threads || 20)
	const projects = await projects_()
	const package_name_h_project = package_name_h_project_(projects)
	let current_count = 0
	const package_name_a =
		opts.package_name
		? flatten<string>([opts.package_name] as string[]|string[][])
		: Object.keys(package_name_h_project)
	const stdout_a_async_a = projects.map((project:project_T)=>
		_project_stdout_async(project)
	) as Promise<string>[]
	if (!opts.package_name) {
		package_name_a.push('.')
		stdout_a_async_a.push(_stdout_async('.'))
	}
	const total_count = stdout_a_async_a.length
	const spinner = ora(_ora_message(current_count, total_count)).start()
	const stdout_a = await Promise.all(stdout_a_async_a)
	spinner.stop()
	return stdout_h_package_name_(package_name_a, stdout_a)
	async function _stdout_async(location = '.') {
		const package_json_path = `${location}/package.json`
		const pkg_json = (await readFile(package_json_path)).toString()
		const pkg = JSON.parse(pkg_json)
		const { dependencies, peerDependencies, devDependencies, noUpdate } = pkg
		const update_a2 = [] as string[][]
		update_a2.push(await update_dependencies(dependencies, noUpdate))
		update_a2.push(await update_dependencies(devDependencies, noUpdate))
		update_a2.push(await update_dependencies(peerDependencies, noUpdate))
		const update_a = flatten<string>(update_a2)
		if (update_a.length) {
			const indent = detect_indent(pkg_json).indent || '\t'
			await writeFile(package_json_path, JSON.stringify(pkg, null, indent))
		}
		current_count += 1
		spinner.text = _ora_message(current_count, total_count)
		return update_a.join('\n')
	}
	async function _project_stdout_async(project:project_T):Promise<string> {
		const { package_dir } = project
		return _stdout_async(package_dir)
	}
	async function update_dependencies(dependencies:Record<string, string>, noUpdate = [] as string[]) {
		noUpdate = noUpdate || []
		const update_a:string[] = []
		for (let package_name in dependencies) {
			if (~noUpdate.indexOf(package_name)) continue
			const in_version = dependencies[package_name] as string
			const has_carrot = in_version.slice(0, 1) === '^'
			if (~in_version.indexOf('workspace:')) continue
			if (!valid(coerce(in_version))) continue
			if (package_name_h_latest_version_promise[package_name] == null) {
				const promise = queue.add(async ()=>{
					const out_latest_version = (
						await exec(
							`
							npm show ${package_name}@latest | \
							sed -r "s/\x1B\\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]//g" | \
							grep "^latest\:" | \
							grep \\: | \
							cut -f2 -d: | \
							xargs echo`
						)
					).stdout.trim()
					return out_latest_version
				}) as Promise<string>
				package_name_h_latest_version_promise[package_name] = promise
			}
			const latest_stripped_version = await package_name_h_latest_version_promise[package_name]
			if (!latest_stripped_version && !package_name_h_already_warned[package_name]) {
				package_name_h_already_warned[package_name] = true
				console.warn(
					`WARN: Unable to parse ${package_name} from npm registry`
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
				push_update_a(update_a, package_name, in_version, latest_version)
				dependencies[package_name] = latest_version
			}
		}
		return update_a as string[]
	}
	function _ora_message(current_count:number, total_count:number) {
		return `Checking for updates...${current_count} of ${total_count}`
	}
	function push_update_a(update_a:string[], package_name:string, version:string, latest_version:string) {
		update_a.push(`${package_name}: ${version} -> ${latest_version}`)
	}
}
