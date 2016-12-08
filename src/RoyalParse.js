//tokenizer for Royal Script language
//2016

//cached token tree that allows the tokenizer to split code very quickly
var keepTokens = {
	"(":",[",
	")":"]",
    ",":","
};

var stopTokens = {
	" ":true,
	"\n":true
};

var illegalTokens = {
	"{":true,
	"}":true,
	"[":true,
	"]":true,
	":":true,
	'"':true
};

var valTokens = {
	"null":true,
	"true":true,
	"false":true
};

//main tokenizer
var Parse = function(code){
	var cmode = false;
	var smode = false;
	var tmode = false;
	var tokens = [];
	var current = "";
	for (var i = 0; i < code.length; i++) {
		if(smode){
			if(code[i] === "`"){
				smode = false;
				tokens.push(current +'`"');
				current = "";
				//break;
			}
			else {
				current += code[i];
			}
		}
		else if(cmode){
			if(code[i] === ";"){
				cmode = false;
			}			
		}
		else {
			if(code[i] in illegalTokens) throw "illegalToken: " + code[i];
			if(tmode){
				if(code[i] in stopTokens){
					tmode = false;
					tokens.push('"' + current + '"');
					current = "";
				}
				else if(code[i] in keepTokens){
					tmode = false;
					tokens.push('"' + current + '"');
					current = "";
					tokens.push(keepTokens[code[i]]);
				}
				else{
					current += code[i];
				}
			}
			else {
				if (code[i] in keepTokens) {
					tokens.push(keepTokens[code[i]]);
				}
				else if(!(code[i] in stopTokens)){
					if(code[i] === "`"){
						smode = true;
						current += '"`';
					}
					else if(code[i] === ";"){
						cmode = true;
					}
					else {
						tmode = true;
						current += code[i];
					}
				}
			}
		}
	};
	if(current) tokens.push(current);
	return JSON.parse("[" + tokens.join("") + "]");
};

exports.Parse = Parse;
