window.onload = function() {
    var editor1 = ace.edit("editor1");
    editor1.setTheme("ace/theme/clouds");
    editor1.getSession().setMode("ace/mode/groovy");
    
    var commands1 = editor1.commands;

    commands1.addCommand({
        name: "save1",
        bindKey: {
        win: "Ctrl-S",
        mac: "Command-S",
        sender: "editor1"
      },
      exec: function() {
        var value = editor1.getSession().getValue();
        submitForm(value, "#output1");
      }
    });
    
    var editor2 = ace.edit("editor2");
    editor2.setTheme("ace/theme/clouds");
    editor2.getSession().setMode("ace/mode/groovy");
    
    var commands2 = editor2.commands;

    commands2.addCommand({
        name: "save2",
        bindKey: {
        win: "Ctrl-S",
        mac: "Command-S",
        sender: "editor2"
      },
      exec: function() {
        var value = editor2.getSession().getValue();
        value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
        submitForm(value, "#output2");
      }
    });

    commands2.addCommand({
        name: "step1",
        bindKey: {
        win: "1",
        mac: "1",
        sender: "editor2"
      },
      exec: function() {
        var value = "abstract class SurveyScript extends Script {\n" +
	                "  def ask  = {String question -> println question }\n" +
                    "}";
        editor2.gotoLine(1);
        editor2.insert(value);
      }
    });   
    
    commands2.addCommand({
        name: "step2",
        bindKey: {
        win: "2",
        mac: "2",
        sender: "editor2"
      },
      exec: function() {
        editor2.gotoLine(9);
        editor2.removeLines();
        editor2.removeLines();
        editor2.removeLines();
      }
    }); 
    
    commands2.addCommand({
        name: "step3",
        bindKey: {
        win: "3",
        mac: "3",
        sender: "editor2"
      },
      exec: function() {
        var value = "def compilerConfiguration = new CompilerConfiguration()\n" +
                    "compilerConfiguration.scriptBaseClass = SurveyScript.class.name\n" +
                    "def binding = new Binding()\n";
        editor2.gotoLine(5);
        editor2.insert(value);
      }
    });     
    
    commands2.addCommand({
        name: "step4",
        bindKey: {
        win: "4",
        mac: "4",
        sender: "editor2"
      },
      exec: function() {
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

    commands3.addCommand({
        name: "save3",
        bindKey: {
        win: "Ctrl-S",
        mac: "Command-S",
        sender: "editor3"
      },
      exec: function() {
        var value = editor3.getSession().getValue();
        submitForm(value, "#output3");
      }
    });
    
    var editor4 = ace.edit("editor4");
    editor4.setTheme("ace/theme/clouds");
    
    var commands4 = editor4.commands;

    commands4.addCommand({
        name: "save4",
        bindKey: {
        win: "Ctrl-S",
        mac: "Command-S",
        sender: "editor4"
      },
      exec: function() {
        var value = editor4.getSession().getValue();
        submitDSLForm(value, "#output4");
      }
    });
    

    
};
function submitForm(input, output) { 

    //var url = "http://dslprez.cloudfoundry.com/console/execute?=";
	var url = "http://localhost:8080/DslPrez/console/execute?="; 
	$.post(url, {content : input}, function(data) {
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
	//var url = "http://dslprez.cloudfoundry.com/dslConsole/execute?=";
	var url = "http://localhost:8080/DslPrez/dslConsole/execute?="; 
	$.post(url, {content : scriptContent}, function(data) {
		var value = "";
		var inputs = {}
		
		if (data.stacktrace === "" || data.stacktrace.buffer !== undefined) {
			value = data.result;
			inputs = data.inputs;
			
		} else {
			value = data.stacktrace;
		}
		$(output).text(inputs.questions[inputs.counter -1]);
		$("#output4").data('inputs', inputs);
		$("#output4").data('scriptContent', scriptContent);
	   	impress().next();
	});	
}

$('#submitButton').bind('click', function () {
	var answer = $('#answer').val();
	var inputs = $("#output4").data('inputs');
	inputs.answers[inputs.counter - 1] = answer;
	var scriptContent = $("#output4").data('scriptContent');
	
	
	var url = "http://localhost:8080/DslPrez/dslConsole/execute?="; 
	$.post(url, {content : scriptContent, inputs : inputs}, function(data) {
		var value = "";
		var inputs = {}
		if (data.stacktrace === "" || data.stacktrace.buffer !== undefined) {
			value = data.result;
			inputs = data.inputs;
			
		} else {
			value = data.stacktrace;
		}
		$("#output4").text(inputs.questions[inputs.counter -1]);
	});	
});

