import child_process from 'child_process'
import { promisify } from 'util'
export const exec = (/** @type {import('./index.d.ts').exec} */ promisify(child_process.exec))
