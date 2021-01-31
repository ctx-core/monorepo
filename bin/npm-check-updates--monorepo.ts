#!/usr/bin/env node
require = require('esm')(module)
const { monorepo_npm_check_updates_cli } = require('../src')
monorepo_npm_check_updates_cli().then()
