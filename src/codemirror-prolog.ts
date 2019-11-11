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
// import "codemirror/mode/simple";

// let ctype = require("./prolog-ctype");
import * as ctype from "./prolog-ctype";

import {
  PROLOG_MIME_TYPE,
  PROLOG_MODE,
  PROLOG_EXTENSION,
  PROLOG_NAME
} from "./common";

console.log(`Defining CodeMirror prolog mode. 4`);

var keywords = [
  "writeq",
  "writeq",
  "writeln",
  "writeln",
  "writef",
  "writef",
  "write_term",
  "write_term",
  "write_length",
  "write_canonical",
  "write_canonical",
  "write",
  "write",
  "working_directory",
  "with_tty_raw",
  "with_quasi_quotation_input",
  "with_output_to",
  "with_mutex",
  "window_title",
  "win_window_pos",
  "win_window_color",
  "win_shell",
  "win_shell",
  "win_remove_dll_directory",
  "win_registry_get_value",
  "win_insert_menu_item",
  "win_insert_menu",
  "win_has_menu",
  "win_folder",
  "win_exec",
  "win_add_dll_directory",
  "win_add_dll_directory",
  "wildcard_match",
  "when",
  "wait_for_input",
  "volatile",
  "visible",
  "version",
  "version",
  "variant_sha1",
  "variant_hash",
  "var_property",
  "var_number",
  "var",
  "valid_string_goal",
  "use_module",
  "use_module",
  "use_foreign_library",
  "use_foreign_library",
  "upcase_atom",
  "untable",
  "unsetenv",
  "unload_foreign_library",
  "unload_foreign_library",
  "unload_file",
  "unknown",
  "unix",
  "unify_with_occurs_check",
  "unifiable",
  "undefined",
  "ttyflush",
  "tty_size",
  "tty_put",
  "tty_goto",
  "tty_get_capability",
  "tspy",
  "tspy",
  "true",
  "trim_stacks",
  "trie_update",
  "trie_term",
  "trie_property",
  "trie_new",
  "trie_lookup",
  "trie_insert",
  "trie_insert",
  "trie_insert",
  "trie_gen_compiled",
  "trie_gen_compiled",
  "trie_gen",
  "trie_destroy",
  "trie_delete",
  "tracing",
  "trace",
  "trace",
  "trace",
  "tprofile",
  "told",
  "tnot",
  "tnodebug",
  "tnodebug",
  "tmp_file_stream",
  "tmp_file",
  "time_file",
  "time",
  "throw",
  "threads",
  "thread_statistics",
  "thread_signal",
  "thread_setconcurrency",
  "thread_send_message",
  "thread_send_message",
  "thread_self",
  "thread_property",
  "thread_peek_message",
  "thread_peek_message",
  "thread_message_hook",
  "thread_local",
  "thread_join",
  "thread_join",
  "thread_initialization",
  "thread_get_message",
  "thread_get_message",
  "thread_get_message",
  "thread_exit",
  "thread_detach",
  "thread_create",
  "thread_create",
  "thread_at_exit",
  "thread_affinity",
  "text_to_string",
  "term_variables",
  "term_variables",
  "term_to_atom",
  "term_subsumer",
  "term_string",
  "term_string",
  "term_singletons",
  "term_hash",
  "term_hash",
  "term_expansion",
  "term_expansion",
  "term_attvars",
  "telling",
  "tell",
  "tdebug",
  "tdebug",
  "table",
  "tab",
  "tab",
  "swritef",
  "swritef",
  "succ",
  "subsumes_term",
  "sub_string",
  "sub_atom_icasechk",
  "sub_atom",
  "style_check",
  "strip_module",
  "string_upper",
  "string_predicate",
  "string_lower",
  "string_length",
  "string_concat",
  "string_codes",
  "string_code",
  "string_chars",
  "string",
  "stream_property",
  "stream_position_data",
  "stream_pair",
  "statistics",
  "statistics",
  "stamp_date_time",
  "spy",
  "split_string",
  "source_location",
  "source_file_property",
  "source_file",
  "source_file",
  "source_exports",
  "sort",
  "sort",
  "sleep",
  "skip",
  "skip",
  "size_nb_set",
  "size_file",
  "show_profile",
  "shift",
  "shell",
  "shell",
  "setup_call_cleanup",
  "setup_call_catcher_cleanup",
  "setof",
  "setlocale",
  "setenv",
  "setarg",
  "set_stream_position",
  "set_stream",
  "set_random",
  "set_prolog_stack",
  "set_prolog_gc_thread",
  "set_prolog_flag",
  "set_prolog_IO",
  "set_output",
  "set_module",
  "set_locale",
  "set_input",
  "set_flag",
  "set_end_of_stream",
  "select_dict",
  "select_dict",
  "seen",
  "seek",
  "seeing",
  "see",
  "same_term",
  "same_file",
  "retractall",
  "retract",
  "resource",
  "resource",
  "reset_profiler",
  "reset_gensym",
  "reset_gensym",
  "reset",
  "require",
  "repeat",
  "rename_file",
  "reload_library_index",
  "reload_foreign_libraries",
  "reexport",
  "reexport",
  "redefine_system_predicate",
  "recordz",
  "recordz",
  "recorded",
  "recorded",
  "recorda",
  "recorda",
  "read_term_from_atom",
  "read_term",
  "read_term",
  "read_string",
  "read_string",
  "read_pending_codes",
  "read_pending_chars",
  "read_link",
  "read_history",
  "read_clause",
  "read",
  "read",
  "rational",
  "rational",
  "random_property",
  "quasi_quotation_syntax_error",
  "quasi_quotation_syntax",
  "qsave_program",
  "qsave_program",
  "qcompile",
  "qcompile",
  "put_dict",
  "put_dict",
  "put_code",
  "put_code",
  "put_char",
  "put_char",
  "put_byte",
  "put_byte",
  "put_attrs",
  "put_attr",
  "put_assoc",
  "put",
  "put",
  "public",
  "protocolling",
  "protocola",
  "protocol",
  "prompt1",
  "prompt",
  "prolog_unlisten",
  "prolog_trace_interception",
  "prolog_to_os_filename",
  "prolog_stack_property",
  "prolog_skip_level",
  "prolog_skip_frame",
  "prolog_load_file",
  "prolog_load_context",
  "prolog_listen",
  "prolog_listen",
  "prolog_list_goal",
  "prolog_ide",
  "prolog_frame_attribute",
  "prolog_file_type",
  "prolog_exception_hook",
  "prolog_edit:locate",
  "prolog_edit:locate",
  "prolog_edit:load",
  "prolog_edit:edit_source",
  "prolog_edit:edit_command",
  "prolog_cut_to",
  "prolog_current_frame",
  "prolog_current_choice",
  "prolog_choice_attribute",
  "prolog_alert_signal",
  "prolog",
  "project_attributes",
  "profiler",
  "profile_count",
  "profile",
  "profile",
  "print_message_lines",
  "print_message",
  "print",
  "print",
  "predsort",
  "predicate_property",
  "portray_clause",
  "portray_clause",
  "portray",
  "plus",
  "please",
  "phrase_from_quasi_quotation",
  "phrase",
  "phrase",
  "peek_string",
  "peek_code",
  "peek_code",
  "peek_char",
  "peek_char",
  "peek_byte",
  "peek_byte",
  "pce_dispatch",
  "pce_call",
  "parse_time",
  "parse_time",
  "ord_list_to_assoc",
  "open_string",
  "open_source_hook",
  "open_shared_object",
  "open_shared_object",
  "open_resource",
  "open_null_stream",
  "open_dde_conversation",
  "open",
  "open",
  "op",
  "once",
  "on_signal",
  "numbervars",
  "numbervars",
  "number_string",
  "number_codes",
  "number_chars",
  "number",
  "nth_integer_root_and_remainder",
  "nth_clause",
  "notrace",
  "notrace",
  "not",
  "nospyall",
  "nospy",
  "normalize_space",
  "noprotocol",
  "noprofile",
  "nonvar",
  "nonterminal",
  "nonground",
  "noguitracer",
  "nodebug",
  "nodebug",
  "nl",
  "nl",
  "nb_setval",
  "nb_setarg",
  "nb_set_to_list",
  "nb_set_dict",
  "nb_linkval",
  "nb_linkarg",
  "nb_link_dict",
  "nb_getval",
  "nb_delete",
  "nb_current",
  "name",
  "mutex_unlock_all",
  "mutex_unlock",
  "mutex_trylock",
  "mutex_statistics",
  "mutex_property",
  "mutex_lock",
  "mutex_destroy",
  "mutex_create",
  "mutex_create",
  "multifile",
  "msort",
  "module_transparent",
  "module_property",
  "module",
  "module",
  "module",
  "min_assoc",
  "meta_predicate",
  "message_to_string",
  "message_queue_set",
  "message_queue_property",
  "message_queue_destroy",
  "message_queue_create",
  "message_queue_create",
  "message_property",
  "message_line_element",
  "message_hook",
  "memberchk",
  "max_assoc",
  "map_assoc",
  "map_assoc",
  "make_library_index",
  "make_library_index",
  "make_directory",
  "make",
  "locale_sort",
  "locale_property",
  "locale_destroy",
  "locale_create",
  "load_foreign_library",
  "load_foreign_library",
  "load_files",
  "load_files",
  "listing",
  "listing",
  "list_to_set",
  "list_to_assoc",
  "list_strings",
  "list_debug_topics",
  "line_position",
  "line_count",
  "license",
  "license",
  "license",
  "library_directory",
  "length",
  "leash",
  "last",
  "known_licenses",
  "keysort",
  "join_threads",
  "is_trie",
  "is_thread",
  "is_stream",
  "is_most_general_term",
  "is_list",
  "is_engine",
  "is_dict",
  "is_dict",
  "is_assoc",
  "is_absolute_file_name",
  "is",
  "interactor",
  "integer",
  "instance",
  "initialize",
  "initialization",
  "initialization",
  "include",
  "in_pce_thread_sync",
  "in_pce_thread",
  "import_module",
  "import",
  "ignore",
  "if",
  "help_hook",
  "help",
  "help",
  "halt",
  "halt",
  "gxref",
  "guitracer",
  "gtrace",
  "gspy",
  "ground",
  "goal_expansion",
  "goal_expansion",
  "getenv",
  "get_time",
  "get_string_code",
  "get_single_char",
  "get_flag",
  "get_dict_ex",
  "get_dict",
  "get_dict",
  "get_code",
  "get_code",
  "get_char",
  "get_char",
  "get_byte",
  "get_byte",
  "get_attrs",
  "get_attr",
  "get_assoc",
  "get_assoc",
  "get0",
  "get0",
  "get",
  "get",
  "gensym",
  "gen_nb_set",
  "gen_assoc",
  "gdebug",
  "garbage_collect_clauses",
  "garbage_collect_atoms",
  "garbage_collect",
  "functor",
  "frozen",
  "freeze",
  "format_time",
  "format_time",
  "format_predicate",
  "format",
  "format",
  "format",
  "forall",
  "flush_output",
  "flush_output",
  "float",
  "flag",
  "findnsols",
  "findnsols",
  "findall",
  "findall",
  "find_chr_constraint",
  "fill_buffer",
  "file_search_path",
  "file_name_extension",
  "file_directory_name",
  "file_base_name",
  "fast_write",
  "fast_term_serialized",
  "fast_read",
  "false",
  "fail",
  "export",
  "explain",
  "explain",
  "expects_dialect",
  "expand_term",
  "expand_term",
  "expand_query",
  "expand_goal",
  "expand_goal",
  "expand_file_search_path",
  "expand_file_name",
  "expand_answer",
  "exists_source",
  "exists_file",
  "exists_directory",
  "exception",
  "erase",
  "ensure_loaded",
  "engine_yield",
  "engine_self",
  "engine_post",
  "engine_post",
  "engine_next_reified",
  "engine_next",
  "engine_fetch",
  "engine_destroy",
  "engine_create",
  "engine_create",
  "endif",
  "encoding",
  "empty_nb_set",
  "empty_assoc",
  "else",
  "elif",
  "edit",
  "edit",
  "dynamic",
  "dynamic",
  "dwim_predicate",
  "dwim_match",
  "dwim_match",
  "duplicate_term",
  "downcase_atom",
  "divmod",
  "discontiguous",
  "directory_files",
  "dif",
  "dict_pairs",
  "dict_create",
  "deterministic",
  "delete_import_module",
  "delete_file",
  "delete_directory",
  "delays_residual_program",
  "del_dict",
  "del_attrs",
  "del_attr",
  "default_module",
  "debugging",
  "debugging",
  "debug_control_hook",
  "debug",
  "debug",
  "debug",
  "dde_unregister_service",
  "dde_request",
  "dde_register_service",
  "dde_poke",
  "dde_execute",
  "dde_current_service",
  "dde_current_connection",
  "dcg_translate_rule",
  "dcg_translate_rule",
  "day_of_the_week",
  "date_time_value",
  "date_time_stamp",
  "cyclic_term",
  "current_trie",
  "current_table",
  "current_stream",
  "current_signal",
  "current_prolog_flag",
  "current_predicate",
  "current_predicate",
  "current_output",
  "current_op",
  "current_module",
  "current_locale",
  "current_key",
  "current_input",
  "current_functor",
  "current_format_predicate",
  "current_foreign_library",
  "current_flag",
  "current_engine",
  "current_char_conversion",
  "current_blob",
  "current_atom",
  "current_arithmetic_function",
  "create_prolog_flag",
  "copy_term_nat",
  "copy_term",
  "copy_term",
  "copy_stream_data",
  "copy_stream_data",
  "copy_predicate_clauses",
  "convert_time",
  "convert_time",
  "context_module",
  "consult",
  "compound_name_arity",
  "compound_name_arguments",
  "compound",
  "compiling",
  "compile_predicates",
  "compile_aux_clauses",
  "compare",
  "comment_hook",
  "collation_key",
  "code_type",
  "close_shared_object",
  "close_dde_conversation",
  "close",
  "close",
  "clause_property",
  "clause",
  "clause",
  "chr_type",
  "chr_trace",
  "chr_show_store",
  "chr_option",
  "chr_notrace",
  "chr_leash",
  "chr_constraint",
  "chdir",
  "character_count",
  "char_type",
  "char_conversion",
  "char_code",
  "catch",
  "cancel_halt",
  "callable",
  "call_with_inference_limit",
  "call_with_depth_limit",
  "call_shared_object_function",
  "call_residue_vars",
  "call_residual_program",
  "call_delays",
  "call_dcg",
  "call_cleanup",
  "call_cleanup",
  "call",
  "call",
  "byte_count",
  "break_hook",
  "break",
  "blob",
  "between",
  "bagof",
  "b_setval",
  "b_set_dict",
  "b_getval",
  "autoload_path",
  "autoload",
  "attvar",
  "attribute_goals",
  "attr_unify_hook",
  "attr_portray_hook",
  "attach_packs",
  "attach_packs",
  "attach_packs",
  "attach_console",
  "atomics_to_string",
  "atomics_to_string",
  "atomic_list_concat",
  "atomic_list_concat",
  "atomic_concat",
  "atomic",
  "atom_to_term",
  "atom_string",
  "atom_prefix",
  "atom_number",
  "atom_length",
  "atom_concat",
  "atom_codes",
  "atom_chars",
  "atom",
  "at_halt",
  "at_end_of_stream",
  "at_end_of_stream",
  "assoc_to_list",
  "assertz",
  "assertz",
  "assertion",
  "asserta",
  "asserta",
  "assert",
  "assert",
  "arg",
  "apropos",
  "apply",
  "append",
  "add_nb_set",
  "add_nb_set",
  "add_import_module",
  "acyclic_term",
  "access_file",
  "absolute_file_name",
  "absolute_file_name",
  "abort",
  "abolish_table_subgoals",
  "abolish_nonincremental_tables",
  "abolish_nonincremental_tables",
  "abolish_module_tables",
  "abolish_all_tables",
  "abolish",
  "abolish"
];

var hintWords = keywords;

// hint words
try {
  console.log(`Registering hintWords for prolog mode.`);
  CodeMirror.registerHelper("hintWords", "prolog", hintWords);
} catch (error) {
  console.log(`Failed to register hintWords for prolog mode. ${error}`);
}

(CodeMirror as any).defineMode(
  "prolog",
  (conf: CodeMirror.EditorConfiguration, parserConfig: any) => {
    var config = {
      quasiQuotations: true /* {|Syntax||Quotation|} */,
      dicts: true /* tag{k:v, ...} */,
      unicodeEscape: true /* \uXXXX and \UXXXXXXXX */,
      multiLineQuoted: true /* "...\n..." */,
      groupedIntegers: true /* 10 000 or 10_000 */
    };

    let quoteType: { [key: string]: string } = {
      '"': "string",
      "'": "qatom",
      "`": "bqstring"
    };

    var isSingleEscChar = /[abref\\'"nrtsv]/;
    var isOctalDigit = /[0-7]/;
    var isHexDigit = /[0-9a-fA-F]/;

    //var isSymbolChar = /[-#$&*+./:<=>?@\\^~]/;	/* Prolog glueing symbols chars */
    var isSoloChar = /[[\]{}(),;|!]/; /* Prolog solo chars */
    var isNeck = /^(:-|-->)$/;
    var isControlOp = /^(,|;|->|\*->|\\+|\|)$/;

    function chain(stream: any, state: any, f: any) {
      state.tokenize = f;
      return f(stream, state);
    }

    function readDigits(stream: any, re: any, count: any) {
      if (count > 0) {
        while (count-- > 0) {
          if (!re.test(stream.next())) return false;
        }
      } else {
        while (re.test(stream.peek())) stream.next();
      }
      return true;
    }

    function readEsc(stream: any) {
      var next = stream.next();
      if (isSingleEscChar.test(next)) return true;
      switch (next) {
        case "u":
          if (config.unicodeEscape)
            return readDigits(stream, isHexDigit, 4); /* SWI */
          return false;
        case "U":
          if (config.unicodeEscape)
            return readDigits(stream, isHexDigit, 8); /* SWI */
          return false;
        case null:
          return true; /* end of line */
        case "c":
          stream.eatSpace();
          return true;
        case "x":
          return readDigits(stream, isHexDigit, 2);
      }
      if (isOctalDigit.test(next)) {
        if (!readDigits(stream, isOctalDigit, -1)) return false;
        if (stream.peek() == "\\")
          /* SWI: optional closing \ */
          stream.next();
        return true;
      }
      return false;
    }

    function nextUntilUnescaped(stream: any, state: any, end: any) {
      var next;
      while ((next = stream.next()) != null) {
        if (next == end && end != stream.peek()) {
          state.nesting.pop();
          return false;
        }
        if (next == "\\") {
          if (!readEsc(stream)) return false;
        }
      }
      return config.multiLineQuoted;
    }

    /*******************************
     *	CONTEXT NESTING		*
     *******************************/

    function nesting(state: any) {
      return state.nesting.slice(-1)[0];
    }

    /* Called on every non-comment token */
    function setArg1(state: any) {
      var nest = nesting(state);
      if (nest) {
        if (nest.arg == 0)
          /* nested in a compound */
          nest.arg = 1;
        else if (nest.type == "control") state.goalStart = false;
      } else state.goalStart = false;
    }

    function setArgAlignment(state: any) {
      var nest = nesting(state);
      if (nest && !nest.alignment && nest.arg != undefined) {
        if (nest.arg == 0)
          nest.alignment = nest.leftCol ? nest.leftCol + 4 : nest.column + 4;
        else nest.alignment = nest.column + 1;
      }
    }

    function nextArg(state: any) {
      var nest = nesting(state);
      if (nest) {
        if (nest.arg)
          /* nested in a compound */
          nest.arg++;
        else if (nest.type == "control")
          state.goalStart = true; /* FIXME: also needed for ; and -> */
      } else state.goalStart = true;
    }

    function isControl(state: any) {
      /* our terms are goals */
      var nest = nesting(state);
      if (nest) {
        if (nest.type == "control") {
          return true;
        }
        return false;
      } else return state.inBody;
    }

    // Used as scratch variables to communicate multiple values without
    // consing up tons of objects.
    var type: any, content: any;
    function ret(tp: any, style: any, cont: any) {
      type = tp;
      content = cont;
      return style;
    }

    function peekSpace(stream: any) {
      /* TBD: handle block comment as space */
      if (stream.eol() || /[\s%]/.test(stream.peek())) return true;
      return false;
    }

    /*******************************
     *	   SUB TOKENISERS	*
     *******************************/

    function plTokenBase(stream: any, state: any) {
      var ch = stream.next();

      if (ch == "(") {
        if (state.lastType == "functor") {
          state.nesting.push({
            functor: state.functorName,
            column: stream.column(),
            leftCol: state.functorColumn,
            arg: 0
          });
          delete state.functorName;
          delete state.functorColumn;
        } else {
          state.nesting.push({
            type: "control",
            closeColumn: stream.column(),
            alignment: stream.column() + 4
          });
        }
        return ret("solo", null, "(");
      }

      if (ch == "{" && state.lastType == "tag") {
        state.nesting.push({
          tag: state.tagName,
          column: stream.column(),
          leftCol: state.tagColumn,
          arg: 0
        });
        delete state.tagName;
        delete state.tagColumn;
        return ret("dict_open", null, null);
      }

      if (ch == "/" && stream.eat("*"))
        return chain(stream, state, plTokenComment);

      if (ch == "%") {
        stream.skipToEnd();
        return ret("comment", "comment", null);
      }

      setArg1(state);

      if (isSoloChar.test(ch)) {
        switch (ch) {
          case ")":
            state.nesting.pop();
            break;
          case "]":
            state.nesting.pop();
            return ret("list_close", null, "]");
          case "}": {
            var nest = nesting(state);
            var type = nest && nest.tag ? "dict_close" : "brace_term_close";

            state.nesting.pop();
            return ret(type, null, null);
          }
          case ",":
            if (stream.eol()) state.commaAtEOL = true;
            nextArg(state);
          /*FALLTHROUGH*/
          case ";":
            if (isControl(state)) state.goalStart = true;
            break;
          case "[":
            state.nesting.push({
              type: "list",
              closeColumn: stream.column(),
              alignment: stream.column() + 2
            });
            return ret("list_open", null, "[");
            break;
          case "{":
            if (config.quasiQuotations && stream.eat("|")) {
              state.nesting.push({
                type: "quasi-quotation",
                alignment: stream.column() + 1
              });
              return ret("qq_open", "qq_open", null);
            } else {
              state.nesting.push({
                type: "curly",
                closeColumn: stream.column(),
                alignment: stream.column() + 2
              });
              return ret("brace_term_open", null, null);
            }
            break;
          case "|":
            if (config.quasiQuotations) {
              if (stream.eat("|")) {
                state.tokenize = plTokenQuasiQuotation;
                return ret("qq_sep", "qq_sep", null);
              } else if (stream.eat("}")) {
                state.nesting.pop();
                return ret("qq_close", "qq_close", null);
              }
            }
            if (isControl(state)) state.goalStart = true;
            break;
        }
        return ret("solo", null, ch);
      }

      if (ch == '"' || ch == "'" || ch == "`") {
        state.nesting.push({ type: "quoted", alignment: stream.column() + 1 });
        return chain(stream, state, plTokenString(ch));
      }

      if (ch == "0") {
        if (stream.eat(/x/i)) {
          stream.eatWhile(/[\da-f]/i);
          return ret("number", "number", null);
        }
        if (stream.eat(/o/i)) {
          stream.eatWhile(/[0-7]/i);
          return ret("number", "number", null);
        }
        if (stream.eat(/'/)) {
          /* 0' */
          var next = stream.next();
          if (next == "\\") {
            if (!readEsc(stream)) return ret("error", "error", null);
          }
          return ret("code", "code", null);
        }
      }

      if (/\d/.test(ch) || (/[+-]/.test(ch) && stream.eat(/\d/))) {
        if (config.groupedIntegers)
          stream.match(/^\d*((_|\s+)\d+)*(?:\.\d+)?(?:[eE][+\-]?\d+)?/);
        else stream.match(/^\d*(?:\.\d+)?(?:[eE][+\-]?\d+)?/);
        return ret(
          ch == "-" ? "neg-number" : ch == "+" ? "pos-number" : "number",
          null,
          null
        );
      }

      if (ctype.symbol(ch)) {
        stream.eatWhile(ctype.symbol);
        var atom = stream.current();
        if (atom == "." && peekSpace(stream)) {
          if (nesting(state)) {
            return ret("fullstop", "error", atom);
          } else {
          }
          return ret("fullstop", "fullstop", atom);
        } else if (isNeck.test(atom)) {
          return ret("neck", "neck", atom);
        } else if (isControl(state) && isControlOp.test(atom)) {
          state.goalStart = true;
          return ret("symbol", "operator", atom);
        } else return ret("symbol", "operator", atom);
      }

      stream.eatWhile(ctype.id_continue);
      var word = stream.current();
      if (stream.peek() == "{" && config.dicts) {
        state.tagName = word; /* tmp state extension */
        state.tagColumn = stream.column();
        return ret("tag", "tag", word);
      } else if (ch == "_") {
        if (word.length == 1) {
          return ret("var", "anon", word);
        } else {
          var sec = word.charAt(1);
          if (ctype.uppercase(sec)) return ret("var", "var-2", word);
        }
        return ret("var", "var", word);
      } else if (ctype.uppercase(ch)) {
        return ret("var", "var", word);
      } else if (stream.peek() == "(") {
        state.functorName = word; /* tmp state extension */
        state.functorColumn = stream.column();
        return ret("functor", "functor", word);
      } else return ret("atom", "atom", word);
    }

    function plTokenString(quote: any) {
      return function(stream: any, state: any) {
        if (!nextUntilUnescaped(stream, state, quote)) {
          state.tokenize = plTokenBase;
          if (stream.peek() == "(") {
            /* 'quoted functor'() */
            var word = stream.current();
            state.functorName = word; /* tmp state extension */
            return ret("functor", "functor", word);
          }
          if (stream.peek() == "{" && config.dicts) {
            /* 'quoted tag'{} */
            var word = stream.current();
            state.tagName = word; /* tmp state extension */
            return ret("tag", "tag", word);
          }
        }
        return ret(quoteType[quote], quoteType[quote], null);
      };
    }

    function plTokenQuasiQuotation(stream: any, state: any) {
      var maybeEnd = false,
        ch;
      while ((ch = stream.next())) {
        if (ch == "}" && maybeEnd) {
          state.tokenize = plTokenBase;
          stream.backUp(2);
          break;
        }
        maybeEnd = ch == "|";
      }
      return ret("qq_content", "qq_content", null);
    }

    function plTokenComment(stream: any, state: any) {
      var maybeEnd = false,
        ch;
      while ((ch = stream.next())) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = plTokenBase;
          break;
        }
        maybeEnd = ch == "*";
      }
      return ret("comment", "comment", null);
    }

    /*******************************
     *	   RETURN OBJECT	*
     *******************************/

    return {
      startState: function() {
        return {
          tokenize: plTokenBase,
          inBody: false,
          goalStart: false,
          lastType: null,
          nesting: new Array() /* ([{}]) nesting FIXME: copy this */,
          curTerm: null /* term index in metainfo */,
          curToken: null /* token in term */
        };
      },

      token: function(stream: any, state: any) {
        //var nest;

        if (state.curTerm == null && parserConfig.metainfo) {
          state.curTerm = 0;
          state.curToken = 0;
        }

        if (stream.sol()) delete state.commaAtEOL;

        if (state.tokenize == plTokenBase && stream.eatSpace()) {
          if (stream.eol()) setArgAlignment(state);
          return null;
        }

        // temporarily disabled
        // TODO: match only atoms
        //for (var i = 0; i < keywords.length; i++) {
        //  if (stream.match(keywords[i])) {
        //    return "keyword strong";
        //  }
        //}

        var style = state.tokenize(stream, state);

        if (stream.eol()) setArgAlignment(state);

        if (type == "neck") {
          state.inBody = true;
          state.goalStart = true;
        } else if (type == "fullstop") {
          state.inBody = false;
          state.goalStart = false;
        }

        state.lastType = type;

        if (typeof parserConfig.enrich == "function")
          style = parserConfig.enrich(stream, state, type, content, style);

        return style;
      },

      indent: function(state: any, textAfter: any) {
        if (state.tokenize == plTokenComment) return CodeMirror.Pass;

        var nest;
        if ((nest = nesting(state))) {
          if (nest.closeColumn && !state.commaAtEOL) return nest.closeColumn;
          return nest.alignment;
        }
        if (!state.inBody) return 0;

        return 4;
      },

      /*
    let prologConf: any = {};
    for (let prop in parserConf) {
      if (parserConf.hasOwnProperty(prop)) {
        prologConf[prop] = parserConf[prop];
      }
    }
    prologConf.name = "python";
    prologConf.version = 3;
    prologConf.extra_keywords = keywords;

    console.log(`Prolog mode called.`);

      // categories: number, comment, variable, string, atom, builtin, keyword

      token: function(stream: any, state: any) {

        if (stream.eat("%")) {
              stream.skipToEnd();
              return "comment";
          }
          else if (stream.match("/ *")) {

            // consume the input until a matching end-comment is found
            console.log(`Entering block comment.`);

            do {

              if (stream.match("* /"))
                return "comment";

              stream.next();

            } while(!stream.eol());
          }

          for (var i = 0; i < keywords.length; i++) {
            if (stream.match(keywords[i])) {
              return "keyword strong";
            }
          }

        stream.next();

        return "atom";
      }, */

      theme: "prolog",

      blockCommentStart: "/*" /* continuecomment.js support */,
      blockCommentEnd: "*/",
      blockCommentContinue: " * ",
      lineComment: "%",
      electricInput: /^\s*[\}\]\)]$/
    };
  }
);

console.log(`Registering CodeMirror prolog MIME mode.`);

CodeMirror.defineMIME(PROLOG_MIME_TYPE, PROLOG_MODE);

(CodeMirror as any).modeInfo.push({
  ext: [PROLOG_EXTENSION],
  mime: PROLOG_MIME_TYPE,
  mode: PROLOG_MODE,
  name: PROLOG_NAME
});
