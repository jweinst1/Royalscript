//main compiler file for RoyalScript
//browser standalone is built from here

var prs = require("./RoyalParse.js");
var cmp = require("./stdlib.js");

var Compile = function(code){
	//replaces royal string closers with javascript quotes
	return cmp.genCode(prs.Parse(code)).replace(/`/g, '"');
};

exports.Compile = Compile;

