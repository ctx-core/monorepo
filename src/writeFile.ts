import { promisify } from 'util'
import fs from 'fs'
export const writeFile = promisify(fs.writeFile)
