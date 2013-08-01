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
//var serverUrl = "http://vast-escarpment-3640.herokuapp.com";
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
//------------------------------------------------------------------->
// 1. Base Class
// step 1 define move method
// step 2 define left
//------------------------------------------------------------------->
var editor1 = new dslPrez.editor("editor1");
function editor1Key1() {
    var value = "def move(direction) {\n"
        + "    println \"moving $direction\"\n"
        + "}\n"
        + "move \"left\"\n";
    editor1.replaceRange(value, {line:5, ch:0});
    editor1.addLineClass(5, "background", "highlight");
    editor1.addLineClass(6, "background", "highlight");
    editor1.addLineClass(7, "background", "highlight");
    editor1.addLineClass(8, "background", "highlight");
}
function editor1Send() {
    var value = editor1.getValue();
    submitForm(value, "#output1");
}

function editor1Key2() {
    editor1.removeLineClass(5, "background", "highlight");
    editor1.removeLineClass(6, "background", "highlight");
    editor1.removeLineClass(7, "background", "highlight");
    editor1.removeLineClass(8, "background", "highlight");
    var value = "def left = \"left\"\n";
    editor1.replaceRange(value, {line:8, ch:0});
    editor1.removeLine(9);
    value = "move left\n";
    editor1.replaceRange(value, {line:9, ch:0});
    editor1.addLineClass(8, "background", "highlight");
}
function editor1Key3() {
    editor1.removeLineClass(8, "background", "highlight");
}

var keymap = {
    "1" : editor1Key1,
    "2" : editor1Key2,
    "3" : editor1Key3,
    "Ctrl-S" : editor1Send,
    "Cmd-S" : editor1Send
};
editor1.addKeyMap(keymap);

//------------------------------------------------------------------->
// 2. Base Class
// step 1 define base class
// step 2 remove move definition in script
// step 3 introduce compilerConfiguration
// step 4 inject it in groovy shell
//------------------------------------------------------------------->
var editor2 = new dslPrez.editor("editor2");
function editor2Key1() {
    var value = "abstract class GameScript extends Script {\n"
        + "  def move = {direction -> println \"moving $direction\" }\n"
        + "  def left = \"left\"\n"
        + "}\n";
    editor2.replaceRange(value, {line: 1, ch: 0});
    editor2.addLineClass(1, "background", "highlight");
    editor2.addLineClass(2, "background", "highlight");
    editor2.addLineClass(3, "background", "highlight");
    editor2.addLineClass(4, "background", "highlight");
}
function editor2Key2() {
    editor2.removeLineClass(1, "background", "highlight");
    editor2.removeLineClass(2, "background", "highlight");
    editor2.removeLineClass(3, "background", "highlight");
    editor2.removeLineClass(4, "background", "highlight");
    editor2.addLineClass(9, "background", "highlight");
    editor2.addLineClass(10, "background", "highlight");
    editor2.addLineClass(11, "background", "highlight");
    editor2.addLineClass(12, "background", "highlight");
}
function editor2Key3() {
    editor2.removeLineClass(9, "background", "highlight");
    editor2.removeLineClass(10, "background", "highlight");
    editor2.removeLineClass(11, "background", "highlight");
    editor2.removeLineClass(10, "background", "highlight");
    editor2.removeLine(9);
    editor2.removeLine(9);
    editor2.removeLine(9);
    editor2.removeLine(9);
}
function editor2Key4() {
    var value = "def compilerConfig = new CompilerConfiguration()\n"
        + "compilerConfig.scriptBaseClass = GameScript.class.name\n"
        + "def binding = new Binding()\n";
    editor2.removeLine(6);
    editor2.replaceRange(value, {line: 5, ch: 0});
    editor2.addLineClass(5, "background", "highlight");
    editor2.addLineClass(6, "background", "highlight");
    editor2.addLineClass(7, "background", "highlight");
}
function editor2Key5() {
    editor2.removeLineClass(5, "background", "highlight");
    editor2.removeLineClass(6, "background", "highlight");
    editor2.removeLineClass(7, "background", "highlight");
    editor2.removeLine(8);
    var value = "" +
        "def shell = new GroovyShell(this.class.classLoader,\n" +
        "                            binding,\n" +
        "                            compilerConfig)\n";
    editor2.replaceRange(value, {line: 8, ch: 0});
    editor2.addLineClass(8, "background", "highlight");
    editor2.addLineClass(9, "background", "highlight");
    editor2.addLineClass(10, "background", "highlight");
}
function editor2Key6() {
    editor2.removeLineClass(8, "background", "highlight");
    editor2.removeLineClass(9, "background", "highlight");
    editor2.removeLineClass(10, "background", "highlight");
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
    "4": editor2Key4,
    "5": editor2Key5,
    "6": editor2Key6
};

editor2.addKeyMap(keymap2);

function submitTurtleForm(input, output, canvasId) {
    var url = serverUrl + "/console/execute?=";
    var draw;
    $.post(url, {
        content : input
    }, function(data) {
        var value = "";
        var outputValue = "";
        if (data.stacktrace === "" || data.stacktrace.buffer !== undefined) {
            outputValue = data.result;
            value = JSON.parse(data.shellResult);
            var conf = {
                grid: 6,
                gridLineWidth: 2,
                stepDuration: 1000,
                images: {
                     franklin: 'turtle1.png',
                     emily: 'turtle1.png'
                },
                player: "franklin"
            };
            var init = {
                franklin: {
                    x: value.steps[0].x,
                    y: value.steps[0].y,
                    direction: "+x"
                }
            };
            draw = ktDraw(document.getElementById(canvasId), conf, init);
            $.each(value.steps, function(key, value) {
                var currentFranklin = {franklin: value};
                draw(currentFranklin, function () {
                    var debugMe = "..";
                });
            });
        } else {
            outputValue = data.stacktrace;
        }
        $(output).text(outputValue);
        $('#next').click();
    });
}

//------------------------------------------------------------------->
// 3. Binding
// step 1 introduce right in binding
// step 2 ad move right command
//------------------------------------------------------------------->
var editor3 = new dslPrez.editor("editor3");
function editor3Send() {
    var value = editor3.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitForm(value, "#output3");
}

function editor3Key1() {
    var value = 'def binding = new Binding([right: "right"])';
    editor3.replaceRange(value, {line: 7, ch: 0}, {line: 7});
    editor3.addLineClass(7, "background", "highlight");
}
function editor3Key2() {
    var value = 'move right\n';
    editor3.replaceRange(value, {line: 14, ch: 0});
    editor3.removeLineClass(7, "background", "highlight");
    editor3.addLineClass(14, "background", "highlight");
}
function editor3Key3() {
    editor3.removeLineClass(14, "background", "highlight");
}

var keymap3 = {
    "Ctrl-S" :editor3Send,
    "Cmd-S" :editor3Send,
    "1": editor3Key1,
    "2": editor3Key2,
    "3": editor3Key3
};
editor3.addKeyMap(keymap3);

//------------------------------------------------------------------->
// 4. Structure my code
// step 1 add Position
// step 2 add Driection enums
// step 3 add turtle class
// step 4 new Turtle()
// step 5 highlight compilerconf + binding
// step 6 inject binding,
// step 7 remove def left in GameScript
//------------------------------------------------------------------->
var editor4 = new dslPrez.editor("editor4");
function editor4Send() {
    var value = editor4.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitForm(value, "#output4");
}
 function editor4Key1() {
var value = "class Position {\n" +
"    int x\n" +
"    int y\n" +
"    Position left() {\n" +
"        new Position(x - 1, y);\n" +
"    }\n" +
"    Position right() {\n" +
"        new Position(x + 1 , y);\n" +
"    }\n" +
"    def Position(moveX, moveY) {\n" +
"        x = moveX\n" +
"        y = moveY\n" +
"    }\n" +
"}\n";
    editor4.replaceRange(value, {line: 0, ch: 0});
    for(var i = 0; i <14 ; i++) {
        editor4.addLineClass(i, "background", "highlight");
    }
    //editor4.scrollIntoView();
}

function editor4Key2() {
    for(var i = 0; i <14 ; i++) {
        editor4.removeLineClass(i, "background", "highlight");
    }
    var value = "enum Direction {\n" +
"    left, right\n" +
"}\n";
    editor4.replaceRange(value, {line: 14, ch: 0});
    for(var i = 14; i <17 ; i++) {
        editor4.addLineClass(i, "background", "highlight");
    }
    //editor4.scrollIntoView();
}

function editor4Key3() {
    for(var i = 14; i <17 ; i++) {
        editor4.removeLineClass(i, "background", "highlight");
    }
    var value = "class Turtle {\n" +
"   \n" +
"   def currentPosition\n" +
"   Turtle(Position start) {\n" +
"      currentPosition = start\n" +
"   }\n\n" +
"   Turtle move(Direction dir) { \n" +
"      Position newPosition\n" +
"      if (dir == Direction.left) {\n" +
"        newPosition = currentPosition.left()\n" +
"      } else if (dir == Direction.right) {\n" +
"        newPosition = currentPosition.right()\n" +
"      }\n" +
"      \n" +
"      currentPosition = newPosition\n" +
"      println \"x = $currentPosition.x and y = $currentPosition.y\"\n" +
"      this\n" +
"   }\n" +
"}\n";
    editor4.replaceRange(value, {line: 17, ch: 0});
    for(var i = 17; i <37 ; i++) {
        editor4.addLineClass(i, "background", "highlight");
    }
    //editor4.scrollIntoView();
}
function editor4Key4() {
    editor4.scrollIntoView(58);
    for(var i = 17; i <37 ; i++) {
        editor4.removeLineClass(i, "background", "highlight");
    }
    var value = "def turtle = new Turtle(new Position(1, 1))\n";
    editor4.replaceRange(value, {line: 37, ch: 0});
    editor4.addLineClass(37, "background", "highlight");

}
function editor4Key5() {
    editor4.removeLineClass(37, "background", "highlight");
//    editor4.addLineClass(43, "background", "highlight");
//    editor4.addLineClass(44, "background", "highlight");
    editor4.addLineClass(45, "background", "highlight");
    editor4.scrollIntoView(58);

}
function editor4Key6() {
//    editor4.removeLineClass(43, "background", "highlight");
//    editor4.removeLineClass(44, "background", "highlight");
    editor4.removeLineClass(45, "background", "highlight");

    var value = "def compilerConfig = new CompilerConfiguration()\n" +
        "def binding = new Binding([move: turtle.&move,\n" +
        "                     left: Direction.left, right: Direction.right])\n";

    editor4.replaceRange(value, {line: 43, ch: 0}, {line:45});
    editor4.addLineClass(44, "background", "highlight");
    editor4.addLineClass(45, "background", "highlight");
    editor4.addLineClass(46, "background", "highlight");
}
function editor4Key7() {
    for(var i = 44; i <47 ; i++) {
        editor4.removeLineClass(i, "background", "highlight");
    }
    for(var i = 39; i <43 ; i++) {
        editor4.addLineClass(i, "background", "highlight");
    }
}
function editor4Key8() {
    for(var i = 39; i <43 ; i++) {
        editor4.removeLineClass(i, "background", "highlight");
    }

    editor4.replaceRange("", {line: 39, ch: 0}, {line:42});
}

var keymap4 = {
    "Ctrl-S" :editor4Send,
    "Cmd-S" :editor4Send,
    "1": editor4Key1,
    "2": editor4Key2,
    "3": editor4Key3,
    "4": editor4Key4,
    "5": editor4Key5,
    "6": editor4Key6,
    "7": editor4Key7,
    "8": editor4Key8
};
editor4.addKeyMap(keymap4);

//------------------------------------------------------------------->
// 5. Building JSON
//  step 1 def step= [] to use steps instead println
//  step 2 steps.add(start) to store initial position steps after move
//  step 3 hightlight
//  step 4 steps.add(newPosition) to store position after move
//  step 5 add json builder
//  step 6 highlight
//  step 7 mix plain groovy + DSL 4.times {move left}
//------------------------------------------------------------------->
var editor5 = new dslPrez.editor("editor5");
function editor5Send() {
    var value = editor5.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitForm(value, "#output5");
}
function editor5TurtleSend() {
    var value = editor5.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitTurtleForm(value, "#output5", 'canvas5');
}

function editor5Key1() {
    editor5.scrollIntoView(0);
    var value = "   def steps = []";
    editor5.replaceRange(value, {line: 23, ch: 0}, {line:23});
    editor5.addLineClass(23, "background", "highlight");
}
function editor5Key2() {
    editor5.removeLineClass(23, "background", "highlight");
    var value = "      steps.add(start)";
    editor5.replaceRange(value, {line: 26, ch: 0}, {line:26});
    editor5.addLineClass(26, "background", "highlight");
}
function editor5Key3() {
    editor5.scrollIntoView(57);
    editor5.removeLineClass(26, "background", "highlight");
    editor5.addLineClass(41, "background", "highlight");
}
function editor5Key4() {
    var value = "      steps.add(newPosition)";
    editor5.replaceRange(value, {line: 41, ch: 0}, {line:41});
}
function editor5Key5() {
    editor5.scrollIntoView(82);
    editor5.removeLineClass(41, "background", "highlight");
    var value = "def builder = new groovy.json.JsonBuilder()\n" +
"builder {\n" +
"   steps binding[\"turtle\"].steps\n" +
"}\n" +
"println builder\n" +
"builder.toString()\n";
    editor5.replaceRange(value, {line: 74, ch: 0});
    for(var i = 74; i <80 ; i++) {
        editor5.addLineClass(i, "background", "highlight");
    }
}
function editor5Key6() {
    for(var i = 74; i <80 ; i++) {
        editor5.removeLineClass(i, "background", "highlight");
    }

    for(var i = 64; i <68 ; i++) {
        editor5.addLineClass(i, "background", "highlight");
    }
}
function editor5Key7() {
    var value = "4.times {\n" +
        "  move right\n" +
        "  move up\n" +
        "}";
    editor5.replaceRange(value, {line: 64, ch: 0}, {line: 67});
}
function editor5Key8() {
    for(var i = 64; i <68 ; i++) {
        editor5.removeLineClass(i, "background", "highlight");
    }
}

var keymap5 = {
    "Ctrl-S" :editor5TurtleSend,
    "Cmd-S" :editor5TurtleSend,
    "1": editor5Key1,
    "2": editor5Key2,
    "3": editor5Key3,
    "4": editor5Key4,
    "5": editor5Key5,
    "6": editor5Key6,
    "7": editor5Key7,
    "8": editor5Key8
};
editor5.addKeyMap(keymap5);



//-------------------------------------------------------------------
//6. Command chaining odd number
//step 1: highlight dsl syntax
//step 2: move left by 2
//step 3: add by method
//step 4: highlight steps.add from turtle move
//step 5: remove steps.add from turtle mve
//step 6: add steps.add to turtle by
//step 7: change new Position to add direction
//------------------------------------------------------------------->
var editor6 = new dslPrez.editor("editor6");
function editor6TurtleSend() {
    var value = editor6.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitTurtleForm(value, "#output6", 'canvas6');
}


function editor6Key1() {
    for(var i = 78; i <82 ; i++) {
        editor6.addLineClass(i, "background", "highlight");
    }
    editor6.scrollIntoView(82);
}
function editor6Key2() {
    for(var i = 78; i <82 ; i++) {
        editor6.removeLineClass(i, "background", "highlight");
    }
    var value = "2.times {\n" +
        "  move right by 2 \n" +
        "  move up by 1\n" +
        "}";
    editor6.replaceRange(value, {line: 78, ch: 0}, {line:81});
    for(var i = 78; i <82 ; i++) {
        editor6.addLineClass(i, "background", "highlight");
    }
}
function editor6Key3() {
    editor6.scrollIntoView(77);
    for(var i = 78; i <82 ; i++) {
        editor6.removeLineClass(i, "background", "highlight");
    }
    var value = "  Turtle by (Integer step) {\n" +
"    Position newPosition = currentPosition.move(step)\n" +
"    \n" +
"    currentPosition = newPosition\n" +
"    this\n" +
"  }\n";
    editor6.replaceRange(value, {line: 59, ch: 0});
    for(var i = 59; i <65 ; i++) {
        editor6.addLineClass(i, "background", "highlight");
    }
}
function editor6Key4() {
    for(var i = 59; i <65 ; i++) {
        editor6.removeLineClass(i, "background", "highlight");
    }
    editor6.addLineClass(55, "background", "highlight");
}
function editor6Key5() {
    editor6.removeLineClass(55, "background", "highlight");
    editor6.replaceRange("", {line: 55, ch: 0}, {line:55});
}
function editor6Key6() {
    editor6.replaceRange("    steps.add(newPosition)\n", {line: 63, ch: 0});
    editor6.addLineClass(63, "background", "highlight");
}
function editor6Key7() {
    editor6.removeLineClass(63, "background", "highlight");
    editor6.replaceRange("def turtle = new Turtle(new Position(1, 1, Direction.left))", {line: 72, ch: 0}, {line:72});
    editor6.addLineClass(72, "background", "highlight");
}
function editor6Key8() {
    editor6.removeLineClass(72, "background", "highlight");
}
var keymap6 = {
    "Ctrl-S": editor6TurtleSend,
    "Cmd-S": editor6TurtleSend,
    "1": editor6Key1,
    "2": editor6Key2,
    "3": editor6Key3,
    "4": editor6Key4,
    "5": editor6Key5,
    "6": editor6Key6,
    "7": editor6Key7,
    "8": editor6Key8
};
editor6.addKeyMap(keymap6);

//-------------------------------------------------------------------
//6b. Command chaining odd number
//step 1: highlight dsl syntax
//step 2: move left by 2 steps
//step 3: add by method
//step 4: highlight steps.add from turtle move
//step 5: remove steps.add from turtle mve
//step 6: add steps.add to turtle by
//step 7: change new Position to add direction
//------------------------------------------------------------------->
var editor6b = new dslPrez.editor("editor6b");
function editor6bTurtleSend() {
    var value = editor6b.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitTurtleForm(value, "#output6b", 'canvas6b');
}

function editor6bKey1() {
    for(var i = 83; i <87 ; i++) {
        editor6b.addLineClass(i, "background", "highlight");
    }
    editor6b.scrollIntoView(87);
}
function editor6bKey2() {
    for(var i = 32; i <87 ; i++) {
        editor6b.removeLineClass(i, "background", "highlight");
    }
    var value = "2.times {\n" +
        "    move right by 2 steps\n" +
        "    move up by 1 step\n" +
        "}";
    editor6b.replaceRange(value, {line: 83, ch: 0}, {line:86});
    for(var i = 83; i <87 ; i++) {
        editor6b.addLineClass(i, "background", "highlight");
    }
}
function editor6bKey3() {
    for(var i = 83; i <87 ; i++) {
        editor6b.removeLineClass(i, "background", "highlight");
    }
    for(var i = 58; i <65 ; i++) {
        editor6b.addLineClass(i, "background", "highlight");
    }
}
function editor6bKey4() {
    for(var i = 58; i <65 ; i++) {
        editor6b.removeLineClass(i, "background", "highlight");
    }
    var value = "   Map by (Integer step) {\n" +
        "     Position newPosition = currentPosition.move(step)\n" +
        "     steps.add(newPosition) \n" +
        "     currentPosition = newPosition\n" +
        "     [steps:\"\", step:\"\"] \n\n" +
        "   }";
    editor6b.replaceRange(value, {line: 58, ch: 0}, {line:64});
    for(var i = 58; i <64 ; i++) {
        editor6b.addLineClass(i, "background", "highlight");
    }

}
function editor6bKey5() {
    for(var i = 58; i <64 ; i++) {
        editor6b.removeLineClass(i, "background", "highlight");
    }
}

var keymap6b = {
    "Ctrl-S": editor6bTurtleSend,
    "Cmd-S": editor6bTurtleSend,
    "1": editor6bKey1,
    "2": editor6bKey2,
    "3": editor6bKey3,
    "4": editor6bKey4,
    "5": editor6bKey5
};
editor6b.addKeyMap(keymap6b);

//-------------------------------------------------------------------
//7. Adding behavior to Integer
//step1: highlight dsl
//step2: move left by 2.steps
//step3: add class StepCategory
//step4: highlight shell.eval
//step5: modify shell.eval with use()
//step6: highlight class StepCategory
//step7: replace with @Category annotation
//------------------------------------------------------------------->
var editor7 = new dslPrez.editor("editor7");
function editor7TurtleSend() {
    var value = editor7.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitTurtleForm(value, "#output7", 'canvas7');
}

function editor7Key1() {
    for(var i = 83; i <87 ; i++) {
        editor7.addLineClass(i, "background", "highlight");
    }
    editor7.scrollIntoView(87);
}
function editor7Key2() {
    var value = "2.times {\n" +
        "  move right by 2.steps\n" +
        "  move up by 1.steps\n" +
        "}";
    editor7.replaceRange(value, {line: 83, ch: 0}, {line: 86});
    for(var i = 83; i <87 ; i++) {
        editor7.addLineClass(i, "background", "highlight");
    }
}

function editor7Key3() {
    editor7.scrollIntoView(55);
    for(var i = 83; i <87 ; i++) {
        editor7.removeLineClass(i, "background", "highlight");
    }
    var value = "class StepCategory {\n" +
    "  static Integer getSteps(Integer self) {\n" +
    "    self\n" +
    "  }\n" +
    "}\n\n";
    editor7.replaceRange(value, {line: 65, ch: 0});
    for(var i = 65; i <70 ; i++) {
        editor7.addLineClass(i, "background", "highlight");
    }

}

function editor7Key4() {
    for(var i = 65; i <70 ; i++) {
        editor7.removeLineClass(i, "background", "highlight");
    }
    editor7.addLineClass(98, "background", "highlight");
    editor7.scrollIntoView(105);
}

function editor7Key5() {
    var value = "shell.evaluate \"use(StepCategory) {\" + gameDSL + \"}\"";
    editor7.replaceRange(value, {line: 98, ch: 0}, {line:98});
    editor7.addLineClass(98, "background", "highlight");
}

function editor7Key6() {
    editor7.scrollIntoView(50);
    editor7.removeLineClass(98, "background", "highlight");
    for(var i = 65; i <70 ; i++) {
        editor7.addLineClass(i, "background", "highlight");
    }
}

function editor7Key7() {
    for(var i = 65; i <70 ; i++) {
        editor7.removeLineClass(i, "background", "highlight");
    }
    var value = "@Category(Integer)\n" +
                "class StepCategory {\n" +
                "    Integer getSteps() {\n" +
                "        this;\n" +
                "    }\n" +
                "}";
    editor7.replaceRange(value, {line: 65, ch: 0}, {line: 70});
    for(var i = 65; i <71 ; i++) {
        editor7.addLineClass(i, "background", "highlight");
    }
}

function editor7Key8() {
    for(var i = 65; i <71 ; i++) {
        editor7.removeLineClass(i, "background", "highlight");
    }
}

var keymap7 = {
    "Ctrl-S": editor7TurtleSend,
    "Cmd-S": editor7TurtleSend,
    "1": editor7Key1,
    "2": editor7Key2,
    "3": editor7Key3,
    "4": editor7Key4,
    "5": editor7Key5,
    "6": editor7Key6,
    "7": editor7Key7,
    "8": editor7Key8
};
editor7.addKeyMap(keymap7);

//------------------------------------------------------------------->
// 8. TypeChecked
// step 1: highlight compiler
// step 2: add typechecked ext
//------------------------------------------------------------------->
var editor8 = new dslPrez.editor("editor8");
function editor8TurtleSend() {
    var value = editor8.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    value += "import org.codehaus.groovy.control.customizers.ASTTransformationCustomizer;\nimport groovy.transform.TypeChecked\n";
    submitTurtleForm(value, "#output8", 'canvas8');
}

function editor8Key1() {
    editor8.addLineClass(80, "background", "highlight");
    editor8.addLineClass(81, "background", "highlight");
    editor8.scrollIntoView(105);
}
function editor8Key2() {
    var value = "compilerConfig.addCompilationCustomizers(\n" +
        "    new ASTTransformationCustomizer(TypeChecked,\n"+
        "        extensions:['TurtleExtension.groovy']))\n\n";
    editor8.replaceRange(value, {line:82, ch:0});
    editor8.addLineClass(80, "background", "highlight");
    editor8.addLineClass(81, "background", "highlight");
    editor8.addLineClass(82, "background", "highlight");
    editor8.addLineClass(83, "background", "highlight");
    editor8.addLineClass(84, "background", "highlight");
}
function editor8Key3() {
    editor8.removeLineClass(80, "background", "highlight");
    editor8.removeLineClass(81, "background", "highlight");
    editor8.removeLineClass(82, "background", "highlight");
    editor8.removeLineClass(83, "background", "highlight");
    editor8.removeLineClass(84, "background", "highlight");
}

var keymap8 = {
    "1": editor8Key1,
    "2": editor8Key2,
    "3": editor8Key3,
    "Ctrl-S": editor8TurtleSend,
    "Cmd-S": editor8TurtleSend
};
editor8.addKeyMap(keymap8);
editor8.scrollIntoView({line:80, ch:0});

//------------------------------------------------------------------->
// 9. Turn around
// step1: highlight dsl
// step2: modify dsl with infinite loop
// step3: highlight ASTTransformationCustomizer
// step4: add TimeInterrupt
//------------------------------------------------------------------->
var editor9 = new dslPrez.editor("editor9");
function editor9TurtleSend() {
    var value = editor9.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    value += "import org.codehaus.groovy.control.customizers.ASTTransformationCustomizer;\nimport groovy.transform.TypeChecked\n";
    value += "import groovy.transform.TimedInterrupt\n";
    submitTurtleForm(value, "#output9", 'canvas9');
}

function editor9Key1() {
    for(var i = 90; i <96 ; i++) {
        editor9.addLineClass(i, "background", "highlight");
    }
    editor9.scrollIntoView(105);
}
function editor9Key2() {
    for(var i = 90; i <96 ; i++) {
        editor9.removeLineClass(i, "background", "highlight");
    }
    var value = "while(true) {\n" +
        "    move right by 2\n" +
        "    move up by 2\n" +
        "    move left by 2\n" +
        "    move down by 2\n" +
        "}";
    editor9.replaceRange(value, {line: 90, ch: 0}, {line:95});

    for(var i = 90; i <96 ; i++) {
        editor9.addLineClass(i, "background", "highlight");
    }
}
function editor9Key3() {
    for(var i = 90; i <96 ; i++) {
        editor9.removeLineClass(i, "background", "highlight");
    }
    editor9.addLineClass(82, "background", "highlight");
    editor9.addLineClass(83, "background", "highlight");
}
function editor9Key4() {
    for(var i = 82; i <85 ; i++) {
        editor9.removeLineClass(i, "background", "highlight");
    }
    var value = "    new ASTTransformationCustomizer(TypeChecked, extensions:['TurtleExtension.groovy']),\n" +
        "    new ASTTransformationCustomizer([value:5L], TimedInterrupt))\n";
    editor9.removeLine(83);
    editor9.replaceRange(value, {line:83, ch:0});
    for(var i = 82; i <85 ; i++) {
        editor9.addLineClass(i, "background", "highlight");
    }
}
function editor9Key5() {
    for(var i = 82; i <85 ; i++) {
        editor9.removeLineClass(i, "background", "highlight");
    }
}

var keymap9 = {
    "1":editor9Key1,
    "2":editor9Key2,
    "3":editor9Key3,
    "4":editor9Key4,
    "5":editor9Key5,
    "Ctrl-S": editor9TurtleSend,
    "Cmd-S": editor9TurtleSend
};
editor9.addKeyMap(keymap9);

//------------------------------------------------------------------->
// 10. Sneaky
// step 1: highlight dsl
// step 2: add system.exit
// step 3: add SecureASTCustomizer
//------------------------------------------------------------------->
var editor10 = new dslPrez.editor("editor10");
function editor10TurtleSend() {
    var value = editor10.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    value += "import org.codehaus.groovy.control.customizers.ASTTransformationCustomizer;\nimport groovy.transform.TypeChecked\n";
    value += "import groovy.transform.TimedInterrupt;\nimport org.codehaus.groovy.control.customizers.SecureASTCustomizer\n"
    submitTurtleForm(value, "#output10", 'canvas10');
}

function editor10Key1() {
    for(var i = 92; i <97 ; i++) {
        editor10.addLineClass(i, "background", "highlight");
    }
    editor10.scrollIntoView(115);
}

function editor10Key2() {
    var value = "    System.exit(-1)";
    editor10.replaceRange(value, {line:96, ch:0});
    editor10.addLineClass(96, "background", "highlight");
}

function editor10Key3() {
    for(var i = 92; i <97 ; i++) {
        editor10.removeLineClass(i, "background", "highlight");
    }
    var value = "def secure = new SecureASTCustomizer()\n" +
                "secure.with {\n" +
                "    receiversClassesBlackList = [\n" +
                "        java.lang.System\n" +
                "    ].asImmutable()\n" +
                "}\n\n";

    editor10.replaceRange(value, {line:85, ch:0});
    for(var i = 85; i <91 ; i++) {
        editor10.addLineClass(i, "background", "highlight");
    }
    editor10.removeLine(92);
    var value = "compilerConfig.addCompilationCustomizers(tc, ti, secure)\n";
    editor10.replaceRange(value, {line:92, ch:0});
}
function editor10Key4() {
    editor10.removeLineClass(85, "background", "highlight");
    editor10.removeLineClass(86, "background", "highlight");
    editor10.removeLineClass(87, "background", "highlight");
    editor10.removeLineClass(88, "background", "highlight");
    editor10.removeLineClass(89, "background", "highlight");
    editor10.removeLineClass(90, "background", "highlight");
}

var keymap10 = {
    "1":editor10Key1,
    "2":editor10Key2,
    "3":editor10Key3,
    "4":editor10Key4,
    "Ctrl-S": editor10TurtleSend,
    "Cmd-S": editor10TurtleSend
};
editor10.addKeyMap(keymap10);


//------------------------------------------------------------------->
// 11. ask: dynamic interception
//step1: insert DSL ask
//step2: add ask method
//step3: add propertyMissingMethod
//step4: add display map method
//step5: add display map in DSL
//------------------------------------------------------------------->
var editor11 = new dslPrez.editor("editor11");
function editor11Send() {
    var value = editor11.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitForm(value, "#output11");
}

function editor11Key1() {
    editor11.replaceRange("ask \"Where do you wan to meet\" assign to meeting", {line:12, ch:0}, {line:12});
    editor11.addLineClass(12, "background", "highlight");
}

function editor11Key2() {
    editor11.removeLineClass(12, "background", "highlight");
    var value = "  def i = 1;\n" +
        "  def map = [:]\n" +
        "\n" +
        "  def ask(question) {\n" +
        "    [assign : { to -> \n" +
        "      [:].withDefault {variable ->\n" +
        "        map[\"question$i\"] = question\n" +
        "        map[\"variable$i\"] = variable\n" +
        "        i++\n" +
        "      }\n" +
        "    }]\n" +
        "  }\n";
    editor11.replaceRange(value, {line:2, ch:0});
    for(var i = 2; i <14 ; i++) {
        editor11.addLineClass(i, "background", "highlight");
    }
}

function editor11Key3() {
    for(var i = 2; i <14 ; i++) {
        editor11.removeLineClass(i, "background", "highlight");
    }
    var value = "  def propertyMissing(def propertyName) {\n" +
        "    propertyName\n" +
        "  }\n";
    editor11.replaceRange(value, {line:14, ch:0});
    for(var i = 14; i <17 ; i++) {
        editor11.addLineClass(i, "background", "highlight");
    }
}

function editor11Key4() {
    for(var i = 14; i <17 ; i++) {
        editor11.removeLineClass(i, "background", "highlight");
    }
    var value = "  def display(Map mapToDisplay) {\n" +
        "    mapToDisplay.eachWithIndex { key, value, index ->\n" +
        "      println \"$key: $value\"\n" +
        "      if (index % 2) {\n" +
        "        println \"______________________________________\\n\"\n" +
        "      }\n" +
        "    }\n" +
        " }";
    editor11.replaceRange(value, {line:17, ch:0});
    for(var i = 17; i <25 ; i++) {
        editor11.addLineClass(i, "background", "highlight");
    }
}

function editor11Key5() {
    for(var i = 17; i <25 ; i++) {
        editor11.removeLineClass(i, "background", "highlight");
    }
    editor11.replaceRange("display map\n", {line:35, ch:0});
    editor11.addLineClass(35, "background", "highlight");
}

function editor11Key6() {
    editor11.removeLineClass(35, "background", "highlight");
}

var keymap11 = {
    "1":editor11Key1,
    "2":editor11Key2,
    "3":editor11Key3,
    "4":editor11Key4,
    "5":editor11Key5,
    "6":editor11Key6,
    "Ctrl-S": editor11Send,
    "Cmd-S": editor11Send
};
editor11.addKeyMap(keymap11);


//------------------------------------------------------------------->
// 12. ask AST
//------------------------------------------------------------------->
var editor12 = new dslPrez.editor("editor12");
function editor12Send() {
    var value = editor12.getValue();
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
    submitForm(value, "#output12");
}
var keymap12 = {
    "Ctrl-S": editor12Send,
    "Cmd-S": editor12Send
};
editor12.addKeyMap(keymap12);


$("#technologies").airport([ 'Twitter Bootstrap', 'iScroll', 'jCloud', 'jQuery-airport', 'grails', 'Code Mirror', 'jQuery' ]);


