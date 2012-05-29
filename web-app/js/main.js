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
        submitForm(value, "#output2");
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
//var url = "http://giveatry.cloudfoundry.com/console/execute?=";
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

