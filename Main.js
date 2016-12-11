#!/usr/bin/env node

var repl = require("./src/repl.js");
var userArgs = process.argv.slice(2);

if(userArgs.length === 0) repl.Repl();
