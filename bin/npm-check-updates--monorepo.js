#!/usr/bin/env node
'use strict'
require = require('esm')(module)
const { monorepo_npm_check_updates_cli } = require('../dist')
monorepo_npm_check_updates_cli().then()
