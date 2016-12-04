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

//main level parser function
var Parse = function(tokens){
	var fnmode = true;
	var smode = false;
	var emode = false;
	var curnode = null;
	var ast = {sym:"program", children:[]};
	var counter = new ParenCounter();
	for (var i = 0; i < tokens.length; i++) {
		//not finished
		if (fnmode){
			if(tokens[i] in funcTable){
				//finds a function token
				curnode = AbsNode(tokens[i]);
				smode = true;
				fnmode = false;
			}
		}
		else if (smode){
			if (tokens[i] === "("){
				counter.put(tokens[i]);
				smode = false;
				emode = true;
			}
		}
		else if(emode){
			if(tokens[i] === ")"){

			}
			else {

			}
		}
	};
};

var AST = (function(){
	//determines if string is a primitive value
	function isPrim(string){
		return /^"[^"]*"$|^[0-9]+$|true|false|null/.test(string);
	}

	function isFunc(string){
		//allows dot notation in function names
		return /^[a-zA-Z.]+$/.test(string);
	}

	function isOp(string){
		return /^[\+\-\*\%\/><=!?&^@#$~_]+$/.test(string);
	}

	function AST(tokens){
		this.children = [];
		this.name = null;
		this.type = null;
		var counter = new ParenCounter();
		//args for parsing current child node
		var args = [];
		var nmode = true;
		var smode = false;
		var emode = false;
		for (var i = 0; i < tokens.length; i++) {
			if(nmode){
				if (isOp(tokens[i])) {
					this.type = "op";
					this.name = tokens[i];
					this.nmode = false;
					this.smode = true;
				}
				else if(isFunc(tokens[i])){
					this.type = "func";
					this.name = tokens[i];
					this.nmode = false;
					this.smode = true;
				}
				else {

				}
			}
			else if(smode){

			}
			else if(emode){

			}
		};
	}
	return AST;
})();

exports.AST = AST;