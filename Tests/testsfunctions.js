//function unit tests

var t = require("./core.js");
/*Begin Tests*/

t.compileTest("@(a, +(a, 4))", "function(a){return a + 4}", 1);
t.compileTest("@(a, -(a, 4))", "function(a){return a - 4}", 2);
t.compileTest("@(a, do(+(a, 4)))", "function(a){return a + 4}", 3);
t.compileTest("do(+(1, 3), =(e, 5))", "1 + 3 var e = 5;", 4);
t.compileTest("@@(a, b, //(a, b))", "function(a,b){return Math.floor(a / b)}", 5);
t.compileTest("@@(a, b, ==(a, b))", "function(a,b){return a === b}", 6);
t.compileTest("@@(a, b, &&(==(a, b), !=(b, 3)))", "function(a,b){return a === b && b !== 3}", 7);
//closure test
t.compileTest("@(a, @(b, +(a, b)))", "function(a){return function(b){return a + b}}", 8);
t.compileTest("@(a, @(b, ==(a, b)))", "function(a){return function(b){return a === b}}", 9);
