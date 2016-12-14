//loop unit tests for royalscript

var t = require("./core.js");
/*Begin Tests*/

t.compileTest("loop(true, $(3))", "while(true){console.log(3);};", 1);
t.compileTest("loop(>(x, 1), =(x, -(x, 1)))", "while(x > 1){var x = x - 1;};", 2);
t.compileTest("loop(true, loop(false, $(4)))", "while(true){while(false){console.log(4);};};", 3);
t.compileTest("for(range(0, 5), @(a, $(a, a)))", "(function(){for(var i=0,arr = [];i<5;i++) arr.push(i);return arr;})().forEach(function(a){return console.log(a, a);});", 4);
t.compileTest("for(list(1, 2, 3), @(s, $(s, +(s, s))))", "[1, 2, 3].forEach(function(s){return console.log(s, s + s);});", 5);