#!/usr/bin/env node
require = require('esm')(module)
const { monorepo_npm_check_updates_cli } = require('../monorepo_npm_check_updates_cli')
monorepo_npm_check_updates_cli().then()
