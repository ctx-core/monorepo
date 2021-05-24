#!/usr/bin/env node
require = require('esm')(module)
require('../dist').refresh_ctx_core_package().then()
