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

editor0 = new dslPrez.editor("editor0");
function editor0Key1() {
    var value = "class Person {\n" +
    "    def name\n" +
    "    def age\n" +
    "    String toString() {\n" +
    "        \"Hello I'm \" + name + \" and I'm \" + age + \" years old\"\n " +
    "    }\n" +
    "}\n" +
    "Person sebastien = new Person()\n" +
    "sebastien.name = \"Sebi\" \n" +
    "sebastien.age = 34\n" +
    "println sebastien";
    for (var i = 0; i < 32; i++) {
        editor0.removeLine(0);
    }
    editor0.replaceRange(value, {line:0, ch:0});
}

function callPlayer(frame_id, func, args) {
    if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
    var iframe = document.getElementById(frame_id);
    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        iframe = iframe.getElementsByTagName('iframe')[0];
    }

    // When the player is not ready yet, add the event to a queue
    // Each frame_id is associated with an own queue.
    // Each queue has three possible states:
    //  undefined = uninitialised / array = queue / 0 = ready
    if (!callPlayer.queue) callPlayer.queue = {};
    var queue = callPlayer.queue[frame_id],
        domReady = document.readyState == 'complete';

    if (domReady && !iframe) {
        // DOM is ready and iframe does not exist. Log a message
        window.console && console.log('callPlayer: Frame not found; id=' + frame_id);
        if (queue) clearInterval(queue.poller);
    } else if (func === 'listening') {
        // Sending the "listener" message to the frame, to request status updates
        if (iframe && iframe.contentWindow) {
            func = '{"event":"listening","id":' + JSON.stringify(''+frame_id) + '}';
            iframe.contentWindow.postMessage(func, '*');
        }
    } else if (!domReady || iframe && (!iframe.contentWindow || queue && !queue.ready)) {
        if (!queue) queue = callPlayer.queue[frame_id] = [];
        queue.push([func, args]);
        if (!('poller' in queue)) {
            // keep polling until the document and frame is ready
            queue.poller = setInterval(function() {
                callPlayer(frame_id, 'listening');
            }, 250);
            // Add a global "message" event listener, to catch status updates:
            messageEvent(1, function runOnceReady(e) {
                var tmp = JSON.parse(e.data);
                if (tmp && tmp.id == frame_id && tmp.event == 'onReady') {
                    // YT Player says that they're ready, so mark the player as ready
                    clearInterval(queue.poller);
                    queue.ready = true;
                    messageEvent(0, runOnceReady);
                    // .. and release the queue:
                    while (tmp = queue.shift()) {
                        callPlayer(frame_id, tmp[0], tmp[1]);
                    }
                }
            }, false);
        }
    } else if (iframe && iframe.contentWindow) {
        // When a function is supplied, just call it (like "onYouTubePlayerReady")
        if (func.call) return func();
        // Frame exists, send message
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": func,
            "args": args || [],
            "id": frame_id
        }), "*");
    }
    /* IE8 does not support addEventListener... */
    function messageEvent(add, listener) {
        var w3 = add ? window.addEventListener : window.removeEventListener;
        w3 ?
            w3('message', listener, !1)
            :
            (add ? window.attachEvent : window.detachEvent)('onmessage', listener);
    }
}

function onPlay() {
    callPlayer('whateverID', 'playVideo');
}

function onStop() {
    callPlayer('whateverID', 'stopVideo');
}

function editor0Send() {
    var value = editor0.getValue();
    submitForm(value, "#output0");
}
var keymap = {
    "0" : onPlay,
    "1" : editor0Key1,
    "2" : onStop,
    "Ctrl-S" : editor0Send,
    "Cmd-S" : editor0Send
};
editor0.addKeyMap(keymap);

//-------------------------------------------------------------------------------------------------------
// Editor: List made easy
//-------------------------------------------------------------------------------------------------------
editor01 = new dslPrez.halfEditor("editor01");
function editor01Key1() {
    var value = 'println "==> Range"\ndef range = 5..8\nprintln range.size()\nprintln range.get(2)\n';
    for (var i = 0; i < 25; i++) {
        editor01.removeLine(0);
    }
    editor01.replaceRange(value, {line:editor01.lineCount(), ch:0});
}
function editor01Key2() {
    for (var i = 0; i < 25; i++) {
        editor01.removeLine(0);
    }
    var value = 'println "==> *. operator"\ndef words = ["a", "few", "words"]*.size()\nprintln words\n';
    editor01.replaceRange(value, {line:editor01.lineCount() + 1, ch:0});
}
function editor01Key3() {
    for (var i = 0; i < 25; i++) {
        editor01.removeLine(0);
    }
    var value = 'println "==> Collection Methods: findAll"\ndef words = ["ant", "buffalo", "cat", "dinosaur"]\nprintln words.findAll{ w -> w.size() > 4 }\n';
    editor01.replaceRange(value, {line:editor01.lineCount() + 1, ch:0});
}
function editor01Key4() {
    for (var i = 0; i < 25; i++) {
        editor01.removeLine(0);
    }
    var value = 'println "==> Collection Methods: collect"\ndef words = ["ant", "buffalo", "cat", "dinosaur"]\nprintln words.collect{ it[0] }\n';
    editor01.replaceRange(value, {line:editor01.lineCount() + 1, ch:0});
}
function submitFormWithoutNext(input, output) {
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
    });
}
function editor01Send() {
    var value = editor01.getValue();
    submitFormWithoutNext(value, "#output01");
}
var keymap = {
    "1" : editor01Key1,
    "2" : editor01Key2,
    "3" : editor01Key3,
    "4" : editor01Key4,
    "Ctrl-S" : editor01Send,
    "Cmd-S" : editor01Send
};
editor01.addKeyMap(keymap);

//-------------------------------------------------------------------------------------------------------
// Editor: Map made easy
//-------------------------------------------------------------------------------------------------------
editor02 = new dslPrez.halfEditor("editor02");
function editor02Key1() {
    var value = 'println "==> Collection method: findAll"\ndef map = [name:"Gromit", likes:"cheese", id:"1234"]\ndef found = map.findAll {it.value=="cheese" }\nprintln found\nfound = map.findAll {key, value -> value == "cheese" }\nprintln found\n';
    for (var i = 0; i < 25; i++) {
        editor02.removeLine(0);
    }
    editor02.replaceRange(value, {line:editor02.lineCount(), ch:0});
}
function editor02Key2() {
    var value = 'println "==> Collection method: every/any"\ndef map = [name:"Gromit", likes:"cheese", id:"1234"]\ndef found = map.every{ it.value.size() > 1 }\nprintln found\nfound = map.any{ it.key.size() == 1 }\nprintln found\n';
    for (var i = 0; i < 25; i++) {
        editor02.removeLine(0);
    }
    editor02.replaceRange(value, {line:editor02.lineCount() + 1, ch:0});
}
function editor02Key3() {
    var value = 'println "==> Collection method: sort"\ndef m = [sort: "asc", name: "test", paginate: true, max: 100]\nprintln m.sort()*.key\nprintln m.sort( { k1, k2 -> k1 <=> k2 } as Comparator )*.key\n';
    for (var i = 0; i < 25; i++) {
        editor02.removeLine(0);
    }
    editor02.replaceRange(value, {line:editor02.lineCount() + 1, ch:0});
}

function submitFormWithoutNext(input, output) {
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
    });
}
function editor02Send() {
    var value = editor02.getValue();
    submitFormWithoutNext(value, "#output02");
}
var keymap = {
    "1" : editor02Key1,
    "2" : editor02Key2,
    "3" : editor02Key3,
    "Ctrl-S" : editor02Send,
    "Cmd-S" : editor02Send
};
editor02.addKeyMap(keymap);

//-------------------------------------------------------------------------------------------------------
// Editor: MOP
//-------------------------------------------------------------------------------------------------------
editor03 = new dslPrez.halfEditor("editor03");

function editor03Key1() {
    var value = 'println "==> ExpandoMetaClass: adding dynamic behaviour to existing class"\nInteger.metaClass.getKm= {->\n    println "here"\n}\n1.km\n';
    for (var i = 0; i < 25; i++) {
        editor03.removeLine(0);
    }
    editor03.replaceRange(value, {line:editor03.lineCount() + 1, ch:0});
}
function editor03Key2() {
    for (var i = 0; i < 25; i++) {
        editor03.removeLine(0);
    }
    var value = "println \"==> invokeMethod + ExpandoMetaClass\"\n" +
        "class Stuff {\n" +
        "    def invokeMe() { \"foo\" }\n" +
        "}\n"+
        "Stuff.metaClass.invokeMethod = { String name, args ->\n" +
        "    def metaMethod = Stuff.metaClass.getMetaMethod(name, args)\n" +
        "    def result\n" +
        "    println name + \" \" + metaMethod\n" +
        "    if(metaMethod) {\n" +
        "        result = metaMethod.invoke(delegate,args)\n" +
        "    } else {\n" +
        "        result = \"bar\"\n" +
        "    }\n" +
        "    result\n" +
        "}\n\n" +
        "def stf = new Stuff()\n" +
        "println stf.invokeMe()\n" +
        "println stf.doStuff()\n";
    editor03.replaceRange(value, {line:editor03.lineCount(), ch:0});
}
function editor03Key3() {
    for (var i = 0; i < 20; i++) {
        editor03.removeLine(0);
    }
    var value = "println \"==> method/property\"\n" +
        "class Foo {\n" +
        "    def storage = [:]\n" +
        "    def propertyMissing(String name, value) { storage[name] = value }\n" +
        "    def propertyMissing(String name) { storage[name] }\n" +
        "}\n" +
        "def f = new Foo()\n" +
        "f.foo = \"bar\"\n" +
        "println f.foo";
    editor03.replaceRange(value, {line:0, ch:0});
}


function submitFormWithoutNext(input, output) {
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
    });
}
function editor03Send() {
    var value = editor03.getValue();
    submitFormWithoutNext(value, "#output03");
}
var keymap = {
    "1" : editor03Key1,
    "2" : editor03Key2,
    "3" : editor03Key3,
    "Ctrl-S" : editor03Send,
    "Cmd-S" : editor03Send
};
editor03.addKeyMap(keymap);

//-------------------------------------------------------------------------------------------------------
// Editor: Script
//-------------------------------------------------------------------------------------------------------
editor1 = new dslPrez.editor("editor1");
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


//-------------------------------------------------------------------------------------------------------
// Editor: Inheritance
//-------------------------------------------------------------------------------------------------------
editor2 = new dslPrez.editor("editor2");
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

//-------------------------------------------------------------------------------------------------------
// Editor: Command chaining
//-------------------------------------------------------------------------------------------------------
editor3 = new dslPrez.editor("editor3");

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

//-------------------------------------------------------------------------------------------------------
// Editor: Silent word
//-------------------------------------------------------------------------------------------------------
editor4 = new dslPrez.editor("editor4");

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

//-------------------------------------------------------------------------------------------------------
// Editor: Binding
//-------------------------------------------------------------------------------------------------------
editor5 = new dslPrez.editor("editor5");

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

//-------------------------------------------------------------------------------------------------------
// Editor: AST for ask
//-------------------------------------------------------------------------------------------------------
editor6 = new dslPrez.editor("editor6");

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

//-------------------------------------------------------------------------------------------------------
// Editor: AST for when
//-------------------------------------------------------------------------------------------------------
editor7 = new dslPrez.editor("editor7");

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

//-------------------------------------------------------------------------------------------------------
// Editor: Survey
//-------------------------------------------------------------------------------------------------------
editor8 = new dslPrez.editor("editor8");

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
        //$('#scriptContent').text(data.content);
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


