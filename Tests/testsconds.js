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
t.compileTest("?(==(3, 7), $(8))", "if(3 === 7){console.log(8);};", 8);
t.compileTest("if(==(3, 7), $(8), $(4))", "if(3 === 7){console.log(8);} else{console.log(4);};", 9);
t.compileTest("ifs(true, return(1, 2), ==(3, 3), $(4))", "if(true){return [1, 2];};if(3 === 3){console.log(4);};", 10);
t.compileTest("switch(b, 4, $(3), 5, $(4), true, $(1, 2))", "switch(b){case 4: console.log(3);break;case 5: console.log(4);break;case true: console.log(1, 2);break;};", 11);
t.compileTest("ife(==(3, 3), return(3), !=(3, true), $(1, 2, 3, 4), return(list(1, 2, 3)))", "if(3 === 3){return 3;};else if(3 !== true){console.log(1, 2, 3, 4);};else{return [1, 2, 3];};", 12);
t.compileTest("?(true, ?(3, $(1, 2, 3)))", "if(true){if(3){console.log(1, 2, 3);};};", 13);
t.compileTest("ife(>(len(lst), 2), put(lst, true),==(len(lst), 0), append(lst, list(2)),!=(len(lst), 0), append(lst, 3),$(`all false`))", "", 15);