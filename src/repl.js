#!/usr/bin/env node


//determines if input to interpreter is balanced, for multiple line input
var Balancer = function(){
    this["("] = 0;
    this[")"] = 0;
    this.string = "";
    this.isBalanced = function(code){
      this.string += code;
      for (var i = code.length - 1; i >= 0; i--) {
          if(code[i] in this) this[code[i]] += 1;
        }
        if(this["("] - this[")"] < 0){
          throw "Syntax Error: Too many )";
        }
        else if(this["("] - this[")"] > 0){
          return false;
        }
        else {
          var giveback = this.string;
          this.string = "";
          return giveback;
        }
    };
};

exports.Balancer = Balancer;

var Repl = function(){
    var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);


    var exe = require("./exec.js");
    var cmp = require("./compiler.js");
    var bal = new Balancer();
    var execObj = new exe.Executor();
    var unbal = false;

    rl.setPrompt('Royal> ');
    rl.prompt();
    
      rl.on('line', function(line) {
        line = line.trim();
        try{
          switch(line) {
            case 'exit()':
                process.exit(0);
            case 'help()':
                process.exit(0);
            default:
                if(unbal){
                   var result = bal.isBalanced(line);
                   if(result) {
                    unbal = false;
                    console.log(eval(cmp.Compile(result)));
                    r.setPrompt('Royal> ');
                   }
                   else break;
                }
                else {
                  if(bal.isBalanced(line)){
                    console.log(eval(cmp.Compile(line)));
                  }
                  else {
                    unbal = true;
                    rl.setPrompt('...> ');
                  }
                }
                break;
              }
              rl.prompt();
            }
            catch(err){
              console.log(err);
              rl.prompt();
            }
        
      });
}

exports.Repl = Repl;
