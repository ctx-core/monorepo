#!/usr/bin/env node
import { run_parallel_workspaces_cli } from '../index.js'
run_parallel_workspaces_cli()
	.then(()=>process.exit(0))
	.catch(()=>process.exit(1))
