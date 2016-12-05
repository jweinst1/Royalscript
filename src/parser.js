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
    };
    this.offset = function(){
    	return this["("] - this[")"];
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
		for (var i = 0; i < tokens.length-1; i++) {
			counter.put(tokens[i]);
			//console.log(counter.offset());
			switch(counter.offset()) {
				case -1:
				    throw "INVALID Parenthsis";
				    break;
				case 0:
				    if(tokens[i+1] === "("){
				    	this.name = tokens[i];
				    	counter.put("(");
				    	i += 1; //skips parenthesis token
				    }
				    //else if(i === tokens.length-1 && tokens[i] === ")")
				    else {
				    	throw "Error token not starting function";
				    }
				    break;
				case 1:
				    if(tokens[i+1] === "("){
				    	args.push(tokens[i]);
				    	args.push("(");
				    	counter.put("(");
				    	i += 1; //skips parenthesis token
				    }
				    else {
				    	this.children.push(tokens[i]);
				    }
				    break;
				case 2:
				    if(tokens[i+1] === ")"){
				    	//skips closing parenthesis and closes child AST node.
				    	args.push(tokens[i]);
				    	args.push(")");
				    	counter.put(")");
				    	if(args[0] === ")") args.splice(0, 1);
				    	this.children.push(new AST(args.slice()));
				    	args = [];
				    	i += 1;
				    }
				default:
				    args.push(tokens[i]);
				    break;
			}
		};
	}
	return AST;
})();

exports.AST = AST;