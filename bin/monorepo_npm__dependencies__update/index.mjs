#!/usr/bin/env node
'use strict'
import { monorepo_npm__dependencies__update__cli } from '../../src/index.js'
monorepo_npm__dependencies__update__cli()
	.then(()=>process.exit(0))
	.catch(()=>process.exit(1))
