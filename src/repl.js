#!/usr/bin/env node


//determines if input to interpreter is balanced, for multiple line input
var Balancer = function(){
    this["("] = 0;
    this[")"] = 0;
    this.string = "";
    this.isBalanced = function(code){
      for (var i = code.length - 1; i >= 0; i--) {
          if(code[i] in this) this[code[i]] += 1;
        }
        if(this["("] - this[")"] < 0){
          throw "Syntax Error: Too many )";
        }
        else if(this["("] - this[")"] > 0){
          this.string += code;
          return false;
        }
        else {
          return true;
        }
    };
};

exports.Balancer = Balancer;

var Repl = function(){
    var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

    var prs = require("./RoyalParse.js");

    rl.setPrompt('Royal> ');
    rl.prompt();

    rl.on('line', function(line) {
        switch(line.trim()) {
            case 'exit()':
                process.exit(0);
            default:
                console.log(prs.Parse(line));
                break;
        }
        rl.prompt();
    });

}

exports.Repl = Repl;
