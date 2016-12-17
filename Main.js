#!/usr/bin/env node

var cmp = require("./src/compiler.js");
var fs = require('fs');
var userArgs = process.argv.slice(2);



//reads string from file
fs.readFile(userArgs[1], 'utf-8', function (err, data) {
    if (err) throw err;
    var transcompiled = cmp.Compile(data);
    if(userArgs[0] === '-j') console.log(transcompiled);
    else if(userArgs[0] === '-e')console.log(eval(transcompiled));
    else throw "Error mode flag not recognized";
});


//exports main compiler function.
exports.Compile = cmp.Compile;