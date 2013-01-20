var myScroll;
function loaded() {
    myScroll = new iScroll('wrapper', {zoom: true});
    myScroll.options.onBeforeScrollStart = function(e) {
        var target = e.target;

        while (target.nodeType != 1) target = target.parentNode;
        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'){
            e.preventDefault();
            return true;
        }
    }
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

/* * * * * * * *
 *
 * Use this for high compatibility (iDevice + Android)
 *
 */
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
/*
 * * * * * * * */


/* * * * * * * *
 *
 * Use this for iDevice only
 *
 */
//document.addEventListener('DOMContentLoaded', loaded, false);
/*
 * * * * * * * */


/* * * * * * * *
 *
 * Use this if nothing else works
 *
 */
//window.addEventListener('load', setTimeout(function () { loaded(); }, 200), false);
/*
 * * * * * * * */




var serverUrl = "http://localhost:8080/DslPrez";
//var serverUrl = "http://dslprez.cloudfoundry.com";

function submitForm(input, output) {
    var url = serverUrl + "/console/execute?=";
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
        $('#next').click();
    });
}

var editor1 = new dslPrez.editor("editor1");
function editor1Key1() {
    var value = "def ask(question) {\n"
        + "    println \"question: $question\"\n"
        + "}\n"
        + "ask \"what is your name?\"\n";
    editor1.replaceRange(value, {line:5, ch:0});
}
function editor1Send() {
    var value = editor1.getValue();
    submitForm(value, "#output1");
}
var keymap = {
    "1" : editor1Key1,
    "Ctrl-S" : editor1Send,
    "Cmd-S" : editor1Send
};
editor1.addKeyMap(keymap);



var editor2 = new dslPrez.editor("editor2");
function editor2Key1() {
    var value = "abstract class SurveyScript extends Script {\n"
        + "  def ask = {question -> println \"question: $question\" }\n"
        + "}\n";
    editor2.replaceRange(value, {line: 1, ch: 0});
}
function editor2Key2() {
    editor2.removeLine(8);
    editor2.removeLine(8);
    editor2.removeLine(8);
}
function editor2Key3() {
    var value = "def compilerConfig = new CompilerConfiguration()\n"
        + "compilerConfig.scriptBaseClass = SurveyScript.class.name\n"
        + "def binding = new Binding()\n";
    editor2.removeLine(5);
    editor2.replaceRange(value, {line: 4, ch: 0});
}
function editor2Key4() {
    editor2.removeLine(7);
    var value = "" +
        "def shell = new GroovyShell(this.class.classLoader,\n" +
        "                            binding,\n" +
        "                            compilerConfig)\n";
    editor2.replaceRange(value, {line: 7, ch: 0});
}
function editor2Send() {
    var value = editor2.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitForm(value, "#output2");
}
var keymap2 = {
    "Ctrl-S" :editor2Send,
    "Cmd-S" :editor2Send,
    "1": editor2Key1,
    "2": editor2Key2,
    "3": editor2Key3,
    "4": editor2Key4
};

editor2.addKeyMap(keymap2);

var editor3 = new dslPrez.editor("editor3");

function editor3Send() {
    var value = editor3.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitForm(value, "#output3");
}
function editor3Key1() {
    var value = "ask \"what is your name?\" into name\n"
        + "ask \"what is your birthdate?\" into date\n";
    editor3.removeLine(14);
    editor3.replaceRange(value, {line: 14, ch: 0});
}
function editor3Key2() {
    editor3.removeLine(2);
    var value = "    return this\n";
    editor3.replaceRange(value, {line: 2, ch: 0});
}
function editor3Key3() {
    var value = "  def into(variable) {\n" + "  }\n";
    editor3.replaceRange(value, {line: 4, ch: 0});
}
function editor3Key4() {
    var value = "  def map = [:]\n";
    editor3.replaceRange(value, {line: 1, ch: 0});
}
function editor3Key5() {
    var value = "  def i = 1;\n";
    editor3.replaceRange(value, {line: 1, ch: 0});
    value = "    map[\"question$i\"] = question\n";
    editor3.replaceRange(value, {line: 4, ch: 0});
    value = "    map[\"variable$i\"] = variable\n    i++\n";
    editor3.replaceRange(value, {line: 8, ch: 0});
}
function editor3Key6() {
    var value = "  def propertyMissing(def propertyName) {\n"
        + "    propertyName\n"
        + "  }\n"
        + "  def display(Map mapToDisplay) {\n"
        + "    mapToDisplay.eachWithIndex { key, value, index ->\n"
        + "      println \"$key: $value\"\n"
        + "      if (index % 2) { println \"______________________\\n\" }\n"
        + "    }\n"
        + "  }\n";
    editor3.replaceRange(value, {line: 11, ch: 0});
    value = "display map\n";
    editor3.replaceRange(value, {line: 32, ch: 0});
}

var keymap3 = {
    "Ctrl-S": editor3Send,
    "Cmd-S": editor3Send,
    "1": editor3Key1,
    "2": editor3Key2,
    "3": editor3Key3,
    "4": editor3Key4,
    "5": editor3Key5,
    "6": editor3Key6
};
editor3.addKeyMap(keymap3);

var editor4 = new dslPrez.editor("editor4");

function editor4Send() {
    var value = editor4.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitForm(value, "#output4");
}
function editor4Key1() {
    editor4.removeLine(40);
    editor4.removeLine(40);
    var value = "ask \"what is your name?\" assign to name\nask \"what is your birthdate?\" assign to date\n";
    editor4.replaceRange(value, {line: 40, ch: 0});
}
function editor4Key2() {
    editor4.removeLine(9);
    editor4.removeLine(9);
    editor4.removeLine(9);
    editor4.removeLine(9);
    var value = "  def assign(to) {\n  }\n";
    editor4.replaceRange(value, {line: 9, ch: 0});
}
function editor4Key3() {
    var value = "    [:].withDefault { }\n";
    editor4.replaceRange(value, {line: 10, ch: 0});
}
function editor4Key4() {
    editor4.removeLine(10);
    var value = "    [:].withDefault { variable ->\n      map[\"variable$j\"] = variable\n      j++\n    }\n";
    editor4.replaceRange(value, {line: 10, ch: 0});
    value = "  def j = 1\n";
    editor4.replaceRange(value, {line: 2, ch: 0});
    value = "    i++\n";
    editor4.replaceRange(value, {line: 7, ch: 0});
}

var keymap4 = {
    "Ctrl-S": editor4Send,
    "Cmd-S": editor4Send,
    "1": editor4Key1,
    "2": editor4Key2,
    "3": editor4Key3,
    "4": editor4Key4
};

editor4.addKeyMap(keymap4);


var editor5 = new dslPrez.editor("editor5");

function editor5Send() {
    var value = editor5.getValue();
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
function editor5Key1() {
    var value = "binding.setVariable(\"whichMeal\", \"What would you like to have for lunch?\")\n";
    editor5.replaceRange(value, {line: 4, ch: 0});
}
function editor5Key2() {
    var value = "ask whichMeal assign to meal\n";
    editor5.replaceRange(value, {line: 11, ch: 0});
}

var keymap5 = {
    "Ctrl-S": editor5Send,
    "Cmd-S": editor5Send,
    "1": editor5Key1,
    "2": editor5Key2
};

editor5.addKeyMap(keymap5);

var editor6 = new dslPrez.editor("editor6");

function editor6Send() {
    var value = editor6.getValue();
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

var keymap6 = {
    "Ctrl-S": editor6Send,
    "Cmd-S": editor6Send
};

editor6.addKeyMap(keymap6);

var editor7 = new dslPrez.editor("editor7");

function editor7Send() {
    var value = editor7.getValue();
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

var keymap7 = {
    "Ctrl-S": editor7Send,
    "Cmd-S": editor7Send
};

editor7.addKeyMap(keymap7);

var editor8 = new dslPrez.editor("editor8");

function editor8Send() {
    var value = editor8.getValue();
    var title = $('#titleCreate').val();
    submitCreateForm(title, value, "#output8");
}

var keymap8 = {
    "Ctrl-S": editor8Send,
    "Cmd-S": editor8Send
};

editor8.addKeyMap(keymap8);

document.getElementById("editor8").addEventListener("touchstart", function(e)
{
    e.preventDefault();
    alert('test2');
});

function submitCreateForm(title, input, output) {
    var url = serverUrl + "/survey/create?=";
    $.post(url, {
        title:"myScript", content:input
    },function (data) {
        $("#displayQuestion").removeData();
        $('.displayAnswer').remove();
        $(".surveystart").show();
        $("#displayQuestion").data('scriptId', data.id);
        $("#displayQuestion").data('scriptContent', data.content);
        $('#scriptContent').text(data.content);
        $('#submitButton').click();
        $('#next').click();
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
    var url = serverUrl + "/survey/run?=";

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
            $('#next').click();
        } else {
            $("#displayQuestion").text(data.question);
        }
    });
});



$("#technologies").airport([ 'Twitter Bootstrap', 'iScroll', 'jCloud', 'jQuery-airport', 'grails', 'Code Mirror', 'jQuery' ]);


