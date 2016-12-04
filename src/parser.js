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
		var smode = false;
		var emode = false;
		for (var i = 0; i < tokens.length; i++) {
			if(nmode){
				if(isFunc(tokens[i])){
					this.name = tokens[i];
					nmode = false;
					smode = true;
				}
				else if(tokens[i] !== ",") {
					this.children.push(tokens[i]);
				}
			}
			else if(smode){
				if(tokens[i] === "("){
					counter.put(tokens[i]);
					smode = false;
					emode = true;
				}
				else {
					throw "Non-parenthsis succeeds func name";
				}
			}
			else if(emode){
				//this mode uses the balancer to parse through deep nests of functions, then constructs the child nodes recursively
				if(counter.put(tokens[i])){
					console.log(args);
					if(args.length > 0) this.children.push(new AST(args.slice()));
					emode = false;
					nmode = true;
					args = [];
				}
				else {
					if(isPrim(tokens[i])){
						this.children.push(tokens[i]);
					}
					else {
						//needs future update of how to handle commas.
						if(tokens[i] !== ",") args.push(tokens[i]);
					}
				}
			}
		};
	}
	return AST;
})();

exports.AST = AST;