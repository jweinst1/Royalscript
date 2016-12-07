//standard library object

var STD = {
	"+":function(args, spacer){
		var string = spacer;
		if (typeof args[0] === 'string' && typeof args[1] === 'object') { string += this[args[0]](args[1], spacer);} else{string += args[0]};
		for (var i = 1; i < args.length; i++) {
			switch(typeof args[i]){
				case 'string':
				   if(typeof args[i+1] === 'object') {
				   	  string += " + " + callFromLib(this, args[i], args[i+1], spacer);
				   }
				   break;
				case 'object':
				   break;
				default:
				   string += " + " + args[i];
			}
		};
		return string;
	}
};

exports.STD = STD;

//utility function used to recursively call nested arguments from the lib.
function callFromLib(lib, name, args, spacer){
	if(!(name in lib)) throw "Name Error: Function " + name + " not found.";
	else return lib[name](args, spacer);
}

console.log(STD["+"]([ '+', [ 1, 2, '-', [ 5, 6 ] ] ], ""));