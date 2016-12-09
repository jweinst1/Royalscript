//ROYAL SCRIPT STANDARD LIB

//recursively calls sublists of arguments from the lib to unnest the AST
var callLib = function(lib, first, second, spacer){
	if(typeof second === 'object' && first in lib){
		return lib[first](second, spacer);
	}
	else {
		return first;
	}
};

//standard library object
var STD = {
	"+":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " + " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	"-":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " - " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	"*":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " * " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	"/":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " / " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	"%":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " % " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	}
};

exports.STD = STD;

var obj = [ '+', [ '5', '6', '%', [ '3', '4' ] ] ];
console.log(STD["+"](obj[1], ""));