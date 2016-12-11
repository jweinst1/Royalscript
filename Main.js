#!/usr/bin/env node

var cmp = require("./src/compiler.js");
var fs = require('fs');
var userArgs = process.argv.slice(2);

//reads string from file
fs.readFile(userArgs[0], 'utf-8', function (err, data) {
    if (err) throw err;
    var transcompiled = cmp.Compile(data);
    console.log(eval(transcompiled));
});
