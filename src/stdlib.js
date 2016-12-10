//ROYAL SCRIPT STANDARD LIB

//recursively calls sublists of arguments from the lib to unnest the AST
var callLib = function(lib, first, second){
	if(typeof second === 'object'){
		if(first in lib) return lib[first](second);
		//if not in lib, assumes user defined function
		else return first + "(" + lib[",infix"](", ", second) + ")";
	}
	else {
		return first;
	}
};

exports.callLib = callLib;

//util function that unnests only 2 arguments from an AST node, otherwise throws error
var get2Args = function(lib, args){
	switch(args.length){
		case 2:
		   if(typeof args[0] === 'string' && typeof args[1] === 'string') return [args[0], args[1]]; 
		   else throw "Argument Error: Got improper arguments but expected 2.";
		   break;
		case 3:
		   if(typeof args[1] === 'object'){
		   	   return [callLib(lib, args[0], args[1]), args[2]];
		   }
		   else if(typeof args[2] === 'object'){
		   	   return [args[0], callLib(lib, args[1], args[2])];
		   }
		   else throw "Argument Error: Got improper arguments but expected 2.";
		   break;
		case 4:
		   if(typeof args[1] === 'object' && typeof args[3] === 'object'){
		   	   return [callLib(lib, args[0], args[1]), callLib(lib, args[2], args[3])];
		   }
		   else throw "Argument Error: Got improper arguments but expected 2.";
		   break;
		default:
		   throw "Argument Error: Got improper arguments but expected 2.";
	}
};

exports.get2Args = get2Args;
//same as get2args but only unnests up to a single argument from the AST.
var get1Args = function(lib, args){
	switch(args.length){
		case 1:
		   return args[0];
		   break;
		case 2:
		   if(typeof args[1] === 'object') return callLib(lib, args[0], args[1]);
		   else throw "Argument Error: Got improper arguments but expected 1.";
		   break;
		default:
		   throw "Argument Error: Got improper arguments but expected 1.";
	}
};

exports.get1Args = get1Args;

//special switch function that allows only 3 arguments and unnests them from the AST, throws an error
var get3Args = function(lib, args){
	switch(args.length){
		case 3:
		    if(typeof args[0] === 'string' && typeof args[1] === 'string' && typeof args[2] === 'string') return[args[0], args[1], args[2]];
		    else throw "Argument Error: Got improper arguments but expected 3."
		    break;
		case 4:
		   if(typeof args[1] === 'object' && typeof args[3] === 'string'){
		   	  return [callLib(lib, args[0], args[1]), args[2], args[3]];
		   }
		   else if(typeof args[2] === 'object'){
		   	  return [args[0], callLib(lib, args[1], args[2]), args[3]];
		   }
		   else if(typeof args[3] === 'object'){
		   	  return [args[0], args[1], callLib(lib, args[2], args[3])];
		   }
		   else throw "Argument Error: Got improper arguments but expected 3.";
		   break;
		case 5:
		   if(typeof args[1] === 'object' && typeof args[3] === 'object'){
		   	  return [callLib(lib, args[0], args[1]), callLib(lib, args[2], args[3]), args[4]];
		   }
		   else if(typeof args[2] === 'object' && typeof args[4] === 'object'){
		   	  return [args[0], callLib(lib, args[1], args[2]), callLib(lib, args[3], args[4])];
		   }
		   else throw "Argument Error: Got improper arguments but expected 3.";
		   break;
		case 6:
		   if(typeof args[1] === 'object' && typeof args[3] === 'object' && typeof args[5] === 'object') return [callLib(lib, args[0], args[1]), callLib(lib, args[2], args[3]), callLib(lib, args[4], args[5])];
		   else throw "Argument Error: Got improper arguments but expected 3.";
		default:
		   throw "Argument Error: Got improper arguments but expected 3.";
	}
};

exports.get3Args = get3Args;


//standard library object
//functions starting with , are private and cannot be called in the front-end
var STD = {
	",1arg":get1Args,
	",2arg":get2Args,
	",3arg":get3Args,
	//Comma join util cannot be directly called
	",":function(args){
		if(args.length === 0) return "";
		var str = callLib(this, args[0], args[1]);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += ", " + callLib(this, args[i], args[i+1]);
			}
		};
		return str;
	},
	//private infix joiner function
	",infix":function(sep, args){
		var str = callLib(this, args[0], args[1]);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += sep + callLib(this, args[i], args[i+1]);
			}
		};
		return str;		
	},
	//MATH
	"+":function(args){
		var str = callLib(this, args[0], args[1]);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " + " + callLib(this, args[i], args[i+1]);
			}
		};
		return str;
	},
	"-":function(args){
		var str = callLib(this, args[0], args[1]);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " - " + callLib(this, args[i], args[i+1]);
			}
		};
		return str;
	},
	"*":function(args){
		var str = callLib(this, args[0], args[1]);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " * " + callLib(this, args[i], args[i+1]);
			}
		};
		return str;
	},
	"/":function(args){
		var str = callLib(this, args[0], args[1]);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " / " + callLib(this, args[i], args[i+1]);
			}
		};
		return str;
	},
	"%":function(args){
		var str = callLib(this, args[0], args[1]);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " % " + callLib(this, args[i], args[i+1]);
			}
		};
		return str;
	},
	//floor division, calls other function in lib
	"//":function(args) {
		return "Math.floor(" + this["/"](args, spacer) + ")";
	},
	"**":function(args){
		return "Math.pow(" + this[","](args) + ")";
	},
	//printing function
	"$":function(args){
		return "console.log(" + this[","](args) + ");";
	},
	//COMPARISONS
	//or oper
	"||":function(args){
		return this[",infix"](" || ", args);
	},
	//and oper
	"&&":function(args){
		return this[",infix"](" && ", args);
	},
	"==":function(args){
		var elems = get2Args(this, args);
		return elems[0] + " === " + elems[1];
	},
	"!=":function(args){
		var elems = get2Args(this, args);
		return elems[0] + " !== " + elems[1];
	},
	">":function(args){
		var elems = get2Args(this, args);
		return elems[0] + " > " + elems[1];
	},
	"<":function(args){
		var elems = get2Args(this, args);
		return elems[0] + " < " + elems[1];
	},
	"<=":function(args){
		var elems = get2Args(this, args);
		return elems[0] + " <= " + elems[1];
	},
	">=":function(args){
		var elems = get2Args(this, args);
		return elems[0] + " >= " + elems[1];
	},
	//ASSIGNMENT function
	"=":function(args){
		var elems = get2Args(this, args);
		return "var " + elems[0] + " = " + elems[1] + ";";
	},
	//collection initializers
	"list":function(args){
		return "[" + this[","](args) + "]";
	},
	//map init, keys must be static strings
	"map":function(args){
		if(args.length === 0) return "{}";
		var str = "{";
		var kmode = true;
		for (var i = 0; i < args.length; i++) {
			if(kmode){
				if(typeof args[i+1] === 'object') throw "Key Error: key must be static string";
				else {
					str += args[i] + ":";
					kmode = false;
				}
			}
			else {
				if(typeof args[i+1] === 'object'){
					str += callLib(this, args[i], args[i+1]) + ", ";
					i += 1;
					kmode = true;
				}
				else {
					str += args[i] + ", ";
					kmode = true;
				}
			}
		};
		if(!(kmode)) str += "null";
		return str + "}";
	},
	//allows a sequence of functions to be grouped together for control flow or other purposes.
	"do":function(args){
		return this[",infix"](" ", args);
	},
	//CONDITIONALS
	//singular Conditional function
	"?":function(args){
		var elems = get2Args(this, args);
		return "if(" + elems[0] + "){" + elems[1] + "};";
	},
	//if-else conditional function
	"if":function(args){
		var elems = get3Args(this, args);
		return "if(" + elems[0] + "){" + elems[1] + "} else{" + elems[2] + "};"
	},
	//FUNCTION DECLARATION
	"def":function(args){
		var len = args.length;
		if(typeof args[1] === 'object') throw "Name Error: function name must be literal";
		var str = "function " + args[0] + "(" + args[1];
		var params = true;
		for (var i = 2; i<len; i++) {
			if(params){
				if(typeof args[i+1] === 'object') throw "Name Error: function name must be literal";
				else if(typeof args[i+2]==='object'){
					str += ", " + args[i] + "){";
                    params = false;
				}
				else str += ", " + args[i];
			}
			else {
				if(!(typeof args[i] === 'object')){
					str += callLib(this, args[i], args[i+1]);
				}
			}
		};
		//needs return function
		return str + "};";
	},
	//general return function to facilitate returning one or more values. Return arrays if multiple
	"return":function(args){
		switch(args.length){
			case 0:
			   return "return;";
			case 1:
			   return "return " + args[0] + ";";
			case 2:
			   if(typeof args[1] === 'object') return "return " + callLib(this, args[0], args[1]) + ";";
			   else return "return [" + this[","](args) + "];";
			default:
			   return "return [" + this[","](args) + "];";
		}
	}
};

exports.STD = STD;

var obj = ['def', ['a', 'b', 'c', '=', ['yy', '7'], 'return', ['yy']]];
console.log(STD[obj[0]](obj[1]));