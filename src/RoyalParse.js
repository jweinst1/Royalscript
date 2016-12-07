//faster version for tokenizer and parser in one


//checks for illegal string patterns that cannot be resolved by parsing
function checkForBad(string){
	return string.search(/\{\}|\[\]/) !== -1;
}

var RoyalParse = function(code){

		  if(checkForBad(code)) throw "Illegal Parenthesis Error";
		  var tokens = code.split(/(\()|(\))|(,)|( )|\n|\t/);
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
		  }
		  return JSON.parse('[' + tokens.join("") + ']');
};

exports.RoyalParse = RoyalParse;

