#!/usr/bin/env node
'use strict'
import { monorepo_npm__version__sync__cli } from '../index.js'
monorepo_npm__version__sync__cli()
	.then(()=>process.exit(0))
	.catch(()=>process.exit(1))
