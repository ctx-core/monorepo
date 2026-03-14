/// <reference types="./index.d.ts" />
import { exec } from '@ctx-core/child_process'
import { queue_ } from 'ctx-core/queue'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import ora from 'ora'
import { project_a_ } from '../project_a/index.js'
/**
 * @param {monorepo_yalc__publish__all__params_T}[params]
 * @returns {Promise<void>}
 */
export async function monorepo_yalc__publish__all(
	params = {}
) {
	const push = params.push !== false
	const push_flag = push ? '--push' : ''
	const threads = params.threads || 20
	const queue = queue_(threads)
	const project_a = await project_a_()
	const spinner = ora('Publishing to yalc...').start()
	let current_count = 0
	const total_count = project_a.length
	const failed_a = []
	spinner.text = ora_message_()
	await Promise.all(
		project_a.map(project=>
			queue.add(async ()=>{
				const pkg_json_path = join(project.package_dir, 'package.json')
				const pkg = JSON.parse(
					await readFile(pkg_json_path, 'utf-8'))
				if (pkg.private) {
					current_count += 1
					spinner.text = ora_message_()
					return
				}
				try {
					await exec(
						`yalc publish --no-scripts ${push_flag}`.trim(),
						{ cwd: project.package_dir })
				} catch (err) {
					failed_a.push({
						name: project.package_name,
						error: err
					})
				}
				current_count += 1
				spinner.text = ora_message_()
			})))
	spinner.stop()
	if (failed_a.length) {
		for (const { name, error } of failed_a) {
			console.error(`FAILED: ${name}`)
			console.error(`  ${error.message || error}`)
		}
		process.exitCode = 1
	} else {
		console.info(
			`Published ${total_count - failed_a.length} packages to yalc${push ? ' (pushed)' : ''}`)
	}
	function ora_message_() {
		return `Publishing to yalc...${current_count} of ${total_count}`
	}
}
