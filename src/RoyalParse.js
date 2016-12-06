//faster version for tokenizer and parser in one

var RoyalParse = function(code){
	try {
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
		}
	catch(err){
		return err.name;
	}
};

exports.RoyalParse = RoyalParse;

