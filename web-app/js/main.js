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

    commands1.addCommand({
        name : "step1",
        bindKey : {
            win : "1",
            mac : "1",
            sender : "editor1"
        },
        exec : function() {

            var value = "def ask(question) {\n"
            +"    println \"question: $question\"\n"
            +"}\n"
            +"ask \"what is your name?\"\n";
            editor1.gotoLine(7);
            editor1.insert(value);
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
					+ "  def ask = {question -> println \"question: $question\" }\n"
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
					var value = "def compilerConfig = new CompilerConfiguration()\n"
							+ "compilerConfig.scriptBaseClass = SurveyScript.class.name\n"
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
					var value = "" +
                    "def shell = new GroovyShell(this.class.classLoader,\n" +
                    "                            binding,\n" +
                    "                            compilerConfig)\n";
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
			editor3.gotoLine(15);
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
					+ "    propertyName\n" + "  }\n  def display(Map mapToDisplay) {\n    mapToDisplay.eachWithIndex { key, value, index ->\n      println \"$key: $value\"\n      if (index % 2) { println \"______________________\\n\" }\n    }\n  }\n";
			editor3.insert(value);
			editor3.gotoLine(33);
			value = "display map\n";
			editor3.insert(value);
            editor3.gotoLine(1);
            editor3.scrollToLine();
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
			editor4.gotoLine(42);
			editor4.removeLines();
			editor4.removeLines();
			var value = "ask \"what is your name?\" assign to name\nask \"what is your birthdate?\" assign to date\n"
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
			var value = "  def assign(to) {\n  }\n"
            editor4.insert(value);
            editor4.gotoLine(1);
            editor4.scrollToLine();
            editor4.setHighlightActiveLine(true);
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
			var value = "    [:].withDefault { }\n";
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
			editor4.gotoLine(12);
			editor4.removeLines();
			var value = "    [:].withDefault { variable ->\n      map[\"variable$j\"] = variable\n      j++\n    }\n";
			editor4.insert(value);
			editor4.gotoLine(4);
			var value = "  def j = 1\n"
			editor4.insert(value);
			editor4.gotoLine(9);
			var value = "    i++\n"
			editor4.insert(value);
            editor4.gotoLine(15);
            editor4.scrollToLine();
            editor4.setHighlightActiveLine(true);
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
			value = "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n"
			+"import org.codehaus.groovy.ast.*\n"
			+"import org.codehaus.groovy.ast.expr.*\n"
			+"import org.codehaus.groovy.ast.stmt.*\n"
			+"import org.codehaus.groovy.classgen.GeneratorContext\n"
			+"import org.codehaus.groovy.control.CompilationFailedException\n"
			+"import org.codehaus.groovy.control.CompilePhase\n"
			+"import org.codehaus.groovy.control.CompilerConfiguration\n"
			+"import org.codehaus.groovy.control.SourceUnit\n"
			+"import org.codehaus.groovy.control.customizers.*\n"
			+"import org.codehaus.groovy.ast.builder.AstBuilder\n"
			+"import org.codehaus.groovy.syntax.Token\n"
			+"import org.codehaus.groovy.syntax.Types\n"
			+"import static org.objectweb.asm.Opcodes.ACC_PUBLIC\n" + value;
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
			editor5.gotoLine(5);
			var value = "binding.setVariable(\"whichMeal\", \"What would you like to have for lunch?\")\n";
			editor5.insert(value);
		}
	});
	
	commands5.addCommand({
		name : "step2",
		bindKey : {
			win : "2",
			mac : "2",
			sender : "editor5"
		},
		exec : function() {
			editor5.gotoLine(12);
			var value = "ask whichMeal assign to meal\n";
			editor5.insert(value);
		}
	});

    var editor6 = ace.edit("editor6");
    editor6.setTheme("ace/theme/clouds");
    editor6.getSession().setMode("ace/mode/groovy");

    var commands6 = editor6.commands;

    commands6.addCommand({
        name : "save6",
        bindKey : {
            win : "Ctrl-S",
            mac : "Command-S",
            sender : "editor6"
        },
        exec : function() {
            var value = editor6.getSession().getValue();
            value = "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n"
                +"import org.codehaus.groovy.ast.*\n"
                +"import org.codehaus.groovy.ast.expr.*\n"
                +"import org.codehaus.groovy.ast.stmt.*\n"
                +"import org.codehaus.groovy.classgen.GeneratorContext\n"
                +"import org.codehaus.groovy.control.CompilationFailedException\n"
                +"import org.codehaus.groovy.control.CompilePhase\n"
                +"import org.codehaus.groovy.control.CompilerConfiguration\n"
                +"import org.codehaus.groovy.control.SourceUnit\n"
                +"import org.codehaus.groovy.control.customizers.*\n"
                +"import org.codehaus.groovy.ast.builder.AstBuilder\n"
                +"import org.codehaus.groovy.syntax.Token\n"
                +"import org.codehaus.groovy.syntax.Types\n"
                +"import static org.objectweb.asm.Opcodes.ACC_PUBLIC\n" + value;
            submitForm(value, "#output6");
        }
    });

    var editor7 = ace.edit("editor7");
    editor7.setTheme("ace/theme/clouds");
    editor7.getSession().setMode("ace/mode/groovy");

    var commands7 = editor7.commands;

    commands7.addCommand({
        name : "save7",
        bindKey : {
            win : "Ctrl-S",
            mac : "Command-S",
            sender : "editor7"
        },
        exec : function() {
            var value = editor7.getSession().getValue();
            value = "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n"
                +"import org.codehaus.groovy.ast.*\n"
                +"import org.codehaus.groovy.ast.expr.*\n"
                +"import org.codehaus.groovy.ast.stmt.*\n"
                +"import org.codehaus.groovy.classgen.GeneratorContext\n"
                +"import org.codehaus.groovy.control.CompilationFailedException\n"
                +"import org.codehaus.groovy.control.CompilePhase\n"
                +"import org.codehaus.groovy.control.CompilerConfiguration\n"
                +"import org.codehaus.groovy.control.SourceUnit\n"
                +"import org.codehaus.groovy.control.customizers.*\n"
                +"import org.codehaus.groovy.ast.builder.AstBuilder\n"
                +"import org.codehaus.groovy.syntax.Token\n"
                +"import org.codehaus.groovy.syntax.Types\n"
                +"import static org.objectweb.asm.Opcodes.ACC_PUBLIC\n" + value;
            submitForm(value, "#output7");
        }
    });

    var editor8 = ace.edit("editor8");
	editor8.setTheme("ace/theme/clouds");
	editor8.getSession().setMode("ace/mode/groovy");

	var commands8 = editor8.commands;

	commands8.addCommand({
		name : "save8",
		bindKey : {
			win : "Ctrl-S",
			mac : "Command-S",
			sender : "editor8"
		},
		exec : function() {
			var value = editor8.getSession().getValue();
			var title = $('#titleCreate').val();			
			submitCreateForm(title, value, "#output8");
		}
	});

};
	
function submitCreateForm(title, input, output) {
	var url = "http://localhost:8080/DslPrez/survey/create?=";
	//var url = "http://dslprez.cloudfoundry.com/survey/create?=";
	$.post(url, {
		title:"myScript", content:input
	},function (data) {
		$("#displayQuestion").removeData();
		$('.displayAnswer').remove();
		$(".surveystart").show();
		$("#displayQuestion").data('scriptId', data.id);
		$("#displayQuestion").data('scriptContent', data.content);
		$('#scriptContent').text(data.content)
		$('#submitButton').click();
	});
}




		
function submitForm(input, output) {
	//var url = "http://dslprez.cloudfoundry.com/console/execute?=";
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

$('#submitButton').bind('click', function() {
	var answer = $('#answer').val();
	$('#answer').val('');
	var answerMap = $("#displayQuestion").data('answerMap');
    var question = $("#displayQuestion").data('question');
	var scriptId = $("#displayQuestion").data('scriptId');
	var counter = $("#displayQuestion").data('counter');
	var lastAssignment = $("#displayQuestion").data('lastAssignment');
	if (answerMap)
	  answerMap[counter] = {variable: lastAssignment, question: question, answer:answer};
	var stringAnswerMap = JSON.stringify(answerMap);
	var url = "http://localhost:8080/DslPrez/survey/run?=";
	//var url = "http://dslprez.cloudfoundry.com/survey/run?=";
	
	$.post(url, {
		scriptId:scriptId, question: question, lastAssignment:lastAssignment, counter:counter, answer:answer, answerMap:stringAnswerMap
	}, function(data) {

		var answerMap = data.answerMap;
		var counter = data.counter;
        var question = data.question;
        var lastAssignment = data.lastAssignment;
		$("#displayQuestion").data('answerMap', answerMap);
        $("#displayQuestion").data('question', question);
		$("#displayQuestion").data('counter', counter);
		$("#displayQuestion").data('lastAssignment', lastAssignment);
		if(data.finished==true) {
			$(".surveystart").hide();
            for(var index = 1; index <= counter;index++)  {
                if (answerMap[index]) {
				    var output8Value = '<div class="displayAnswer">' + answerMap[index].question + ' ' + answerMap[index].answer + '</div>';
			        $("#output8bis").append(output8Value);
                }
			}
		} else {
			$("#displayQuestion").text(data.question);
		}
	});
});

var settings = {
        "size" : {
            "grid" : 22,
            "factor" : 0, // font resize factor, 0 means automatic
            "normalize" : true // reduces outliers for more attractive output
        },
        "options" : {
            "color" : "random-dark",
            "printMultiplier" : 3,
            "rotationRatio" : 0.2, // 0 is all horizontal, 1 is all vertical
            "printMultiplier" : 4 // set to 3 for nice printer output; higher numbers take longer
        },
        "shape" : "circle"
    };

$("#wordcloud").awesomeCloud( settings );

//// At each step
//document.getElementById("impress").addEventListener( "impress:stepenter", function (event) {
//
//    var step = event.target;
//
//    var settings = {
//        "size" : {
//            "grid" : 8
//        },
//        "options" : {
//            "color" : "random-light",
//            "printMultiplier" : 3
//        },
//        "shape" : "circle"
//    }
//    $("#wordcloud").awesomeCloud( settings );
//
//}, false);


$("#technologies").airport([ 'impress.js', 'grails', 'Ace editor', 'jQuery' ]);


function resizeAce1() {
    return $('#editor1').height($(window).height()*0.8);
}
function resizeAce2() {
    return $('#editor2').height($(window).height()*0.8);
}
function resizeAce3() {
    return $('#editor3').height($(window).height()*0.8);
}
function resizeAce4() {
    return $('#editor4').height($(window).height()*0.8);
}
function resizeAce5() {
    return $('#editor5').height($(window).height()*0.8);
}
function resizeAce6() {
    return $('#editor6').height($(window).height()*0.8);
}
function resizeAce7() {
    return $('#editor7').height($(window).height()*0.8);
}
function resizeAce8() {
    return $('#editor8').height($(window).height()*0.8);
}
//listen for changes
$(window).resize(resizeAce1);
$(window).resize(resizeAce2);
$(window).resize(resizeAce3);
$(window).resize(resizeAce4);
$(window).resize(resizeAce5);
$(window).resize(resizeAce6);
$(window).resize(resizeAce7);
$(window).resize(resizeAce8);
//set initially
resizeAce8();
resizeAce7();
resizeAce6();
resizeAce5();
resizeAce4();
resizeAce3();
resizeAce2();
resizeAce1();

