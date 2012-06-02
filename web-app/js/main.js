window.onload = function() {
		  
	
	var editor1 = ace.edit("editor1");
	editor1.setTheme("ace/theme/clouds");
	editor1.getSession().setMode("ace/mode/groovy");

	var commands1 = editor1.commands;

	commands1.addCommand({
		name : "save1",
		bindKey : {
			win : "Ctrl-S",
			mac : "Command-S",
			sender : "editor1"
		},
		exec : function() {
			var value = editor1.getSession().getValue();
			submitForm(value, "#output1");
		}
	});

	var editor2 = ace.edit("editor2");
	editor2.setTheme("ace/theme/clouds");
	editor2.getSession().setMode("ace/mode/groovy");

	var commands2 = editor2.commands;

	commands2
			.addCommand({
				name : "save2",
				bindKey : {
					win : "Ctrl-S",
					mac : "Command-S",
					sender : "editor2"
				},
				exec : function() {
					var value = editor2.getSession().getValue();
					value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
					submitForm(value, "#output2");
				}
			});

	commands2.addCommand({
		name : "step1",
		bindKey : {
			win : "1",
			mac : "1",
			sender : "editor2"
		},
		exec : function() {
			var value = "abstract class SurveyScript extends Script {\n"
					+ "  def ask  = {String question -> println question }\n"
					+ "}";
			editor2.gotoLine(1);
			editor2.insert(value);
		}
	});

	commands2.addCommand({
		name : "step2",
		bindKey : {
			win : "2",
			mac : "2",
			sender : "editor2"
		},
		exec : function() {
			editor2.gotoLine(9);
			editor2.removeLines();
			editor2.removeLines();
			editor2.removeLines();
		}
	});

	commands2
			.addCommand({
				name : "step3",
				bindKey : {
					win : "3",
					mac : "3",
					sender : "editor2"
				},
				exec : function() {
					var value = "def compilerConfiguration = new CompilerConfiguration()\n"
							+ "compilerConfiguration.scriptBaseClass = SurveyScript.class.name\n"
							+ "def binding = new Binding()\n";
					editor2.gotoLine(5);
					editor2.insert(value);
				}
			});

	commands2
			.addCommand({
				name : "step4",
				bindKey : {
					win : "4",
					mac : "4",
					sender : "editor2"
				},
				exec : function() {
					editor2.gotoLine(8);
					editor2.removeLines();
					var value = "def shell = new GroovyShell(this.class.classLoader, binding, compilerConfiguration)\n"
					editor2.gotoLine(8);
					editor2.insert(value);
				}
			});

	var editor3 = ace.edit("editor3");
	editor3.setTheme("ace/theme/clouds");
	editor3.getSession().setMode("ace/mode/groovy");

	var commands3 = editor3.commands;

	commands3
			.addCommand({
				name : "save3",
				bindKey : {
					win : "Ctrl-S",
					mac : "Command-S",
					sender : "editor3"
				},
				exec : function() {
					var value = editor3.getSession().getValue();
					value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
					submitForm(value, "#output3");
				}
			});

	commands3.addCommand({
		name : "step1",
		bindKey : {
			win : "1",
			mac : "1",
			sender : "editor3"
		},
		exec : function() {
			var value = "ask \"what is your name?\" into name\n"
					+ "ask \"what is your birthdate?\" into date\n";
			editor3.gotoLine(17);
			editor3.removeLines();
			editor3.insert(value);
		}
	});

	commands3.addCommand({
		name : "step2",
		bindKey : {
			win : "2",
			mac : "2",
			sender : "editor3"
		},
		exec : function() {
			var value = "    return this\n";
			editor3.gotoLine(4);
			editor3.insert(value);
		}
	});

	commands3.addCommand({
		name : "step3",
		bindKey : {
			win : "3",
			mac : "3",
			sender : "editor3"
		},
		exec : function() {
			editor3.gotoLine(6);
			var value = "  def into(variable) {\n" + "  }\n";
			editor3.insert(value);
		}
	});

	commands3.addCommand({
		name : "step4",
		bindKey : {
			win : "4",
			mac : "4",
			sender : "editor3"
		},
		exec : function() {
			editor3.gotoLine(2);
			var value = "  def map = [:]\n";
			editor3.insert(value);
		}
	});

	commands3.addCommand({
		name : "step5",
		bindKey : {
			win : "5",
			mac : "5",
			sender : "editor3"
		},
		exec : function() {
			editor3.gotoLine(2);
			var value = "  def i = 1;\n";
			editor3.insert(value);
			editor3.gotoLine(5);
			editor3.removeLines();
			value = "    map[\"question$i\"] = question\n";
			editor3.insert(value);
			editor3.gotoLine(9);
			value = "    map[\"variable$i\"] = variable\n    i++\n";
			editor3.insert(value);
		}
	});

	commands3.addCommand({
		name : "step6",
		bindKey : {
			win : "6",
			mac : "6",
			sender : "editor3"
		},
		exec : function() {
			editor3.gotoLine(12);
			var value = "  def propertyMissing(def propertyName) {\n"
					+ "    propertyName\n" + "  }\n";
			editor3.insert(value);
			editor3.gotoLine(29);
			var value = "println map\n";
			editor3.insert(value);
			editor3.scrollToRow(1);
			editor3.setHighlightActiveLine(true);
		}
	});

	var editor4 = ace.edit("editor4");
	editor4.setTheme("ace/theme/clouds");
	editor4.getSession().setMode("ace/mode/groovy");
	
	var commands4 = editor4.commands;

	commands4.addCommand({
		name : "save4",
		bindKey : {
			win : "Ctrl-S",
			mac : "Command-S",
			sender : "editor4"
		},
		exec : function() {
			var value = editor4.getSession().getValue();
			value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
			submitForm(value, "#output4");
		}
	});

	commands4.addCommand({
		name : "step1",
		bindKey : {
			win : "1",
			mac : "1",
			sender : "editor4"
		},
		exec : function() {
			editor4.gotoLine(31);
			editor4.removeLines();
			editor4.removeLines();
			var value = "ask \"what is your name?\" assign into name\nask \"what is your birthdate?\" assign into date\n"
			editor4.insert(value);
		}
	});

	commands4.addCommand({
		name : "step2",
		bindKey : {
			win : "2",
			mac : "2",
			sender : "editor4"
		},
		exec : function() {
			editor4.gotoLine(11);
			editor4.removeLines();
			editor4.removeLines();
			editor4.removeLines();
			editor4.removeLines();
			var value = "  def assign(into) {\n  }\n"
			editor4.insert(value);
		}
	});
	
	commands4.addCommand({
		name : "step3",
		bindKey : {
			win : "3",
			mac : "3",
			sender : "editor4"
		},
		exec : function() {
			editor4.gotoLine(12);
			var value = "    [:].withDefault { variable ->\n      map[\"variable$j\"] = variable\n      j++\n    }\n";
			editor4.insert(value);
		}
	});
	
	commands4.addCommand({
		name : "step4",
		bindKey : {
			win : "4",
			mac : "4",
			sender : "editor4"
		},
		exec : function() {
			editor4.gotoLine(4);
			var value = "  def j = 1\n"
			editor4.insert(value);
			editor4.gotoLine(9);
			var value = "    i++\n"
			editor4.insert(value);
		}
	});
	
	var editor5 = ace.edit("editor5");
	editor5.setTheme("ace/theme/clouds");
	editor5.getSession().setMode("ace/mode/groovy");
	
	var commands5 = editor5.commands;

	commands5.addCommand({
		name : "save5",
		bindKey : {
			win : "Ctrl-S",
			mac : "Command-S",
			sender : "editor5"
		},
		exec : function() {
			var value = editor5.getSession().getValue();
			value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
			submitForm(value, "#output5");
		}
	});

	commands5.addCommand({
		name : "step1",
		bindKey : {
			win : "1",
			mac : "1",
			sender : "editor5"
		},
		exec : function() {
			editor5.gotoLine(31);
			editor5.removeLines();
			editor5.removeLines();
			var value = "ask \"what is your name?\" assign into name\nask \"what is your birthdate?\" assign into date\n"
			editor5.insert(value);
		}
	});


}
	
function submitForm(input, output) {

	// var url = "http://dslprez.cloudfoundry.com/console/execute?=";
	var url = "http://localhost:8080/DslPrez/console/execute?=";
	$.post(url, {
		content : input
	}, function(data) {
		var value = "";
		if (data.stacktrace === "" || data.stacktrace.buffer !== undefined) {
			value = data.result;
		} else {
			value = data.stacktrace;
		}
		$(output).text(value);
		impress().next();
	});
}

function submitDSLForm(scriptContent, output) {
	// var url = "http://dslprez.cloudfoundry.com/dslConsole/execute?=";
	var url = "http://localhost:8080/DslPrez/dslConsole/execute?=";
	$.post(url, {
		content : scriptContent
	}, function(data) {
		var value = "";
		var inputs = {}

		if (data.stacktrace === "" || data.stacktrace.buffer !== undefined) {
			value = data.result;
			inputs = data.inputs;

		} else {
			value = data.stacktrace;
		}
		$(output).text(inputs.questions[inputs.counter - 1]);
		$("#output4").data('inputs', inputs);
		$("#output4").data('scriptContent', scriptContent);
		impress().next();
	});
}

$('#submitButton').bind('click', function() {
	var answer = $('#answer').val();
	var inputs = $("#output4").data('inputs');
	inputs.answers[inputs.counter - 1] = answer;
	var scriptContent = $("#output4").data('scriptContent');

	var url = "http://localhost:8080/DslPrez/dslConsole/execute?=";
	$.post(url, {
		content : scriptContent,
		inputs : inputs
	}, function(data) {
		var value = "";
		var inputs = {}
		if (data.stacktrace === "" || data.stacktrace.buffer !== undefined) {
			value = data.result;
			inputs = data.inputs;

		} else {
			value = data.stacktrace;
		}
		$("#output4").text(inputs.questions[inputs.counter - 1]);
	});
});
