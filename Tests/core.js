//Testing Framework for RoyalScript

var cmp = require("../src/compiler.js");

var compileTest = function(code, expected, n){
	try {
		var result = cmp.Compile(code);
		if (result === expected) {console.log("Test " + n +" PASSED;")} else{console.log("Test " + n + " FAILED, result= " + result + ", expected= " + expected)};
	}
	catch(err){
		console.log("Test " + n + "FAILED ERROR:" + err + ";");
	}
};

exports.compileTest = compileTest;



var evalwOutTest = function(code, expected, output, n){
	function assist(){
		var OUT = "";
		console.log = function(message){
			OUT += message;
		};
		try {
			var result = eval(cmp.Compile(code));
			var rpass = (expected === result);
			var opass = (OUT === output);
			if(rpass && opass) return "Test " + n +" PASSED;";
			else return "Test " + n + " FAILED, result= " + result + ", OUT= " + OUT + ";";
		}
		catch(err){
			return "Test " + n + "FAILED ERROR:" + err + ";";
		}
	}
	console.log(assist());
};

exports.evalwOutTest = evalwOutTest;

var evalTest = function(code, expected, n){
	try {
		var result = JSON.stringify(eval(cmp.Compile(code)));
		if (result === expected) {console.log("Test " + n +" PASSED;")} else{console.log("Test " + n + " FAILED, result= " + result + ", expected= " + expected)};
	}
	catch(err){
		console.log("Test " + n + "FAILED ERROR:" + err + ";");
	}
};

exports.evalTest = evalTest;