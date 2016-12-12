//this is a file of older functions that aren't in the RoyalScript spec.

var oldfuncs = {
	"dict":function(args){
		if(args.length === 0) return "{}";
		var str = "{";
		var kmode = true;
		for (var i = 0; i < args.length; i++) {
			if(kmode){
				if(typeof args[i+1] === 'object') throw "Key Error: key must be static string";
				else {
					str += args[i] + ":";
					kmode = false;
				}
			}
			else {
				if(typeof args[i+1] === 'object'){
					str += callLib(this, args[i], args[i+1]) + ", ";
					i += 1;
					kmode = true;
				}
				else {
					str += args[i] + ", ";
					kmode = true;
				}
			}
		};
		if(!(kmode)) str += "null";
		return str + "}";
	}
};