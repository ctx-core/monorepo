#!/usr/bin/env node
'use strict'
import { monorepo_npm_check_updates_cli } from '../src/index.js'
await monorepo_npm_check_updates_cli()
process.exit()
