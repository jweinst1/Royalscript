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
t.compileTest("range(0, 20)", "(function(){for(var i=0,arr = [];i<20;i++) arr.push(i);return arr;})()", 9);
t.compileTest("range(0, +(1, 2))", "(function(){for(var i=0,arr = [];i<1 + 2;i++) arr.push(i);return arr;})()", 10);
t.compileTest("range(0, len(a))", "(function(){for(var i=0,arr = [];i<a.length;i++) arr.push(i);return arr;})()", 11);
t.compileTest("make(0, 10)", "(function(){for(var i=0,arr = [];i<10;i++) arr.push(0);return arr;})()", 12);
t.compileTest("make(@(a, list(a)), 10)", "(function(){for(var i=0,arr = [];i<10;i++) arr.push(function(a){return [a]});return arr;})()", 13);
//map and filter tests


