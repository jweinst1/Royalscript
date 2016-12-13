//struct unit tests

var t = require("./core.js");
/*Begin Tests*/

t.compileTest("struct(alphabet, a, b, c)", "function alphabet(a, b, c){this.a = a;this.b = b;this.c = c;};", 1);
t.compileTest("struct(fun, soup)", "function fun(soup){this.soup = soup;};", 2);
//test for empty struct
t.compileTest("struct(alphabet)", "function alphabet(){};", 3);
t.compileTest("new(a, 3, 4)", "new a(3,4)", 4);
t.compileTest("new(b)", "new b()", 5);
t.compileTest("new(a, +(3, 4), 4)", "new a(3 + 4,4)", 6);
t.compileTest("new(a, list(3, 4, 5), 4)", "new a([3, 4, 5],4)", 7);