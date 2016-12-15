window.addEventListener("DOMContentLoaded", function () {
    var geval = eval;

    var repl = new CodeMirrorREPL("repl", {
        mode: "text/plain",
        theme: "eclipse",
    });

    repl.print("/*RoyalScript language by Josh Weinstein*/");

    window.print = function (message) {
        repl.print(message, "message");
    };

    repl.isBalanced = function (code) {
        var tokens = {"(":0, ")":0};
        for(var i=0;i<code.length;i++) if(code[i] in tokens) tokens[code[i]] += 1;
        if(tokens["("] < tokens[")"]) { repl.print(new SyntaxError("Unexpected closing bracket: )"), "error"); return null;};
        return tokens["("] - tokens[")"] === 0;
    };

    repl.eval = function (code) {
        var oldLog = console.log;
        console.log = function (message) {
           repl.print(message, "message");
           oldLog.apply(console, arguments);
        };
        try {
            repl.print(JSON.stringify(geval(RoyalScript.Compile(code))), "message");
        } catch (error) {
            repl.print(error, "error");
        }
    };

    function isExpression(code) {
        if (/^\s*function\s/.test(code)) return false;

        try {
            Function("return " + code);
            return true;
        } catch (error) {
            return false;
        }
    }

    function express(value) {
        if (value === null) var type = "Null";
        else if (typeof value === "Undefined") var type = "Undefined";
        else var type = Object.prototype.toString.call(value).slice(8, -1);

        switch (type) {
        case "String":
            value = '"' + value.replace('\\', '\\\\').replace('\0', '\\0').replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t').replace('\v', '\\v').replace('"', '\\"') + '"';
        case "Number":
        case "Boolean":
        case "Function":
        case "Undefined":
        case "Null":
            repl.print(value);
            break;
        case "Object":
        case "Array":
            repl.print(JSON.stringify(value, 4));
            break;
        default:
            repl.print(value, "error");
        }
    }
}, false);
