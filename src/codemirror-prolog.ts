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

import {
  PROLOG_MIME_TYPE,
  PROLOG_MODE,
  PROLOG_EXTENSION,
  PROLOG_NAME
} from "./common";

var hintWords = [""];

console.log(`Registering hints for prolog mode.`);

try {
  CodeMirror.registerHelper("hintWords", "prolog", hintWords);
} catch (error) {
  console.log(`Failed to register hintWords for prolog mode. ${error}`);
}

console.log(`Defining CodeMirror prolog mode.`);

(CodeMirror as any).defineMode(
  "prolog",
  function(conf: CodeMirror.EditorConfiguration, parserConf: any) {},
  "python"
);

console.log(`Registering CodeMirror prolog MIME mode.`);

(CodeMirror as any).defineMIME(PROLOG_MIME_TYPE, PROLOG_MODE);

(CodeMirror as any).modeInfo.push({
  ext: [PROLOG_EXTENSION],
  mime: PROLOG_MIME_TYPE,
  mode: PROLOG_MODE,
  name: PROLOG_NAME
});
