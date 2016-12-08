//faster version for tokenizer and parser in one


//checks for illegal string patterns that cannot be resolved by parsing
function checkForBad(string){
	return string.search(/\{\}|\[\]/) !== -1;
}

//prepares `` strings for parser
//Also prepares variable strings
function varStringPrep(string){
	if(/^`[^`]*`$/.test(string)) return '"`' + string.slice(1, -1) + '`"';
	else if(/^[$A-Z_][0-9A-Z_$]*$/i.test(string)) return '"' + string + '"';
	else return string;
}

//cleans undefined and '' from token list
function clean(arr){
	var newarr = [];
	for (var i = 0; i < arr.length; i++) {
		if(arr[i]) newarr.push(arr[i]);
	};
	return newarr;
}

//list of words that cannot be used as variable or function names in RoyalScript
//can be handled by eval syntax error
var illegalWords = {
	"function":true,
	"var":true,
	"if":true
};

var RoyalParse = function(code){

		  if(checkForBad(code)) throw "Illegal Parenthesis Error";
		  var tokens = clean(code.split(/(^`[^`]*`$)|(\()|(\))|(,)|( )|\n|\t/));
		  var repdict = {
		  	"(":"[",
		  	")":"]",
		  	"undefined":''
		  };
		  for (var i=0;i<tokens.length;i++){
		  	if(tokens[i] in repdict) tokens[i] = repdict[tokens[i]];
		  	else if(tokens[i+1] === "("){
		  		tokens[i] = '"' + tokens[i] + '",';
		  	}
		  	tokens[i] = varStringPrep(tokens[i]);
		  }
		  return JSON.parse('[' + tokens.join("") + ']');
};

exports.RoyalParse = RoyalParse;

