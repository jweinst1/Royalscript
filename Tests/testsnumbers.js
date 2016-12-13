//MATH and number tests for RoyalScript
//unit tests
var t = require("./core.js");
/*Begin Tests*/

t.compileTest("+(1, 2, 3)", "1 + 2 + 3", 1);
t.compileTest("-(1, 2, 3)", "1 - 2 - 3", 2);
t.compileTest("*(1, 2, 3)", "1 * 2 * 3", 3);
t.compileTest("/(1, 2, 3)", "1 / 2 / 3", 4);
t.compileTest("%(1, 2, 3)", "1 % 2 % 3", 5);