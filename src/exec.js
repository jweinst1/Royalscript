//JS code executor object

//node exeuctor version
var Executor = (function(){
	function Executor(){
		this.code = "";
		this.result = undefined;
	}

	Executor.prototype.addCode = function(string){
		this.code += string;
	};
	Executor.prototype.exec = function(){
		this.result = eval(this.code);
		return this.result;
	};
	return Executor;
})();

exports.Executor = Executor;


var WebExecutor = (function(){
	function WebExecutor(){
		this.code = "";
		this.result = undefined;
	}

	WebExecutor.prototype.addCode = function(string){
		this.code += string;
	};
	WebExecutor.prototype.exec = function(){
		var oldLog = console.log;
		console.log = function(message, textout){
			//implement textout here for custom output
			oldLog.apply(console, arguments);
		};
		this.result = eval(this.code);
		return this.result;
	};
	return WebExecutor;
})();

exports.WebExecutor = WebExecutor;
