import * as CodeMirror from "codemirror";

import "codemirror/lib/codemirror";
import "codemirror/mode/python/python";
import "codemirror/mode/r/r";
import "codemirror/mode/octave/octave";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/sas/sas";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/shell/shell";
import "codemirror/mode/julia/julia";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/meta";

var hintWords = [];

try {
  CodeMirror.registerHelper("hintWords", "prolog", hintWords);
} catch (error) {
  console.log(`Failed to register hintWords for sos mode. ${error}`);
}

(CodeMirror as any).defineMIME("text/x-prolog", "prolog");

(CodeMirror as any).modeInfo.push({
  ext: ["pl"],
  mime: "text/x-prolog",
  mode: "prolog",
  name: "prolog"
});
