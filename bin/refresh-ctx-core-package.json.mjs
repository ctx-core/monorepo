#!/usr/bin/env node
import { refresh_ctx_core_package } from '../src/index.js'
refresh_ctx_core_package()
	.then(()=>process.exit(0))
	.catch(()=>process.exit(1))
