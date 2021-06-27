#!/usr/bin/env node
require = require('esm')(module)
require('../dist').run_parallel_workspaces_cli().then()
