import detect_indent from 'detect-indent'
import ora from 'ora'
import semver from 'semver'
import { flatten } from '@ctx-core/array'
import { queue_ } from '@ctx-core/queue'
import { exec } from './exec.js'
import { package_name_h_project_ } from './package_name_h_project_.js'
import { projects_ } from './projects_.js'
import { readFile } from './readFile.js'
import { stdout_h_package_name_ } from './stdout_h_package_name_.js'
import { writeFile } from './writeFile.js'
const { valid, coerce, compare } = semver
/** @type {import('./monorepo_npm_check_updates.d.ts').monorepo_npm_check_updates} */
export const monorepo_npm_check_updates = async (opts = {})=>{
	const package_name_h_latest_version_promise = {}
	const package_name_h_already_warned = {}
	const queue = queue_(opts.threads || 20)
	const projects = await projects_()
	const package_name_h_project = package_name_h_project_(projects)
	let current_count1 = 0
	const package_name_a = opts.package_name_a ? opts.package_name_a : Object.keys(package_name_h_project)
	const stdout_a_async_a = projects.map((project)=>project_stdout_async_(project)
	)
	if (!opts.package_name_a) {
		package_name_a.push('.')
		stdout_a_async_a.push(stdout_async_('.'))
	}
	const total_count1 = stdout_a_async_a.length
	const spinner = ora(ora_message_(current_count1, total_count1)).start()
	const stdout_a = await Promise.all(stdout_a_async_a)
	spinner.stop()
	return stdout_h_package_name_(package_name_a, stdout_a)
	async function stdout_async_(location = '.') {
		const package_json_path = `${location}/package.json`
		const pkg_json = (await readFile(package_json_path)).toString()
		const pkg = JSON.parse(pkg_json)
		const { dependencies, peerDependencies, devDependencies, noUpdate } = pkg
		const update_aa = []
		update_aa.push(await update_dependencies(dependencies, noUpdate))
		update_aa.push(await update_dependencies(devDependencies, noUpdate))
		update_aa.push(await update_dependencies(peerDependencies, noUpdate))
		const update_a = flatten(update_aa)
		if (update_a.length) {
			const indent = detect_indent(pkg_json).indent || '\t'
			await writeFile(package_json_path, JSON.stringify(pkg, null, indent))
		}
		current_count1 += 1
		spinner.text = ora_message_(current_count1, total_count1)
		return update_a.join('\n')
	}
	async function project_stdout_async_(project) {
		const { package_dir } = project
		return stdout_async_(package_dir)
	}
	async function update_dependencies(dependencies, noUpdate = []) {
		noUpdate = noUpdate || []
		const update_a = []
		for (let package_name in dependencies) {
			if (~noUpdate.indexOf(package_name)) continue
			const in_version = dependencies[package_name]
			const has_carrot = in_version.slice(0, 1) === '^'
			if (~in_version.indexOf('')) continue
			if (!valid(coerce(in_version))) continue
			if (package_name_h_latest_version_promise[package_name] == null) {
				const promise = queue.add(async ()=>{
					const out_latest_version = (await exec(`
							npm show ${package_name}@latest | \
							sed -r "s/\x1B\\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]//g" | \
							grep "^latest\:" | \
							grep \\: | \
							cut -f2 -d: | \
							xargs echo`)).stdout.trim()
					return out_latest_version
				})
				package_name_h_latest_version_promise[package_name] = promise
			}
			const latest_stripped_version = await package_name_h_latest_version_promise[package_name]
			if (!latest_stripped_version && !package_name_h_already_warned[package_name]) {
				package_name_h_already_warned[package_name] = true
				console.warn(`WARN: Unable to parse ${package_name} from npm registry`)
			}
			if (latest_stripped_version && compare(coerce(latest_stripped_version) || '', coerce(in_version) || '') > 0) {
				const latest_version = `${has_carrot ? '^' : ''}${latest_stripped_version}`
				push_update_a(update_a, package_name, in_version, latest_version)
				dependencies[package_name] = latest_version
			}
		}
		return update_a
	}
	function ora_message_(current_count, total_count) {
		return `Checking for updates...${current_count} of ${total_count}`
	}
	function push_update_a(update_a, package_name, version, latest_version) {
		update_a.push(`${package_name}: ${version} -> ${latest_version}`)
	}
}
