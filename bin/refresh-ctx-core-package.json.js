#!/usr/bin/env node
require = require('esm')(module)
require('../src').refresh_ctx_core_package().then()
