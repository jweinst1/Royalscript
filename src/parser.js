//parser file for the royalscript language

//table of transpiling functions

var funcTable = {
	"+":function(args){
		for (var i = args.length - 1; i >= 0; i--) {
			args[i] = args[i].call();
		};
		return args.join(" + ");
	},
	"-":true,
	"$":true,
	"*":true,
	"/":true,
	"%":true
};

//quick way of checking if a string is a primtive value.
var primTable = {
	"true":true,
	"false":true,
	"null":true,
	"0":true,
	"1":true,
	"2":true
};


//creates an abstract node for the AST
function AbsNode(sym){
	return {sym:sym,
		    children:[],
		    fn:FuncTable[sym],
		    call:function(){ return this.fn(this.children) }
	};
}

//basic node type for primitive values
function ValNode(value){
	return {
		val:value,
		call:function(){ return this.val }
	};
}

//parenthesis counter object to facilitate top down parsing.
function ParenCounter(){
	this["("] = 0;
	this[")"] = 0;
    this.put = function(token){
    	if(token in this) this[token] += 1;
    	return this["("] === this[")"];
    };
}


var AST = (function(){
	//determines if string is a primitive value
	function isPrim(string){
		return /^"[^"]*"$|^[0-9]+$|true|false|null/.test(string);
	}

	function isFunc(string){
		//allows dot notation in function names
		//checks for opers too
		return /^[\+\-\*\%\/><=!?&^@#$~_]+$|^[a-zA-Z.]+$/.test(string);
	}

	function isOp(string){
		return /^[\+\-\*\%\/><=!?&^@#$~_]+$/.test(string);
	}

	function AST(tokens){
		this.name = null;
		this.children = [];
		var counter = new ParenCounter();
		//args for parsing current child node
		var args = [];
		var nmode = true;
		var cmode = false;
		var pmode = false;
		for (var i = 0; i < tokens.length; i++) {
			if(nmode){

			}
			else if(cmode){

			}
			else if(pmode){
				
			}
		};
	}
	return AST;
})();

exports.AST = AST;