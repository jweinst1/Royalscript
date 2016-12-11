//file for importing to and extending the standard library
//need method of importing libraries


var CodeGenerator = (function(){
	function CodeGenerator(lib){
		//starts with either a core object library or nothing
		this.lib = lib || {};
	}
	CodeGenerator.prototype.set = function(name, func) {
		this.lib[name] = func;
	};
	//safe version of set
	CodeGenerator.prototype.add = function(name, func) {
		if(!(name in this.lib)) this.lib[name] = func;
	};
	CodeGenerator.prototype.get = function(name) {
		return this.lib[name];
	};
	CodeGenerator.prototype.contains = function(name) {
		return name in this.lib;
	};
	return CodeGenerator;
})();

exports.CodeGenerator = CodeGenerator;