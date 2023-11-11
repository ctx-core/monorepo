#!/usr/bin/env node
'use strict'
import { monorepo_pnpm__circular_dependencies__detect__cli } from '../index.js'
monorepo_pnpm__circular_dependencies__detect__cli()
	.then(()=>{
		process.exit(0)
	})
	.catch(err=>{
		throw new Error(err, { cause: err })
		process.exit(1)
	})
