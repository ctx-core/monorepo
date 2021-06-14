#!/usr/bin/env node
require = require('esm')(module)
require('../src').run_parallel_workspaces_cli().then()
