//eval tests for RoyalScript

var t = require("./core.js");
/*Begin Tests*/

t.evalTest("+(5, 4)", "9", 1);
t.evalTest("+(5, -(1, 1))", "5", 2);
t.evalTest("=(r, 4), +(r, 0)", "4", 3);
t.evalTest("list(1, 2, 3)", "[1,2,3]", 4);
t.evalTest("=(e, 1), loop(>(e, 1), do($(e), =(e, -(e, 1)))), +(e, 0)", "1", 5);
