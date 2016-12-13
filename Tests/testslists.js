//list tests

var t = require("./core.js");
/*Begin Tests*/

t.compileTest("list()", "[]", 1);
t.compileTest("list(1)", "[1]", 2);
t.compileTest("list(1, 2)", "[1, 2]", 3);
t.compileTest("list(1, 2, 3, 4, list(1))", "[1, 2, 3, 4, [1]]", 4);
t.compileTest("list(+(1, 5))", "[1 + 5]", 5);
t.compileTest("list(**(1, 5))", "[Math.pow(1, 5)]", 6);
t.compileTest("list(@(arg, *(arg, arg)))", "[function(arg){return arg * arg}]", 7);
t.compileTest("list(true, false)", "[true, false]", 8);