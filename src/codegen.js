//file for node-wise transcompiling functions and generating code

var CodeGenerator = (function(){
	function CodeGenerator(lib){
		//starts with either a core object library or nothing
		lib = lib || {};
		for(var name in lib){
			this[name] = lib[name];
		}
	}
	CodeGenerator.prototype.set = function(name, func) {
		this[name] = func;
	};
	//safe version of set
	CodeGenerator.prototype.add = function(name, func) {
		if(!(name in this)) this[name] = func;
	};

	CodeGenerator.prototype.get = function(name) {
		return this[name];
	};
	return CodeGenerator;
})();

exports.CodeGenerator = CodeGenerator;