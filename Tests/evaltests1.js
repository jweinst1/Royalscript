//eval tests for RoyalScript

var t = require("./core.js");
/*Begin Tests*/

t.evalTest("+(5, 4)", "9", 1);
t.evalTest("+(5, -(1, 1))", "5", 2);
t.evalTest("=(r, 4), +(r, 0)", "4", 3);
t.evalTest("list(1, 2, 3)", "[1,2,3]", 4);

t.evalTest("=(e, 1), loop(>(e, 1), do($(e), =(e, -(e, 1)))), +(e, 0)", "1", 5);
t.evalTest("~(`h`, `.`)", "true", 6);
t.evalTest("get(range(0, 30), 3)", "3", 7);
//long range test
t.evalTest("get(range(0, 5000), 3)", "3", 8);
//use do to display list for eval
t.evalTest("=(e, list()), append(e, 4), do(e)", "[4]", 9);
t.evalTest("rep(list(1, true))", "[1,true]", 10);
t.evalTest("=(aa, range(0, 10)), put(aa, args(1, 2, 3)), do(aa)", "[1,2,3,0,1,2,3,4,5,6,7,8,9]", 11);
t.evalTest("=(f, @(a, +(a, 3))), f(3)", "6", 12);
t.evalTest("len(list(1, 2, 3, 4))", "4", 13);
t.evalTest("for(range(0, 10), !@(i, $(i)))", undefined, 14);
t.evalTest("=(w, 5), for(range(0, 10), !@(i, $(+(w, i))))", undefined, 15);
t.evalTest("def(soom, args(a, b), =(a, -(a, b)), return(a, b, b)), soom(1, 7)", "[-6,7,7]", 16);
t.evalTest("find(\n\nlist(3, 7, 8), 7)", "1", 17);

