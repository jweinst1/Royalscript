//main compiler file for RoyalScript

var prs = require("./RoyalParse.js");
var cmp = require("./stdlib.js");

var Compile = function(code){
	return cmp.genCode(prs.Parse(code));
};

exports.Compile = Compile;

console.log(Compile("ifs(is(f, food), $(1, 2, 3), !=(x, 5), list(1, 2, 3))"));