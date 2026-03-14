#!/usr/bin/env node
'use strict'
import { monorepo_yalc__publish__all__cli } from '../index.js'
monorepo_yalc__publish__all__cli()
	.then(()=>{
		process.exit(0)
	})
	.catch(err=>{
		throw new Error(err, { cause: err })
		process.exit(1)
	})
