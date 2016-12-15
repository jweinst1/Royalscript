window.addEventListener("DOMContentLoaded", function () {
       window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
             mode: "scheme",
             theme: "night"
        });
        
        window.editor.evalRoyalScript = function(input){
            return input + "proc";
        };
}, false);
