//JS code executor object

function Executor(){
	this.code = "";
	this.result = undefined;
	this.addCode = function(string){
		this.code += string;
	};
	this.exec = function(){
		this.result = eval(this.code);
		return this.result;
	};
}