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

//determines
function isPrim(string){
	return /\"[^"]*\"|[0-9]+/.test(string)
}

//creates an abstract node for the AST
function AbsNode(sym, children){
	return {sym:sym,
		    children:children,
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

//main level parser function
var Parse = function(tokens){
	var start = null;
	var end = null;
	var mode = "start";
	for (var i = 0; i < tokens.length; i++) {
		//not finished
		switch (mode) {
			case "start": 
			break;
		}
	};
};