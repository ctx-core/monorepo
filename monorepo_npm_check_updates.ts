import semver from 'semver'
const { valid, coerce, compare } = semver
import { _queue } from '@ctx-core/queue'
import { flatten } from '@ctx-core/array'
import detect_indent from 'detect-indent'
import { monorepo_thread_opts_type } from './monorepo_thread_opts_type'
import { _workspaces } from './_workspaces'
import { _promise_a1 } from './_promise_a1'
import { readFile } from './readFile'
import { writeFile } from './writeFile'
import { exec } from './exec'
import { _workspace_name_h0_stdout_h1 } from './_workspace_name_h0_stdout_h1'
export async function monorepo_npm_check_updates(opts:monorepo_thread_opts_type = {}) {
	const package_name_h_latest_version = {}
	const package_name_h_already_warned = {}
	const queue = _queue(opts.threads || 20)
	const workspaces = await _workspaces()
	const workspace_name_a1 =
		opts.workspace_name
		? flatten([opts.workspace_name])
		: Object.keys(workspaces)
	const promise_a1 = _promise_a1(workspace_name_a1, _workspace_promise)
	if (!opts.workspace_name) {
		workspace_name_a1.push('.')
		promise_a1.push(_promise('.'))
	}
	const stdout_a1 = await Promise.all(promise_a1)
	return _workspace_name_h0_stdout_h1(workspace_name_a1, stdout_a1)
	async function _promise(location = '.') {
		const package_json_path = `${location}/package.json`
		const pkg_json = (await readFile(package_json_path)).toString()
		const pkg = JSON.parse(pkg_json)
		const { dependencies, peerDependencies, devDependencies, noUpdate } = pkg
		const update_a2 = []
		update_a2.push(await update_dependencies(dependencies, noUpdate))
		update_a2.push(await update_dependencies(devDependencies, noUpdate))
		update_a2.push(await update_dependencies(peerDependencies, noUpdate))
		const update_a1 = flatten(update_a2)
		if (update_a1.length) {
			const indent = detect_indent(pkg_json).indent || '\t'
			await writeFile(package_json_path, JSON.stringify(pkg, null, indent))
		}
		return update_a1.join('\n')
	}
	async function _workspace_promise(workspace_name) {
		const workspace = workspaces[workspace_name]
		const { location } = workspace
		return _promise(location)
	}
	async function update_dependencies(dependencies, noUpdate = []) {
		noUpdate = noUpdate || []
		const update_a1 = []
		for (let package_name in dependencies) {
			if (~noUpdate.indexOf(package_name)) continue
			const dependency_workspace = workspaces[package_name]
			const version = dependencies[package_name]
			const has_carrot = version.slice(0, 1) === '^'
			if (dependency_workspace) {
				const { location } = dependency_workspace
				const pkg = JSON.parse(
					(await readFile(`${location}/package.json`)).toString()
				)
				const latest_version =
					`${version.slice(0, 1) === '^' ? '^' : ''}${pkg.version}`
				package_name_h_latest_version[package_name] = pkg.version
				if (compare(coerce(latest_version), coerce(version)) > 0) {
					push_update_a1(update_a1, package_name, version, latest_version)
					dependencies[package_name] = latest_version
				}
			} else {
				if (!valid(coerce(dependencies[package_name]))) continue
				if (package_name_h_latest_version[package_name] == null) {
					const promise = queue.add(async ()=>
						(
							await exec(
								`npm show ${package_name}@latest | grep latest | grep \\: | cut -f2 -d: | xargs echo`
							)
						).stdout.trim()
					)
					package_name_h_latest_version[package_name] = promise
				}
				if (package_name_h_latest_version[package_name]?.then) {
					package_name_h_latest_version[package_name] =
						(await package_name_h_latest_version[package_name])
						|| ''
				}
				const latest_stripped_version = package_name_h_latest_version[package_name]
				if (!latest_stripped_version && !package_name_h_already_warned[package_name]) {
					package_name_h_already_warned[package_name] = true
					console.warn(
						`WARN: Unable to parse ${package_name} from npm registry`
					)
				}
				if (
					latest_stripped_version
					&& compare(
					coerce(latest_stripped_version),
					coerce(version)
					) > 0
				) {
					const latest_version = `${has_carrot ? '^' : ''}${latest_stripped_version}`
					push_update_a1(update_a1, package_name, version, latest_version)
					dependencies[package_name] = latest_version
				}
			}
		}
		return update_a1
	}
	function push_update_a1(update_a1, package_name, version, latest_version) {
		update_a1.push(`${package_name}: ${version} -> ${latest_version}`)
	}
}
