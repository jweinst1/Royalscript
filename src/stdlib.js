//ROYAL SCRIPT STANDARD LIB

//recursively calls sublists of arguments from the lib to unnest the AST
var callLib = function(lib, first, second){
	if(typeof second === 'object' && first in lib){
		return lib[first](second);
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

//standard library object
//functions starting with , are private and cannot be called in the front-end
var STD = {
	//Comma join util cannot be directly called
	",":function(args){
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
	//same as ,infix but has a limit of the amount of arguments it links
	",ifixn":function(sep, limit, args){
		if(args.length < 1 || args.length > limit) throw "Argument Error: Improper number of arguments";
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
	//CONDITIONS
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
		return this[",ifixn"](" !== ", 4, args);
	},
	">":function(args){
		return this[",ifixn"](" > ", 4, args);
	},
	"<":function(args){
		return this[",ifixn"](" < ", 4, args);
	},
	"<=":function(args){
		return this[",ifixn"](" <= ", 4, args);
	},
	">=":function(args){
		return this[",ifixn"](" >= ", 4, args);
	}
};

exports.STD = STD;

var obj = [ '$', [ '5', '6', '==', [ '+', ['5', '6'], '5'], '>=', ['true', 'false'] ] ];
console.log(STD[obj[0]](obj[1]));