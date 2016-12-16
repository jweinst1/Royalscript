window.addEventListener("DOMContentLoaded", function () {
       window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
             mode: "scheme",
             theme: "night"
        });
       
       window.displayRoyalResult = CodeMirror.fromTextArea(document.getElementById("evalresult"), {
             theme: "night",
             readOnly: true
        });
        
        window.editor.evalRoyalScript = function(input){
             
            try {
                   return JSON.stringify(eval(RoyalScript.Compile(input)));
            }
           catch(err) {
                  return err.toString();
           }
        };
}, false);
