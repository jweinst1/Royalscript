//MATH and number tests for RoyalScript
//unit tests
var t = require("./core.js");
/*Begin Tests*/

t.compileTest("+(1, 2, 3)", "1 + 2 + 3", 1);
t.compileTest("-(1, 2, 3)", "1 - 2 - 3", 2);
t.compileTest("*(1, 2, 3)", "1 * 2 * 3", 3);
t.compileTest("/(1, 2, 3)", "1 / 2 / 3", 4);
t.compileTest("%(1, 2, 3)", "1 % 2 % 3", 5);
t.compileTest("+(1, -(2, 3))", "1 + 2 - 3", 6);
t.compileTest("%(1, -(2, 3))", "1 % 2 - 3", 7);
t.compileTest("+(1, //(2, 3))", "1 + Math.floor(2 / 3)", 8);
t.compileTest("//(1, //(2, 3))", "Math.floor(1 / Math.floor(2 / 3))", 9);
t.compileTest("**(1, //(2, 3))", "Math.pow(1, Math.floor(2 / 3))", 10);
t.compileTest("**(9, **(8, **(7, 8, 9, 10)))", "Math.pow(9, Math.pow(8, Math.pow(7, 8, 9, 10)))", 11);
t.compileTest("random(0, 10)", "Math.floor((Math.random() * 10) + 0)", 12);
t.compileTest("random(0, **(1, 2, 3))", "Math.floor((Math.random() * Math.pow(1, 2, 3)) + 0)", 13);
//newline, multistatement
t.compileTest("+(8, 6), -(5, 3)", "8 + 6\n5 - 3", 14);