window.addEventListener("DOMContentLoaded", function () {
       window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
             mode: "scheme",
             theme: "night"
        });
       
       window.displayRoyalResult = CodeMirror.fromTextArea(document.getElementById("evalresult"), {
             theme: "night",
             readOnly: true
        });
       var oldLog = console.log;
       window.ROYALSCRIPTOUT = "";
       console.log = function (message) {
                window.ROAYLSCRIPTOUT += message + "\n";
                oldLog.apply(console, arguments);
             };
        
        window.editor.evalRoyalScript = function(input){
             
            try {
                   var runResult = window.ROYALSCRIPTOUT + JSON.stringify(eval(RoyalScript.Compile(input)));
                   window.ROYALSCRIPTOUT = "";
                   return runResult;
            }
           catch(err) {
                  window.ROYALSCRIPTOUT = "";
                  return err;
           }
        };
}, false);
