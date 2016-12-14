//tests conditionals and logical for unit tests

var t = require("./core.js");
/*Begin Tests*/

t.compileTest("not(3)", "!(3)", 1);
t.compileTest("!=(3, 3)", "3 !== 3", 2);
t.compileTest("||(3, 4, 5)", "3 || 4 || 5", 3);
t.compileTest("&&(3, 4, 5)", "3 && 4 && 5", 4);
t.compileTest("same(4, 4)", "JSON.stringify(4) === JSON.stringify(4)", 5);
t.compileTest("same(list(), list(1))", "JSON.stringify([]) === JSON.stringify([1])", 6);
t.compileTest("?(not(false), $(8))", "if(!(false)){console.log(8);};", 7);