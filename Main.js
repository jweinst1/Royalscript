#!/usr/bin/env node
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

var prs = require("./src/RoyalParse.js");

rl.setPrompt('Royal> ');
rl.prompt();

rl.on('line', function(line) {
    switch(line.trim()) {
        case 'hello':
            break;
        case 'close':
            process.exit(0);
        default:
            console.log(prs.Parse(line));
            break;
    }
    rl.prompt();
});

//determines if input to interpreter is balanced, for multiple line input
function isBalanced(code){
    var s = 0
    var e = 0
    for (var i =code.length - 1; i >= 0; i--) {
       if(code[i] === "(") {
           s += 1
       }
       else if(code[i] === ")") {
           e += 1
       }
    };
    return e === s
}