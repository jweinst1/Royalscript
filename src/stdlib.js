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
	",callLib":callLib,
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
	//creates a list of numbers, name must be specified
	"range":function(args){
		var elems = get2Args(this, args);
		return "(function(){for(var i=" + elems[0] + ",arr = [];i<" + elems[1] + ";i++) arr.push(i);return arr;})()";
	},
	//IN FUNCTION, checks if something is a key in list or dict
	"in":function(args){
		var elems = get2Args(this, args);
		return elems[0] + " in " + elems[1];
	},
	//list get setter functions
	"get":function(args){
		var elems = get2Args(this, args);
		return elems[0] + "[" + elems[1] + "]";
	},
	"set":function(args){
		var elems = get3Args(this, args);
		return elems[0] + "[" + elems[1] + "] = " + elems[2] + ";";
	},
	//list util functions
	"len":function(args){
		return get1Args(this, args) + ".length";
	},
	//gets a slice of a list
	"cut":function(args){
		var elems = get3Args(this, args);
		return elems[0] + ".slice(" + elems[1] + ", " + elems[2] + ")";
	},
	//copies the list to a new instance important for immutable
	"rep":function(args){
		return get1Args(this, args) + ".slice()";
	},
	//allows appending on the right side of the list
	"<<":function(args){
		var elems = get2Args(this, args);
		return elems[0] + ".push(" + elems[1] + ");";
	},
	">>":function(args){
		var elems = get2Args(this, args);
		return elems[0] + ".unshift(" + elems[1] + ");";
	},
	//INSERT FUNCTION works on list
	"insert":function(args){
		var elems = get3Args(this, args);
		return elems[0] + ".splice(" + elems[1] + ",0," + elems[2] + ");"; 
	},
	//REMOVE FUNCTION works on list
	//returns removed element
	"remove":function(args){
		var elems = get2Args(this, args);
		return elems[0] + ".splice(" + elems[1] + ",1," + ");"; 		
	},
	//FIND FUNCTION works on lists or strings
	//returns -1 if not found, otherwise return first index.
	"find":function(args){
		var elems = get2Args(this, args);
		return elems[0] + ".indexOf(" + elems[1] + ")";
	},
	//MAP FUNCTION works on list
	"map":function(args){
		var elems = get2Args(this, args);
		return elems[0] + ".map(" + elems[1] + ")";
	},
	//FILTER FUNCTION WORKS ON LISTS
	"filter":function(args){
		var elems = get2Args(this, args);
		return elems[0] + ".filter(" + elems[1] + ")";
	},
	//CONCAT FUNCTION works on list or strings
	"&":function(args){
		var elems = get2Args(this, args);
		return elems[0] + ".concat(" + elems[1] + ");";
	},
	//allows a sequence of functions to be grouped together for control flow or other purposes as a single arg.
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
		return "if(" + elems[0] + "){" + elems[1] + "} else{" + elems[2] + "};";
	},
	//multi IF series function, allows all true cases to execute
	"ifs":function(args){
		if(args.length < 1) throw "Argument Error: Expected at least 2 arguments";
		var str = "";
		var condmode = true;
		for (var i = 0; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				if(condmode){
					str += "if(" + callLib(this, args[i], args[i+1]) + "){";
					condmode = false;
				}
				else {
					str += callLib(this, args[i], args[i+1]) + "};";
					condmode = true;
				}
			}
		};
		if(!(condmode)) str += "};";
		return str;
	},
	//IS function determines if some argument is an instance of a class or type instance first, class name second
	//returns boolean
	"is":function(args){
		var elems = get2Args(this, args);
		return elems[0] + " instanceof " + elems[1];
	},
	//SWITCH Statement
	//cases can be expressions or variable names, or numbers or strings
	"switch":function(args){
		var str = "switch(" + callLib(this, args[0], args[1]) + "){";
		var casemode = true;
		for (var i = 1; i < args.length; i++) {
			if(typeof args[i] ==='undefined') throw "Argument Error: Impropr number of arguments";
			if(!(typeof args[i] === 'object')){
				if(casemode){
					str += "case " + callLib(this, args[i], args[i+1]) + ": ";
					casemode = false;
				}
				else {
					str += callLib(this, args[i], args[i+1]) + "break;";
					casemode = true;
				}
			}
		};
		if(!(casemode)) str += "break;";
		return str + "};";
	},
	//IF ELSE CHAIN FUNCTION
	"ife":function(args){
		if(args.length < 3 || (args.length/2)%2 === 0) throw "Argument Error: Wrong number of arguments";
		var str = "if(" + callLib(this, args[0], args[1]) + "){";
		var condmode = false;
		for (var i = 1; i < args.length-2; i++) {
			if(!(typeof args[i] === 'object')){
				if(condmode){
					str += "else if(" + callLib(this, args[i], args[i+1]) + "){";
					condmode = false;
				}
				else {
					str += callLib(this, args[i], args[i+1]) + "};";
					condmode = true;
				}
			}
		};
		return str + "else{" + callLib(this, args[i], args[i+1]) + "};";
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
	},
	//single statement function, only takes one parameter, anonymous
	"@":function(args){
		var elems = get2Args(this, args);
		return "function(" + elems[0] + "){return " + elems[1] + "}";
	},
	//double parameter, single statement function, anonymous
	"@@":function(args){
		var elems = get3Args(this, args);
		if(typeof elems[1] === 'object') throw "Name Error: paramter must be literal";
		return "function(" + elems[0] +  "," + elems[1] + "){return " + elems[2] + "}";
	},
	//LOOPING FUNCTIONS
	//condition loop single statement
	"loop":function(args){
		var elems = get2Args(this, args);
		return "while(" + elems[0] + "){" + elems[1] + "};";
	},
	//foreach loop in array
	//function must have one parameter but multiple statements operates on list in place
	"for":function(args){
		var elems = get2Args(this, args);
		return elems[0] + ".forEach(" + elems[1] + ");";		
	},
	//STRUCT FUNCTION
	"struct":function(args){
		if(typeof args[1] === 'object') throw "Name Error: name of struct must be literal";
		var str1 = "function " + args[0] + "(";
		var str2 = "{";
		for (var i = 1; i < args.length-1; i++) {
			if(typeof args[i] === 'object') throw "Name Error: fields of struct must be literal";
			str1 += args[i] + ", ";
			str2 += "this." + args[i] + " = " + args[i] + ";";
		};
		return str1 + args[i] + ")" + str2 + "this." + args[i] + " = " + args[i] + ";};";		
	},
	//NEW FUNCTION, creates struct
	"new":function(args){
		if(typeof args[1] === 'object') throw "Name Error: new must be called with valid struct name, not expression";
		var str = "new " + args[0] + "(";
		for (var i = 1; i < args.length; i++) {
		 	if(!(typeof args[i] === 'object')){
		 		str += callLib(this, args[i], args[i+1]) + ",";
		 	}
		 };
		 return str.slice(0, -1) + ")";
	}
};

exports.STD = STD;

//top level function that generates javascript
var genCode = function(AST){ 
	return STD[",infix"]("", AST);
};

exports.genCode = genCode;

//var obj = ['=', ['a', '@', ['elem', '+', ['elem', '2']]]];
//console.log(STD[obj[0]](obj[1]));