#!/usr/bin/env node
'use strict'
import { monorepo_npm_check_updates_cli } from '../../src/index.js'
monorepo_npm_check_updates_cli()
	.then(()=>process.exit(0))
	.catch(()=>process.exit(1))
