#!/usr/bin/env node
'use strict'
import { monorepo_npm__dependencies__update__cli } from '../index.js'
monorepo_npm__dependencies__update__cli()
	.then(()=>{
		process.exit(0)
	})
	.catch(err=>{
		throw new Error(err, { cause: err })
		process.exit(1)
	})
