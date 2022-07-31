import child_process from 'child_process'
import { promisify } from 'util'
/** @type {*} */
let _exec
export function exec(...$a) {
	if (!_exec) _exec = promisify(child_process.exec)
  return _exec(...$a)
}
