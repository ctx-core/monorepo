/// <reference types="../types/index.d.ts" />
import { line__transform_stream_ } from 'ctx-core/string'
import { spawn } from 'node:child_process'
import { Readable } from 'stream'
import { monorepo_npm__dependencies__update } from '../monorepo_npm__dependencies__update/index.js'
/**
 * @param {monorepo_thread_params_T}params
 * @returns {Promise<Record<string, string>>}
 */
export async function monorepo_pnpm__dependencies__update(params = {}) {
	const package_name_R_latest_version =
		await package_name_R_latest_version_()
	return monorepo_npm__dependencies__update({
		...params,
		package_name_R_latest_version
	})
	/**
	 * @returns {Promise<Record<string, string>>}
	 * @private
	 */
	async function package_name_R_latest_version_() {
		const package_name_R_latest_version = {}
		const pnpm_recursive_list =
			spawn(
				'pnpm', ['recursive', 'list'],
				{
					stdio: ['pipe', 'pipe', process.stderr]
				})
		await (/** @type {ReadableStream<Buffer>} */Readable.toWeb(pnpm_recursive_list.stdout))
			.pipeThrough(new TextDecoderStream())
			.pipeThrough(line__transform_stream_())
			.pipeTo(new WritableStream({
				write(line) {
					const word_a = line.split(' ')
					if (word_a.length !== 2) return
					const package_name_version_word = word_a[0]
					const package_name_version_match =
						/^(@?.*)@((\d\.?)+)$/.exec(package_name_version_word)
					if (!package_name_version_match) return
					const package_name = package_name_version_match[1]
					const version = package_name_version_match[2]
					if (!package_name || !version) return
					package_name_R_latest_version[package_name] = version
				}
			}))
		return package_name_R_latest_version
	}
}
