var serverUrl = "http://localhost:8080/DslPrez";
//var serverUrl = "http://localhost:8080/DslPrez-0.1";
//var serverUrl = "http://dslprez.herokuapp.com";
//var serverUrl = "http://dslprez.aws.af.cm";
function submitForm(input, output, lang) {
    var url = serverUrl + "/console/execute?=";
    $.post(url, {
        content: input,
        lang: lang
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

function submitFormToGroovyConsole(input, output) {
  submitForm(input, output, "groovy");
}

function submitTurtleForm(input, output, canvasId, lang) {
    var url = serverUrl + "/console/execute?=";
    var draw;
    $.post(url, {
        content : input,
        lang: lang
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

function submitTurtleFormToGroovyConsole(input, output, canvasId) {
    submitTurtleForm(input, output, canvasId, "groovy");
}


// Groovy Cheat Seat

var content0 = "public class Person {\n"
    + "   private String name;\n"
    + "   private int age;\n"
    + "   public Person() {\n"
    + "   }\n"
    + "   public Person(String name, int age) {\n"
    + "       this.name = name;\n"
    + "       this.age = age;\n"
    + "   }\n"
    + "   public String toString() {\n"
    + "       return \"Hello I'm \" + name + \" and I'm \" + age + \" years old\";\n"
    + "   }\n"
    + "   public int getAge() {\n"
    + "       return age;\n"
    + "   }\n"
    + "   public void setAge(int age) {\n"
    + "       this.age = age;\n"
    + "   }\n"
    + "   public String getName() {\n"
    + "       return name;\n"
    + "   }\n"
    + "   public void setName(String name) {\n"
    + "       this.name = name;\n"
    + "   }\n"
    + "}\n\n"
    + "// In your main method\n"
    + "Person sebastien = new Person();\n"
    + "sebastien.setName(\"Sebi\");\n"
    + "sebastien.setAge(34);\n"
    + "System.out.println(sebastien);\n"

var editorGroovy0 = new dslPrez.editor("editorGroovy0", content0);

function editorGroovy0Key0() {
    editorGroovy0.currentPress(0, 1);
    setStep(0,0);
    editorGroovy0.setValue(content0);
}

function editorGroovy0Send() {
    var value = editorGroovy0.getValue();
    submitFormToGroovyConsole(value, "#outputGroovy0");
}

var keymap0 = {
    "0" : editorGroovy0Key0,
    "Ctrl-S" : editorGroovy0Send,
    "Cmd-S" : editorGroovy0Send
};

editorGroovy0.addKeyMap(keymap0);


//------------------------------------------------------------------->
// Groovy1. Script
// step 1 define move method
// step 2 define left
// step 3 replace shell by ScriptEngineMgr from jsr 223
// step 4 replace by engine.eval
//------------------------------------------------------------------->
var content1 = "// Configure the GroovyShell.\n"
    + "def shell = new GroovyShell()\n\n"
    + "///////////////////////\n"
    + "def gameDSL = \'\'\'\n"
    + "    println \"I run a Groovy script\"\n"
    + "\'\'\'\n"
    + "//////////////////////\n"
    + "// Run DSL script.\n"
    + "def result = shell.evaluate gameDSL\n\n\n"

var editorGroovy1 = new dslPrez.editor("editorGroovy1", content1);

function editorGroovy1Key0() {
    editorGroovy1.currentPress(0, 4);
    setStep(0,4);
    editorGroovy1.setValue(content1);
}

function editorGroovy1Key1() {
    if (editorGroovy1.currentPress(1, 4)) {
      setStep(1,4);
        var value = "def move(direction) {\n"
            + "    println \"moving $direction\"\n"
            + "}\n"
            + "move \"left\"\n";
        editorGroovy1.removeLine(5);
        editorGroovy1.replaceRange(value, {line:5, ch:0});
        editorGroovy1.addLineClass(5, "background", "highlight");
        editorGroovy1.addLineClass(6, "background", "highlight");
        editorGroovy1.addLineClass(7, "background", "highlight");
        editorGroovy1.addLineClass(8, "background", "highlight");
    }
}
function editorGroovy1Send() {
    var value = editorGroovy1.getValue();
    submitFormToGroovyConsole(value, "#outputGroovy1");
}

function editorGroovy1Key2() {
    if (editorGroovy1.currentPress(2, 4)) {
        setStep(2,4);
        editorGroovy1.removeLineClass(5, "background", "highlight");
        editorGroovy1.removeLineClass(6, "background", "highlight");
        editorGroovy1.removeLineClass(7, "background", "highlight");
        editorGroovy1.removeLineClass(8, "background", "highlight");
        var value = "def left = \"left\"\n";
        editorGroovy1.replaceRange(value, {line:8, ch:0});
        editorGroovy1.removeLine(9);
        value = "move left\n";
        editorGroovy1.replaceRange(value, {line:9, ch:0});
        editorGroovy1.addLineClass(8, "background", "highlight");
    }
}
function editorGroovy1Key3() {
    if (editorGroovy1.currentPress(3, 4)) {
        setStep(3,4);
        editorGroovy1.removeLineClass(8, "background", "highlight");
        var value = "def engine = new javax.script.ScriptEngineManager()\n                 .getEngineByName(\"groovy\")"
        editorGroovy1.replaceRange(value, {line:1, ch:0}, {line:1}) ;
        editorGroovy1.addLineClass(1, "background", "highlight");
    }
}

function editorGroovy1Key4() {
    if (editorGroovy1.currentPress(4, 4)) {
        setStep(4,4);
        editorGroovy1.removeLineClass(1, "background", "highlight");
        var value = "def result = engine.eval gameDSL"
        editorGroovy1.replaceRange(value, {line:14, ch:0}, {line: 14}) ;
        editorGroovy1.addLineClass(14, "background", "highlight");
    }
}

function editorGroovy1Key5() {
    if (editorGroovy1.currentPress(5, 4)) {
        editorGroovy1.removeLineClass(14, "background", "highlight");
    }
}

var keymap1 = {
    "0" : editorGroovy1Key0,
    "1" : editorGroovy1Key1,
    "2" : editorGroovy1Key2,
    "3" : editorGroovy1Key3,
    "4" : editorGroovy1Key4,
    "5" : editorGroovy1Key5,
    "Ctrl-S" : editorGroovy1Send,
    "Cmd-S" : editorGroovy1Send
};
editorGroovy1.addKeyMap(keymap1);

//------------------------------------------------------------------->
// Groovy2. Base Class
// step 1 define base class
// step 2 highlight move method
// step 3 remove move definition in script
// step 4 introduce compilerConfiguration
// step 5 inject it in groovy shell
//------------------------------------------------------------------->
var content2 = "// Configure the GroovyShell.\n"
            + "def shell = new GroovyShell()\n\n"
            + "///////////////////////\n"
            + "def gameDSL = '''\n"
            + "def move(direction) {\n"
            + "    println \"moving $direction\"\n"
            + "}\n"
            + "def left = \"left\"\n"
            + "move left\n\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "def result = shell.evaluate gameDSL\n";

var editorGroovy2 = new dslPrez.editor("editorGroovy2", content2);

function editorGroovy2Key0() {
    editorGroovy2.currentPress(0, 5);
    setStep(0,5);
    editorGroovy2.setValue(content2);
}

function editorGroovy2Key1() {
    if (editorGroovy2.currentPress(1, 5)) {
        setStep(1,5);
        var value = "abstract class GameScript extends Script {\n"
            + "  def move = {direction -> println \"moving $direction\" }\n"
            + "  def left = \"left\"\n"
            + "}\n";
        editorGroovy2.replaceRange(value, {line: 1, ch: 0});
        editorGroovy2.addLineClass(1, "background", "highlight");
        editorGroovy2.addLineClass(2, "background", "highlight");
        editorGroovy2.addLineClass(3, "background", "highlight");
        editorGroovy2.addLineClass(4, "background", "highlight");
    }
}
function editorGroovy2Key2() {
    if (editorGroovy2.currentPress(2, 5)) {
        setStep(2,5);
        editorGroovy2.removeLineClass(1, "background", "highlight");
        editorGroovy2.removeLineClass(2, "background", "highlight");
        editorGroovy2.removeLineClass(3, "background", "highlight");
        editorGroovy2.removeLineClass(4, "background", "highlight");
        editorGroovy2.addLineClass(9, "background", "highlight");
        editorGroovy2.addLineClass(10, "background", "highlight");
        editorGroovy2.addLineClass(11, "background", "highlight");
        editorGroovy2.addLineClass(12, "background", "highlight");
    }
}
function editorGroovy2Key3() {
    if (editorGroovy2.currentPress(3, 5)) {
        setStep(3,5);
        editorGroovy2.removeLineClass(9, "background", "highlight");
        editorGroovy2.removeLineClass(10, "background", "highlight");
        editorGroovy2.removeLineClass(11, "background", "highlight");
        editorGroovy2.removeLineClass(10, "background", "highlight");
        editorGroovy2.removeLine(9);
        editorGroovy2.removeLine(9);
        editorGroovy2.removeLine(9);
        editorGroovy2.removeLine(9);
    }
}
function editorGroovy2Key4() {
    if (editorGroovy2.currentPress(4, 5)) {
        setStep(4,5);
        var value = "def compilerConfig = new CompilerConfiguration()\n"
            + "compilerConfig.scriptBaseClass = GameScript.class.name\n"
            + "def binding = new Binding()\n";
        editorGroovy2.removeLine(6);
        editorGroovy2.replaceRange(value, {line: 5, ch: 0});
        editorGroovy2.addLineClass(5, "background", "highlight");
        editorGroovy2.addLineClass(6, "background", "highlight");
        editorGroovy2.addLineClass(7, "background", "highlight");
    }
}
function editorGroovy2Key5() {
    if (editorGroovy2.currentPress(5, 5)) {
        setStep(5,5);
        editorGroovy2.removeLineClass(5, "background", "highlight");
        editorGroovy2.removeLineClass(6, "background", "highlight");
        editorGroovy2.removeLineClass(7, "background", "highlight");
        editorGroovy2.removeLine(8);
        var value = "" +
            "def shell = new GroovyShell(this.class.classLoader,\n" +
            "                            binding,\n" +
            "                            compilerConfig)\n";
        editorGroovy2.replaceRange(value, {line: 8, ch: 0});
        editorGroovy2.addLineClass(8, "background", "highlight");
        editorGroovy2.addLineClass(9, "background", "highlight");
        editorGroovy2.addLineClass(10, "background", "highlight");
    }
}
function editorGroovy2Key6() {
    if (editorGroovy2.currentPress(6, 5)) {
        editorGroovy2.removeLineClass(8, "background", "highlight");
        editorGroovy2.removeLineClass(9, "background", "highlight");
        editorGroovy2.removeLineClass(10, "background", "highlight");
    }
}

function editorGroovy2Send() {
    var value = "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    value += editorGroovy2.getValue();
    submitFormToGroovyConsole(value, "#outputGroovy2");
}
var keymap2 = {
    "Ctrl-S" :editorGroovy2Send,
    "Cmd-S" :editorGroovy2Send,
    "0": editorGroovy2Key0,
    "1": editorGroovy2Key1,
    "2": editorGroovy2Key2,
    "3": editorGroovy2Key3,
    "4": editorGroovy2Key4,
    "5": editorGroovy2Key5,
    "6": editorGroovy2Key6
};

editorGroovy2.addKeyMap(keymap2);

//------------------------------------------------------------------->
//Groovy3. Binding
// step 1 introduce right in binding
// step 2 ad move right command
//------------------------------------------------------------------->
var content3 = "// Configure the GroovyShell.\n"
            + "abstract class GameScript extends Script {\n"
            + "    def move = {direction -> println \"moving $direction\" }\n"
            + "    def left = \"left\"\n"
            + "}\n"
            + "def compilerConfig = new CompilerConfiguration()\n"
            + "compilerConfig.scriptBaseClass = GameScript.class.name\n"
            + "def binding = new Binding()\n"
            + "def shell = new GroovyShell(this.class.classLoader,\n"
            + "    binding,\n"
            + "    compilerConfig)\n"
            + "///////////////////////\n"
            + "def gameDSL = '''\n"
            + "move left\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "def result = shell.evaluate gameDSL\n";

var editorGroovy3 = new dslPrez.editor("editorGroovy3", content3);

function editorGroovy3Send() {
    var value = editorGroovy3.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitFormToGroovyConsole(value, "#outputGroovy3");
}

function editorGroovy3Key0() {
    editorGroovy3.currentPress(0, 2);
    setStep(0,2);
    editorGroovy3.setValue(content3);
}

function editorGroovy3Key1() {
    if (editorGroovy3.currentPress(1, 2)) {
        setStep(1,2);
        var value = 'def binding = new Binding([right: "right"])';
        editorGroovy3.replaceRange(value, {line: 7, ch: 0}, {line: 7});
        editorGroovy3.addLineClass(7, "background", "highlight");
    }
}
function editorGroovy3Key2() {
    if (editorGroovy3.currentPress(2, 2)) {
        setStep(2,2);
        var value = 'move right\n';
        editorGroovy3.replaceRange(value, {line: 14, ch: 0});
        editorGroovy3.removeLineClass(7, "background", "highlight");
        editorGroovy3.addLineClass(14, "background", "highlight");
    }
}
function editorGroovy3Key3() {
    if (editorGroovy3.currentPress(3, 2)) {
        editorGroovy3.removeLineClass(14, "background", "highlight");
    }
}

var keymap3 = {
    "Ctrl-S" :editorGroovy3Send,
    "Cmd-S" :editorGroovy3Send,
    "0": editorGroovy3Key0,
    "1": editorGroovy3Key1,
    "2": editorGroovy3Key2,
    "3": editorGroovy3Key3
};
editorGroovy3.addKeyMap(keymap3);

//------------------------------------------------------------------->
// Groovy4. Structure my code
// step 1 add Position
// step 2 add Driection enums
// step 3 add turtle class
// step 4 new Turtle()
// step 5 highlight compilerconf + binding
// step 6 inject binding,
// step 7 remove def left in GameScript
//------------------------------------------------------------------->
var content4 = "// Configure the GroovyShell.\n"
    + "abstract class GameScript extends Script {\n"
    + "    def move = {direction -> println \"moving $direction\" }\n"
    + "    def left = \"left\"\n"
    + "}\n"
    + "def compilerConfig = new CompilerConfiguration()\n"
    + "compilerConfig.scriptBaseClass = GameScript.class.name\n"
    + "def binding = new Binding([right:\"right\"])\n"
    + "def shell = new GroovyShell(this.class.classLoader,\n"
    + "    binding,\n"
    + "    compilerConfig)\n"
    + "///////////////////////\n"
    + "def gameDSL = '''\n"
    + "move left\n"
    + "move right\n"
    + "'''\n"
    + "//////////////////////\n"
    + "// Run DSL script.\n"
    + "def result = shell.evaluate gameDSL\n";

var editorGroovy4 = new dslPrez.editor("editorGroovy4", content4);

function editorGroovy4Send() {
    var value = editorGroovy4.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitFormToGroovyConsole(value, "#outputGroovy4");
}

function editorGroovy4Key0() {
    editorGroovy4.currentPress(0, 8);
    setStep(0,8);
    editorGroovy4.setValue(content4);
}


function editorGroovy4Key1() {
    if (editorGroovy4.currentPress(1, 8)) {
        setStep(1,8);
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
        editorGroovy4.replaceRange(value, {line: 0, ch: 0});
        for(var i = 0; i <14 ; i++) {
            editorGroovy4.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy4Key2() {
    if (editorGroovy4.currentPress(2, 8)) {
        setStep(2,8);
        for(var i = 0; i <14 ; i++) {
            editorGroovy4.removeLineClass(i, "background", "highlight");
        }
        var value = "enum Direction {\n" +
            "    left, right\n" +
            "}\n";
        editorGroovy4.replaceRange(value, {line: 14, ch: 0});
        for(var i = 14; i <17 ; i++) {
            editorGroovy4.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy4Key3() {
    if (editorGroovy4.currentPress(3, 8)) {
        setStep(3,8);
        for(var i = 14; i <17 ; i++) {
            editorGroovy4.removeLineClass(i, "background", "highlight");
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
        editorGroovy4.replaceRange(value, {line: 17, ch: 0});
        for(var i = 17; i <37 ; i++) {
            editorGroovy4.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy4Key4() {
    if (editorGroovy4.currentPress(4, 8)) {
        setStep(4,8);
        editorGroovy4.scrollIntoView(58);
        for(var i = 17; i <37 ; i++) {
            editorGroovy4.removeLineClass(i, "background", "highlight");
        }
        var value = "def turtle = new Turtle(new Position(1, 1))\n";
        editorGroovy4.replaceRange(value, {line: 37, ch: 0});
        editorGroovy4.addLineClass(37, "background", "highlight");
    }
}
function editorGroovy4Key5() {
    if (editorGroovy4.currentPress(5, 8)) {
        setStep(5,8);
        editorGroovy4.removeLineClass(37, "background", "highlight");
        editorGroovy4.addLineClass(45, "background", "highlight");
        editorGroovy4.scrollIntoView(58);
    }
}
function editorGroovy4Key6() {
    if (editorGroovy4.currentPress(6, 8)) {
        setStep(6,8);
        editorGroovy4.removeLineClass(45, "background", "highlight");

        var value = "def compilerConfig = new CompilerConfiguration()\n" +
            "def binding = new Binding([move: turtle.&move,\n" +
            "                     left: Direction.left, right: Direction.right])\n";

        editorGroovy4.replaceRange(value, {line: 43, ch: 0}, {line:45});
        editorGroovy4.addLineClass(44, "background", "highlight");
        editorGroovy4.addLineClass(45, "background", "highlight");
        editorGroovy4.addLineClass(46, "background", "highlight");
    }
}
function editorGroovy4Key7() {
    if (editorGroovy4.currentPress(7, 8)) {
        setStep(7,8);
        for(var i = 44; i <47 ; i++) {
            editorGroovy4.removeLineClass(i, "background", "highlight");
        }
        for(var i = 39; i <43 ; i++) {
            editorGroovy4.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy4Key8() {
    if (editorGroovy4.currentPress(8, 8)) {
        setStep(8,8);
        for(var i = 39; i <43 ; i++) {
            editorGroovy4.removeLineClass(i, "background", "highlight");
        }
        editorGroovy4.replaceRange("", {line: 39, ch: 0}, {line:42});
    }
}


var keymap4 = {
    "Ctrl-S" :editorGroovy4Send,
    "Cmd-S" :editorGroovy4Send,
    "0": editorGroovy4Key0,
    "1": editorGroovy4Key1,
    "2": editorGroovy4Key2,
    "3": editorGroovy4Key3,
    "4": editorGroovy4Key4,
    "5": editorGroovy4Key5,
    "6": editorGroovy4Key6,
    "7": editorGroovy4Key7,
    "8": editorGroovy4Key8
};
editorGroovy4.addKeyMap(keymap4);

//------------------------------------------------------------------->
// Groovy5. Building JSON
//  step 1 def step= [] to use steps instead println
//  step 2 steps.add(start) to store initial position steps after move
//  step 3 hightlight
//  step 4 steps.add(newPosition) to store position after move
//  step 5 add json builder
//  step 6 highlight
//  step 7 mix plain groovy + DSL 4.times {move left}
//------------------------------------------------------------------->
/*
var content5 = "class Position {\n"
            + "  int x\n"
            + "  int y\n"
            + "  Position left() {\n"
            + "    new Position(x - 1, y);\n"
            + "  }\n"
            + "  Position right() {\n"
            + "    new Position(x + 1 , y);\n"
            + "  }\n"
            + "  Position up() {\n"
            + "    new Position(x , y + 1);\n"
            + "  }\n"
            + "  Position down() {\n"
            + "    new Position(x , y - 1);\n"
            + "  }\n"
            + "  def Position(moveX, moveY) {\n"
            + "    x = moveX\n"
            + "    y = moveY\n"
            + "  }\n"
            + "}\n\n"
            + "class Turtle {\n"
            + "  def currentPosition\n\n"
            + "  Turtle(Position start) {\n"
            + "    currentPosition = start\n\n"
            + "  }\n\n"
            + "  Turtle move(Direction dir) {\n"
            + "    Position newPosition\n"
            + "    if (dir == Direction.left) {\n"
            + "      newPosition = currentPosition.left()\n"
            + "    } else if (dir == Direction.right) {\n"
            + "      newPosition = currentPosition.right()\n"
            + "    } else if (dir == Direction.up) {\n"
            + "      newPosition = currentPosition.up()\n"
            + "    } else if (dir == Direction.down) {\n"
            + "      newPosition = currentPosition.down()\n"
            + "    }\n"
            + "    currentPosition = newPosition\n"
            + "    println \"x = $currentPosition.x and y = $currentPosition.y\"\n\n"
            + "    this\n"
            + "  }\n"
            + "}\n"
            + "enum Direction {\n"
            + "    left, right, up, down\n"
            + "}\n\n\n"
            + "def turtle = new Turtle(new Position(1, 1))\n"
            + "def compilerConfig = new CompilerConfiguration()\n"
            + "def binding = new Binding([turtle: turtle,\n"
            + "    move: turtle.&move,\n"
            + "    left: Direction.left,\n"
            + "    right: Direction.right,\n"
            + "    up: Direction.up,\n"
            + "    down: Direction.down])\n"
            + "def shell = new GroovyShell(this.class.classLoader,\n"
            + "    binding,\n"
            + "    compilerConfig)\n"
            + "///////////////////////\n"
            + "def gameDSL = '''\n\n"
            + "move right\n"
            + "move up\n\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "// result contains turtle object\n"
            + "// with all steps\n"
            + "shell.evaluate gameDSL\n\n\n\n\n\n\n\n\n\n\n\n\n";


var editorGroovy5 = new dslPrez.editor("editorGroovy5", content5);
editorGroovy5.foldCode(CodeMirror.Pos(0, 0));
editorGroovy5.foldCode(CodeMirror.Pos(46, 0));

function editorGroovy5TurtleSend() {
    var value = editorGroovy5.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitTurtleFormToGroovyConsole(value, "#outputGroovy5", 'canvasGroovy5');
}

function editorGroovy5Key0() {
    editorGroovy5.currentPress(0, 7);
    setStep(0,7);
    editorGroovy5.setValue(content5);
}


function editorGroovy5Key1() {
    if (editorGroovy5.currentPress(1, 7)) {
        setStep(1,7);
        editorGroovy5.scrollIntoView(0);
        var value = "  def steps = []";
        editorGroovy5.replaceRange(value, {line: 23, ch: 0}, {line:23});
        editorGroovy5.addLineClass(23, "background", "highlight");
    }
}
function editorGroovy5Key2() {
    if (editorGroovy5.currentPress(2, 7)) {
        setStep(2,7);
        editorGroovy5.removeLineClass(23, "background", "highlight");
        var value = "    steps.add(start)";
        editorGroovy5.replaceRange(value, {line: 26, ch: 0}, {line:26});
        editorGroovy5.addLineClass(26, "background", "highlight");
    }
}
function editorGroovy5Key3() {
    if (editorGroovy5.currentPress(3, 7)) {
        setStep(3,7);
        editorGroovy5.scrollIntoView(57);
        editorGroovy5.removeLineClass(26, "background", "highlight");
        editorGroovy5.addLineClass(41, "background", "highlight");
    }
}
function editorGroovy5Key4() {
    if (editorGroovy5.currentPress(4, 7)) {
        setStep(4,7);
        var value = "    steps.add(newPosition)";
        editorGroovy5.replaceRange(value, {line: 41, ch: 0}, {line:41});
    }
}
function editorGroovy5Key5() {
    if (editorGroovy5.currentPress(5, 7)) {
        setStep(5,7);
        editorGroovy5.scrollIntoView(82);
        editorGroovy5.removeLineClass(41, "background", "highlight");
        var value = "def builder = new groovy.json.JsonBuilder()\n" +
                    "builder {\n" +
                    "   steps binding[\"turtle\"].steps\n" +
                    "}\n" +
                    "println builder\n" +
                    "builder.toString()\n";
        editorGroovy5.replaceRange(value, {line: 74, ch: 0});
        for(var i = 74; i <80 ; i++) {
            editorGroovy5.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy5Key6() {
    if (editorGroovy5.currentPress(6, 7)) {
        setStep(6,7);
        for(var i = 74; i <80 ; i++) {
            editorGroovy5.removeLineClass(i, "background", "highlight");
        }

        for(var i = 64; i <68 ; i++) {
            editorGroovy5.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy5Key7() {
    if (editorGroovy5.currentPress(7, 7)) {
        setStep(7,7);
        var value = "4.times {\n" +
            "  move right\n" +
            "  move up\n" +
            "}";
        editorGroovy5.replaceRange(value, {line: 64, ch: 0}, {line: 67});
    }
}
function editorGroovy5Key8() {
    if (editorGroovy5.currentPress(8, 7)) {
        for(var i = 64; i <68 ; i++) {
            editorGroovy5.removeLineClass(i, "background", "highlight");
        }
    }
}

var keymap5 = {
    "Ctrl-S" :editorGroovy5TurtleSend,
    "Cmd-S" :editorGroovy5TurtleSend,
    "0": editorGroovy5Key0,
    "1": editorGroovy5Key1,
    "2": editorGroovy5Key2,
    "3": editorGroovy5Key3,
    "4": editorGroovy5Key4,
    "5": editorGroovy5Key5,
    "6": editorGroovy5Key6,
    "7": editorGroovy5Key7,
    "8": editorGroovy5Key8
};
editorGroovy5.addKeyMap(keymap5);
*/

//-------------------------------------------------------------------
//Groovy6. Command chaining
//step 1: highlight dsl syntax
//step 2: move left by 2
//step 3: add by method
//step 4: highlight steps.add from turtle move
//step 5: remove steps.add from turtle move
//step 6: add steps.add to turtle by
//step 7: change new Position to add direction
//------------------------------------------------------------------->
var content6 = "class Position {\n"
            + "int x\n"
            + "int y\n"
            + "Direction direction\n"
            + "Position left() {\n"
            + "  new Position(x, y, Direction.left);\n"
            + "}\n"
            + "Position right() {\n"
            + "    new Position(x, y, Direction.right);\n"
            + "}\n"
            + "Position up() {\n"
            + "    new Position(x , y, Direction.up);\n"
            + "}\n"
            + "Position down() {\n"
            + "    new Position(x , y, Direction.down);\n"
            + "}\n"
            + "def Position(moveX, moveY, myDirection) {\n"
            + "    x = moveX\n"
            + "    y = moveY\n"
            + "    direction = myDirection\n"
            + "}\n"
            + "Position move(Integer step) {\n"
            + "    Position newPosition\n"
            + "    if(direction == Direction.left) {\n"
            + "        newPosition = new Position(x - step, y, direction)\n"
            + "    } else if(direction == Direction.right) {\n"
            + "        newPosition = new Position(x + step, y, direction)\n"
            + "    } else if(direction == Direction.up) {\n"
            + "        newPosition = new Position(x, y + step, direction)\n"
            + "    } else if(direction == Direction.down) {\n"
            + "        newPosition = new Position(x, y - step, direction)\n"
            + "    }\n"
            + "}\n"
            + "}\n"
            + "\n"
            + "class Turtle {\n"
            + "    def currentPosition\n"
            + "    def steps = []\n"
            + "    Turtle(Position start) {\n"
            + "        currentPosition = start\n"
            + "        steps.add(start)\n"
            + "    }\n"
            + "\n"
            + "    Turtle move(Direction dir) {\n"
            + "        Position newPosition\n"
            + "        if (dir == Direction.left) {\n"
            + "            newPosition = currentPosition.left()\n"
            + "        } else if (dir == Direction.right) {\n"
            + "            newPosition = currentPosition.right()\n"
            + "        } else if (dir == Direction.up) {\n"
            + "            newPosition = currentPosition.up()\n"
            + "        } else if (dir == Direction.down) {\n"
            + "            newPosition = currentPosition.down()\n"
            + "        }\n"
            + "        currentPosition = newPosition\n"
            + "        steps.add(newPosition)\n"
            + "        this\n"
            + "    }\n"
            + "\n"
            + "}\n"
            + "enum Direction {\n"
            + "    left, right, up, down\n"
            + "}\n"
            + "\n"
            + "\n"
            + "def turtle = new Turtle(new Position(1, 1))\n"
            + "def compilerConfig = new CompilerConfiguration()\n"
            + "def binding = new Binding([turtle: turtle,\n"
            + "    move: turtle.&move,\n"
            + "    left: Direction.left,\n"
            + "    right: Direction.right,\n"
            + "    up: Direction.up,\n"
            + "    down: Direction.down])\n"
            + "def shell = new GroovyShell(this.class.classLoader,\n"
            + "    binding,\n"
            + "    compilerConfig)\n"
            + "///////////////////////\n"
            + "def gameDSL = '''\n"
            + "2.times {\n"
            + "    move right\n"
            + "    move up\n"
            + "}\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "// result contains turtle object\n"
            + "// with all steps\n"
            + "shell.evaluate gameDSL\n"
            + "def builder = new groovy.json.JsonBuilder()\n"
            + "builder {\n"
            + "    steps binding[\"turtle\"].steps\n"
            + "}\n"
            + "println builder\n"
            + "builder.toString()\n";

var editorGroovy6 = new dslPrez.editor("editorGroovy6", content6);
editorGroovy6.foldCode(CodeMirror.Pos(0, 0));
editorGroovy6.foldCode(CodeMirror.Pos(38, 0));
editorGroovy6.foldCode(CodeMirror.Pos(43, 0));
editorGroovy6.foldCode(CodeMirror.Pos(60, 0));
editorGroovy6.foldCode(CodeMirror.Pos(67, 0));
editorGroovy6.foldCode(CodeMirror.Pos(74, 0));

function editorGroovy6TurtleSend() {
    var value = editorGroovy6.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitTurtleFormToGroovyConsole(value, "#outputGroovy6", 'canvasGroovy6');
}

function editorGroovy6Key0() {
    editorGroovy6.currentPress(0, 7);
    setStep(0,7);
    editorGroovy6.setValue(content6);
}

function editorGroovy6Key1() {
    if (editorGroovy6.currentPress(1, 7)) {
        setStep(1,7);
        for(var i = 78; i <82 ; i++) {
            editorGroovy6.addLineClass(i, "background", "highlight");
        }
        editorGroovy6.scrollIntoView(82);
    }
}
function editorGroovy6Key2() {
    if (editorGroovy6.currentPress(2, 7)) {
        setStep(2,7);
        for(var i = 78; i <82 ; i++) {
            editorGroovy6.removeLineClass(i, "background", "highlight");
        }
        var value = "2.times {\n" +
            "  move right by 2 \n" +
            "  move up by 1\n" +
            "}";
        editorGroovy6.replaceRange(value, {line: 78, ch: 0}, {line:81});
        for(var i = 78; i <82 ; i++) {
            editorGroovy6.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy6Key3() {
    if (editorGroovy6.currentPress(3, 7)) {
        setStep(3,7);
        editorGroovy6.scrollIntoView(77);
        for(var i = 78; i <82 ; i++) {
            editorGroovy6.removeLineClass(i, "background", "highlight");
        }
        var value = "  Turtle by (Integer step) {\n" +
    "    Position newPosition = currentPosition.move(step)\n" +
    "    \n" +
    "    currentPosition = newPosition\n" +
    "    this\n" +
    "  }\n";
        editorGroovy6.replaceRange(value, {line: 59, ch: 0});
        for(var i = 59; i <65 ; i++) {
            editorGroovy6.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy6Key4() {
    if (editorGroovy6.currentPress(4, 7)) {
        setStep(4,7);
        editorGroovy6.foldCode(CodeMirror.Pos(43, 0));
        for(var i = 59; i <65 ; i++) {
            editorGroovy6.removeLineClass(i, "background", "highlight");
        }
        editorGroovy6.addLineClass(55, "background", "highlight");
    }
}
function editorGroovy6Key5() {
    if (editorGroovy6.currentPress(5, 7)) {
        setStep(5,7);
        editorGroovy6.removeLineClass(55, "background", "highlight");
        editorGroovy6.replaceRange("", {line: 55, ch: 0}, {line:55});
    }
}
function editorGroovy6Key6() {
    if (editorGroovy6.currentPress(6, 7)) {
        setStep(6,7);
        editorGroovy6.replaceRange("    steps.add(newPosition)\n", {line: 63, ch: 0});
        editorGroovy6.addLineClass(63, "background", "highlight");
    }
}
function editorGroovy6Key7() {
    if (editorGroovy6.currentPress(7, 7)) {
        setStep(7,7);
        editorGroovy6.scrollIntoView(90);
        editorGroovy6.removeLineClass(63, "background", "highlight");
        editorGroovy6.replaceRange("def turtle = new Turtle(new Position(1, 1, Direction.left))", {line: 72, ch: 0}, {line:72});
        editorGroovy6.addLineClass(72, "background", "highlight");
    }
}
function editorGroovy6Key8() {
    if (editorGroovy6.currentPress(8, 7)) {
        editorGroovy6.removeLineClass(72, "background", "highlight");
    }
}

var keymap6 = {
    "Ctrl-S": editorGroovy6TurtleSend,
    "Cmd-S": editorGroovy6TurtleSend,
    "0": editorGroovy6Key0,
    "1": editorGroovy6Key1,
    "2": editorGroovy6Key2,
    "3": editorGroovy6Key3,
    "4": editorGroovy6Key4,
    "5": editorGroovy6Key5,
    "6": editorGroovy6Key6,
    "7": editorGroovy6Key7,
    "8": editorGroovy6Key8
};
editorGroovy6.addKeyMap(keymap6);

//-------------------------------------------------------------------
//Groovy6b. Command chaining odd number
//step 1: highlight dsl syntax
//step 2: move left by 2 steps
//step 3: highlight by method
//step 4: change by to return map with silent word: steps/step
//------------------------------------------------------------------->
var content6b = "class Position {\n"
            + "int x\n"
            + "int y\n"
            + "Direction direction\n"
            + "Position left() {\n"
            + "    new Position(x, y, Direction.left);\n"
            + "}\n"
            + "Position right() {\n"
            + "    new Position(x, y, Direction.right);\n"
            + "}\n"
            + "Position up() {\n"
            + "    new Position(x , y, Direction.up);\n"
            + "}\n"
            + "Position down() {\n"
            + "    new Position(x , y, Direction.down);\n"
            + "}\n"
            + "def Position(moveX, moveY, myDirection) {\n"
            + "    x = moveX\n"
            + "    y = moveY\n"
            + "    direction = myDirection\n"
            + "}\n"
            + "Position move(Integer step) {\n"
            + "    Position newPosition\n"
            + "    if(direction == Direction.left) {\n"
            + "        newPosition = new Position(x - step, y, direction)\n"
            + "    } else if(direction == Direction.right) {\n"
            + "        newPosition = new Position(x + step, y, direction)\n"
            + "    } else if(direction == Direction.up) {\n"
            + "        newPosition = new Position(x, y + step, direction)\n"
            + "    } else if(direction == Direction.down) {\n"
            + "        newPosition = new Position(x, y - step, direction)\n"
            + "    }\n"
            + "}\n"
            + "}\n"
            + "\n"
            + "class Turtle {\n"
            + "    def currentPosition\n"
            + "    def steps = []\n"
            + "    Turtle(Position start) {\n"
            + "        currentPosition = start\n"
            + "        steps.add(start)\n"
            + "    }\n"
            + "\n"
            + "    Turtle move(Direction dir) {\n"
            + "        Position newPosition\n"
            + "        if (dir == Direction.left) {\n"
            + "            newPosition = currentPosition.left()\n"
            + "        } else if (dir == Direction.right) {\n"
            + "            newPosition = currentPosition.right()\n"
            + "        } else if (dir == Direction.up) {\n"
            + "            newPosition = currentPosition.up()\n"
            + "        } else if (dir == Direction.down) {\n"
            + "            newPosition = currentPosition.down()\n"
            + "        }\n"
            + "        currentPosition = newPosition\n"
            + "        this\n"
            + "    }\n"
            + "\n"
            + "    Turtle by (Integer step) {\n"
            + "        Position newPosition = currentPosition.move(step)\n"
            + "        steps.add(newPosition)\n"
            + "        currentPosition = newPosition\n"
            + "        \n"
            + "        this\n"
            + "    }\n"
            + "}\n"
            + "enum Direction {\n"
            + "    left, right, up, down\n"
            + "}\n"
            + "\n"
            + "def turtle = new Turtle(new Position(1, 1, Direction.left))\n"
            + "def compilerConfig = new CompilerConfiguration()\n"
            + "def binding = new Binding([turtle: turtle,\n"
            + "    move: turtle.&move,\n"
            + "    left: Direction.left,\n"
            + "    right: Direction.right,\n"
            + "    up: Direction.up,\n"
            + "    down: Direction.down])\n"
            + "def shell = new GroovyShell(this.class.classLoader,\n"
            + "    binding,\n"
            + "    compilerConfig)\n"
            + "///////////////////////\n"
            + "def gameDSL = '''\n"
            + "2.times {\n"
            + "    move right by 2\n"
            + "    move up by 1\n"
            + "}\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "// result contains turtle object\n"
            + "// with all steps\n"
            + "shell.evaluate gameDSL\n"
            + "def builder = new groovy.json.JsonBuilder()\n"
            + "builder {\n"
            + "    steps binding[\"turtle\"].steps\n"
            + "}\n"
            + "println builder\n"
            + "builder.toString()\n";

var editorGroovy6b = new dslPrez.editor("editorGroovy6b", content6b);
editorGroovy6b.foldCode(CodeMirror.Pos(0, 0));
editorGroovy6b.foldCode(CodeMirror.Pos(38, 0));
editorGroovy6b.foldCode(CodeMirror.Pos(43, 0));
editorGroovy6b.foldCode(CodeMirror.Pos(66, 0));
editorGroovy6b.foldCode(CodeMirror.Pos(74, 0));

function editorGroovy6bTurtleSend() {
    var value = editorGroovy6b.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitTurtleFormToGroovyConsole(value, "#outputGroovy6b", 'canvasGroovy6b');
}

function editorGroovy6bKey0() {
    editorGroovy6b.currentPress(0, 4);
    setStep(0,4);
    editorGroovy6b.setValue(content6b);
}

function editorGroovy6bKey1() {
    if (editorGroovy6b.currentPress(1, 4)) {
        setStep(1,4);
        for(var i = 83; i <87 ; i++) {
            editorGroovy6b.addLineClass(i, "background", "highlight");
        }
        editorGroovy6b.scrollIntoView(87);
    }
}
function editorGroovy6bKey2() {
    if (editorGroovy6b.currentPress(2, 4)) {
        setStep(2,4);
        for(var i = 32; i <87 ; i++) {
            editorGroovy6b.removeLineClass(i, "background", "highlight");
        }
        var value = "2.times {\n" +
            "    move right by 2 steps\n" +
            "    move up by 1 step\n" +
            "}";
        editorGroovy6b.replaceRange(value, {line: 83, ch: 0}, {line:86});
        for(var i = 83; i <87 ; i++) {
            editorGroovy6b.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy6bKey3() {
    if (editorGroovy6b.currentPress(3, 4)) {
        setStep(3,4);
        for(var i = 83; i <87 ; i++) {
            editorGroovy6b.removeLineClass(i, "background", "highlight");
        }
        for(var i = 58; i <65 ; i++) {
            editorGroovy6b.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy6bKey4() {
    if (editorGroovy6b.currentPress(4, 4)) {
        setStep(4,4);
        for(var i = 58; i <65 ; i++) {
            editorGroovy6b.removeLineClass(i, "background", "highlight");
        }
        var value = "   Map by (Integer step) {\n" +
            "     Position newPosition = currentPosition.move(step)\n" +
            "     steps.add(newPosition) \n" +
            "     currentPosition = newPosition\n" +
            "     [steps:\"\", step:\"\"] \n\n" +
            "   }";
        editorGroovy6b.replaceRange(value, {line: 58, ch: 0}, {line:64});
        for(var i = 58; i <64 ; i++) {
            editorGroovy6b.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy6bKey5() {
    if (editorGroovy6b.currentPress(5, 4)) {
        for(var i = 58; i <64 ; i++) {
            editorGroovy6b.removeLineClass(i, "background", "highlight");
        }
    }
}

var keymap6b = {
    "Ctrl-S": editorGroovy6bTurtleSend,
    "Cmd-S": editorGroovy6bTurtleSend,
    "0": editorGroovy6bKey0,
    "1": editorGroovy6bKey1,
    "2": editorGroovy6bKey2,
    "3": editorGroovy6bKey3,
    "4": editorGroovy6bKey4,
    "5": editorGroovy6bKey5
};
editorGroovy6b.addKeyMap(keymap6b);


//-------------------------------------------------------------------
//Groovy6c. kiss
//step 1 add kiss() to dsl
//step 2 define kiss
//step 3 highlight binding
//step 4 add kiss to binding
//step 5 replace kiss() by kiss
//step 6 comment binding
//step 7 define property missing: I treat kiss as porperty and then do a method call
//step 8 add baseclass into compiler configuration
//------------------------------------------------------------------->
/*var content6c = "class Position {\n"
    + "  int x\n"
    + "  int y\n"
    + "  Direction direction\n"
    + "  Position left() {\n"
    + "    new Position(x, y, Direction.left);\n"
    + "  }  \n"
    + "  Position right() {\n"
    + "    new Position(x, y, Direction.right);\n"
    + "  }\n"
    + "  Position up() {\n"
    + "    new Position(x , y, Direction.up);\n"
    + "  }\n"
    + "  Position down() {\n"
    + "    new Position(x , y, Direction.down);\n"
    + "  }\n"
    + "  def Position(moveX, moveY, myDirection) {\n"
    + "    x = moveX\n"
    + "    y = moveY\n"
    + "    direction = myDirection\n"
    + "  }\n"
    + "  Position move(Integer step) {\n"
    + "    Position newPosition\n"
    + "    if(direction == Direction.left) {\n"
    + "        newPosition = new Position(x - step, y, direction)\n"
    + "    } else if(direction == Direction.right) {\n"
    + "        newPosition = new Position(x + step, y, direction)\n"
    + "    } else if(direction == Direction.up) {\n"
    + "        newPosition = new Position(x, y + step, direction)\n"
    + "    } else if(direction == Direction.down) {\n"
    + "        newPosition = new Position(x, y - step, direction)\n"
    + "    }\n"
    + "  }\n"
    + "}\n"
    + "\n"
    + "class Turtle {\n"
    + "    def currentPosition\n"
    + "    def steps = []\n"
    + "    Turtle(Position start) {\n"
    + "        currentPosition = start\n"
    + "        steps.add(start)\n"
    + "    }\n"
    + "\n"
    + "    Turtle move(Direction dir) {\n"
    + "        Position newPosition\n"
    + "        if (dir == Direction.left) {\n"
    + "            newPosition = currentPosition.left()\n"
    + "        } else if (dir == Direction.right) {\n"
    + "            newPosition = currentPosition.right()\n"
    + "        } else if (dir == Direction.up) {\n"
    + "            newPosition = currentPosition.up()\n"
    + "        } else if (dir == Direction.down) {\n"
    + "            newPosition = currentPosition.down()\n"
    + "        }\n"
    + "        currentPosition = newPosition\n"
    + "        this\n"
    + "    }\n"
    + "\n"
    + "    Turtle by (Integer step) {\n"
    + "        Position newPosition = currentPosition.move(step)\n"
    + "        steps.add(newPosition)\n"
    + "        currentPosition = newPosition\n"
    + "        \n"
    + "        this\n"
    + "    }\n"
    + "}\n"
    + "enum Direction {\n"
    + "    left, right, up, down\n"
    + "}\n"
    + "\n"
    + "def turtle = new Turtle(new Position(1, 1, Direction.left))\n"
    + "def compilerConfig = new CompilerConfiguration()\n"
    + "def binding = new Binding([turtle: turtle,\n"
    + "    move: turtle.&move,\n"
    + "    left: Direction.left,\n"
    + "    right: Direction.right,\n"
    + "    up: Direction.up,\n"
    + "    down: Direction.down])\n"
    + "def shell = new GroovyShell(this.class.classLoader,\n"
    + "    binding,\n"
    + "    compilerConfig)\n"
    + "///////////////////////\n"
    + "def gameDSL = '''\n"
    + "2.times {\n"
    + "    move right by 2\n"
    + "    move up by 1\n"
    + "}\n"
    + "'''\n"
    + "//////////////////////\n"
    + "// Run DSL script.\n"
    + "// result contains turtle object\n"
    + "// with all steps\n"
    + "shell.evaluate gameDSL\n"
    + "def builder = new groovy.json.JsonBuilder()\n"
    + "builder {\n"
    + "    steps binding[\"turtle\"].steps\n"
    + "}\n"
    + "println builder\n"
    + "builder.toString()\n";

var editorGroovy6c = new dslPrez.editor("editorGroovy6c", content6c);
editorGroovy6c.foldCode(CodeMirror.Pos(0, 0));
editorGroovy6c.foldCode(CodeMirror.Pos(38, 0));
editorGroovy6c.foldCode(CodeMirror.Pos(43, 0));
editorGroovy6c.foldCode(CodeMirror.Pos(66, 0));
editorGroovy6c.foldCode(CodeMirror.Pos(74, 0));

function editorGroovy6cTurtleSend() {
    var value = editorGroovy6c.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitTurtleFormToGroovyConsole(value, "#outputGroovy6c", 'canvasGroovy6c');
}

function editorGroovy6cKey0() {
    editorGroovy6c.currentPress(0, 8);
    setStep(0,8);
    editorGroovy6c.setValue(content6c);
    editorGroovy6c.foldCode(CodeMirror.Pos(0, 0));
    editorGroovy6c.foldCode(CodeMirror.Pos(38, 0));
    editorGroovy6c.foldCode(CodeMirror.Pos(43, 0));
    editorGroovy6c.foldCode(CodeMirror.Pos(66, 0));
    editorGroovy6c.foldCode(CodeMirror.Pos(74, 0));
}

function editorGroovy6cKey1() {
    if (editorGroovy6c.currentPress(1, 8)) {
        setStep(1,8);
        editorGroovy6c.scrollIntoView(96);
        for(var i = 83; i <87 ; i++) {
            editorGroovy6c.removeLineClass(i, "background", "highlight");
        }
        var value = "    kiss()\n";
        editorGroovy6c.replaceRange(value, {line: 86, ch: 0});
        editorGroovy6c.addLineClass(86, "background", "highlight");
    }
}

function editorGroovy6cKey2() {
    if (editorGroovy6c.currentPress(2, 8)) {
        setStep(2,8);
        editorGroovy6c.removeLineClass(86, "background", "highlight");
        editorGroovy6c.scrollIntoView(44);
        var value = "   def kiss() {\n" +
            "     println \"<3 <3\" \n" +
            "   }\n";
        editorGroovy6c.replaceRange(value, {line: 65, ch: 0});
        for(var i = 65; i <68 ; i++) {
            editorGroovy6c.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy6cKey3() {
    if (editorGroovy6c.currentPress(3, 8)) {
        setStep(3,8);
        for(var i = 65; i <68 ; i++) {
            editorGroovy6c.removeLineClass(i, "background", "highlight");
        }
        for(var i = 75; i <81 ; i++) {
            editorGroovy6c.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy6cKey4() {
    if (editorGroovy6c.currentPress(4, 8)) {
        setStep(4,8);
        for(var i = 75; i <81 ; i++) {
            editorGroovy6c.removeLineClass(i, "background", "highlight");
        }
        var value = "    kiss: turtle.&kiss, \n";
        editorGroovy6c.replaceRange(value, {line: 77, ch: 0});
        editorGroovy6c.addLineClass(77, "background", "highlight");
    }
}

function editorGroovy6cKey5() {
    if (editorGroovy6c.currentPress(5, 8)) {
        setStep(5,8);
        editorGroovy6c.scrollIntoView(95);
        editorGroovy6c.removeLineClass(77, "background", "highlight");
        var value = "    kiss";
        editorGroovy6c.replaceRange(value, {line: 90, ch: 0}, {line:90});
        editorGroovy6c.addLineClass(90, "background", "highlight");
    }
}

function editorGroovy6cKey6() {
    if (editorGroovy6c.currentPress(6, 8)) {
        setStep(6,8);
        editorGroovy6c.removeLineClass(90, "background", "highlight");
        var value = "    //kiss: turtle.&kiss,";
        editorGroovy6c.replaceRange(value, {line: 77, ch: 0}, {line:77});
        editorGroovy6c.addLineClass(77, "background", "highlight");
    }
}

function editorGroovy6cKey7() {
    if (editorGroovy6c.currentPress(7, 8)) {
        setStep(7,8);
        editorGroovy6c.removeLineClass(77, "background", "highlight");
        var value = "abstract class GameScript extends Script {\n"
            + "    def propertyMissing(name, args) {\n"
            + "        if(turtle.metaClass.respondsTo(this, name)) {\n"
            + "            binding.turtle.\"$name\"()\n"
            + "        }\n"
            + "    }\n"
            + "}";
        editorGroovy6c.replaceRange(value, {line: 72, ch: 0});
        for(var i = 72; i <79 ; i++) {
            editorGroovy6c.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy6cKey8() {
    if (editorGroovy6c.currentPress(8, 8)) {
        setStep(8,8);
        for(var i = 72; i <79 ; i++) {
            editorGroovy6c.removeLineClass(i, "background", "highlight");
        }
        editorGroovy6c.replaceRange("compilerConfig.scriptBaseClass = GameScript.class.name\n", {line: 81, ch: 0});
        editorGroovy6c.addLineClass(81, "background", "highlight");
    }
}

function editorGroovy6cKey9() {
    if (editorGroovy6c.currentPress(9, 8)) {
        editorGroovy6c.removeLineClass(81, "background", "highlight");
    }
}


//abstract class GameScript extends Script {
//    def propertyMissing(name, args) {
//        if(name=="kiss") {
//            binding.turtle."$name"()
//        }
//    }
//}


var keymap6c = {
    "Ctrl-S": editorGroovy6cTurtleSend,
    "Cmd-S": editorGroovy6cTurtleSend,
    "0": editorGroovy6cKey0,
    "1": editorGroovy6cKey1,
    "2": editorGroovy6cKey2,
    "3": editorGroovy6cKey3,
    "4": editorGroovy6cKey4,
    "5": editorGroovy6cKey5,
    "6": editorGroovy6cKey6,
    "7": editorGroovy6cKey7,
    "8": editorGroovy6cKey8,
    "9": editorGroovy6cKey9
};
editorGroovy6c.addKeyMap(keymap6c);*/


//-------------------------------------------------------------------
//Groovy7. Adding behavior to Integer
//step1: highlight dsl
//step2: move left by 2.steps
//step3: add class StepCategory
//step4: highlight shell.eval
//step5: modify shell.eval with use()
//step6: highlight class StepCategory
//step7: replace with @Category annotation
//------------------------------------------------------------------->
var content7 = "class Position {\n"
            + "int x\n"
            + "int y\n"
            + "Direction direction\n"
            + "Position left() {\n"
            + "    new Position(x, y, Direction.left);\n"
            + "}\n"
            + "Position right() {\n"
            + "    new Position(x, y, Direction.right);\n"
            + "}\n"
            + "Position up() {\n"
            + "    new Position(x , y, Direction.up);\n"
            + "}\n"
            + "Position down() {\n"
            + "    new Position(x , y, Direction.down);\n"
            + "}\n"
            + "def Position(moveX, moveY, myDirection) {\n"
            + "    x = moveX\n"
            + "    y = moveY\n"
            + "    direction = myDirection\n"
            + "}\n"
            + "Position move(Integer step) {\n"
            + "    Position newPosition\n"
            + "    if(direction == Direction.left) {\n"
            + "        newPosition = new Position(x - step, y, direction)\n"
            + "    } else if(direction == Direction.right) {\n"
            + "        newPosition = new Position(x + step, y, direction)\n"
            + "    } else if(direction == Direction.up) {\n"
            + "        newPosition = new Position(x, y + step, direction)\n"
            + "    } else if(direction == Direction.down) {\n"
            + "        newPosition = new Position(x, y - step, direction)\n"
            + "    }\n"
            + "}\n"
            + "}\n"
            + "\n"
            + "class Turtle {\n"
            + "    def currentPosition\n"
            + "    def steps = []\n"
            + "    Turtle(Position start) {\n"
            + "        currentPosition = start\n"
            + "        steps.add(start)\n"
            + "    }\n"
            + "\n"
            + "    Turtle move(Direction dir) {\n"
            + "        Position newPosition\n"
            + "        if (dir == Direction.left) {\n"
            + "            newPosition = currentPosition.left()\n"
            + "        } else if (dir == Direction.right) {\n"
            + "            newPosition = currentPosition.right()\n"
            + "        } else if (dir == Direction.up) {\n"
            + "            newPosition = currentPosition.up()\n"
            + "        } else if (dir == Direction.down) {\n"
            + "            newPosition = currentPosition.down()\n"
            + "        }\n"
            + "        currentPosition = newPosition\n"
            + "        this\n"
            + "    }\n"
            + "\n"
            + "    Turtle by (Integer step) {\n"
            + "        Position newPosition = currentPosition.move(step)\n"
            + "        steps.add(newPosition)\n"
            + "        currentPosition = newPosition\n"
            + "        this\n"
            + "    }\n"
            + "}\n"
            + "enum Direction {\n"
            + "    left, right, up, down\n"
            + "}\n"
            + "\n"
            + "\n"
            + "def turtle = new Turtle(new Position(1, 1, Direction.left))\n"
            + "def compilerConfig = new CompilerConfiguration()\n"
            + "def binding = new Binding([turtle: turtle,\n"
            + "    move: turtle.&move,\n"
            + "    left: Direction.left,\n"
            + "    right: Direction.right,\n"
            + "    up: Direction.up,\n"
            + "    down: Direction.down])\n"
            + "def shell = new GroovyShell(this.class.classLoader,\n"
            + "    binding,\n"
            + "    compilerConfig)\n"
            + "///////////////////////\n"
            + "def gameDSL = '''\n"
            + "2.times {\n"
            + "    move right by 2\n"
            + "    move up by 1\n"
            + "}\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "// result contains turtle object\n"
            + "// with all steps\n"
            + "shell.evaluate gameDSL\n"
            + "def builder = new groovy.json.JsonBuilder()\n"
            + "builder {\n"
            + "    steps binding[\"turtle\"].steps\n"
            + "}\n"
            + "println builder\n"
            + "builder.toString()\n"
            + "\n";

var editorGroovy7 = new dslPrez.editor("editorGroovy7", content7);

function editorGroovy7TurtleSend() {
    var value = editorGroovy7.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitTurtleFormToGroovyConsole(value, "#outputGroovy7", 'canvasGroovy7');
}

function editorGroovy7Key0() {
    editorGroovy7.currentPress(0, 7);
    setStep(0,7);
    editorGroovy7.setValue(content7);
}

function editorGroovy7Key1() {
    if (editorGroovy7.currentPress(1, 7)) {
        setStep(1,7);
        for(var i = 83; i <87 ; i++) {
            editorGroovy7.addLineClass(i, "background", "highlight");
        }
        editorGroovy7.scrollIntoView(87);
    }
}
function editorGroovy7Key2() {
    if (editorGroovy7.currentPress(2, 7)) {
        setStep(2,7);
        var value = "2.times {\n" +
            "  move right by 2.steps\n" +
            "  move up by 1.steps\n" +
            "}";
        editorGroovy7.replaceRange(value, {line: 83, ch: 0}, {line: 86});
        for(var i = 83; i <87 ; i++) {
            editorGroovy7.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy7Key3() {
    if (editorGroovy7.currentPress(3, 7)) {
        setStep(3,7);
        editorGroovy7.scrollIntoView(55);
        for(var i = 83; i <87 ; i++) {
            editorGroovy7.removeLineClass(i, "background", "highlight");
        }
        var value = "class StepCategory {\n" +
            "  static Integer getSteps(Integer self) {\n" +
            "    self\n" +
            "  }\n" +
            "}\n\n";
        editorGroovy7.replaceRange(value, {line: 65, ch: 0});
        for(var i = 65; i <70 ; i++) {
            editorGroovy7.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy7Key4() {
    if (editorGroovy7.currentPress(4, 7)) {
        setStep(4,7);
        for(var i = 65; i <70 ; i++) {
            editorGroovy7.removeLineClass(i, "background", "highlight");
        }
        editorGroovy7.addLineClass(98, "background", "highlight");
        editorGroovy7.scrollIntoView(105);
    }
}

function editorGroovy7Key5() {
    if (editorGroovy7.currentPress(5, 7)) {
        setStep(5,7);
        var value = "shell.evaluate \"use(StepCategory) {\" + gameDSL + \"}\"";
        editorGroovy7.replaceRange(value, {line: 98, ch: 0}, {line:98});
        editorGroovy7.addLineClass(98, "background", "highlight");
    }
}

function editorGroovy7Key6() {
    if (editorGroovy7.currentPress(6, 7)) {
        setStep(6,7);
        editorGroovy7.scrollIntoView(50);
        editorGroovy7.removeLineClass(98, "background", "highlight");
        for(var i = 65; i <70 ; i++) {
            editorGroovy7.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy7Key7() {
    if (editorGroovy7.currentPress(7, 7)) {
        setStep(7,7);
        for(var i = 65; i <70 ; i++) {
            editorGroovy7.removeLineClass(i, "background", "highlight");
        }
        var value = "@Category(Integer)\n" +
            "class StepCategory {\n" +
            "    Integer getSteps() {\n" +
            "        this;\n" +
            "    }\n" +
            "}";
        editorGroovy7.replaceRange(value, {line: 65, ch: 0}, {line: 70});
        for(var i = 65; i <71 ; i++) {
            editorGroovy7.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy7Key8() {
    if (editorGroovy7.currentPress(8, 7)) {
        for(var i = 65; i <71 ; i++) {
            editorGroovy7.removeLineClass(i, "background", "highlight");
        }
    }
}

var keymap7 = {
    "Ctrl-S": editorGroovy7TurtleSend,
    "Cmd-S": editorGroovy7TurtleSend,
    "0": editorGroovy7Key0,
    "1": editorGroovy7Key1,
    "2": editorGroovy7Key2,
    "3": editorGroovy7Key3,
    "4": editorGroovy7Key4,
    "5": editorGroovy7Key5,
    "6": editorGroovy7Key6,
    "7": editorGroovy7Key7,
    "8": editorGroovy7Key8
};
editorGroovy7.addKeyMap(keymap7);

//------------------------------------------------------------------->
// Groovy8. TypeChecked
// step 1: highlight compiler
// step 2: add typechecked ext
//------------------------------------------------------------------->
var content8 = "class Position {\n"
            + "int x\n"
            + "int y\n"
            + "Direction direction\n"
            + "Position left() {\n"
            + "    new Position(x, y, Direction.left);\n"
            + "}\n"
            + "Position right() {\n"
            + "    new Position(x, y, Direction.right);\n"
            + "}\n"
            + "Position up() {\n"
            + "    new Position(x , y, Direction.up);\n"
            + "}\n"
            + "Position down() {\n"
            + "    new Position(x , y, Direction.down);\n"
            + "}\n"
            + "def Position(moveX, moveY, myDirection) {\n"
            + "    x = moveX\n"
            + "    y = moveY\n"
            + "    direction = myDirection\n"
            + "}\n"
            + "Position move(Integer step) {\n"
            + "    Position newPosition\n"
            + "    if(direction == Direction.left) {\n"
            + "        newPosition = new Position(x - step, y, direction)\n"
            + "    } else if(direction == Direction.right) {\n"
            + "        newPosition = new Position(x + step, y, direction)\n"
            + "    } else if(direction == Direction.up) {\n"
            + "        newPosition = new Position(x, y + step, direction)\n"
            + "    } else if(direction == Direction.down) {\n"
            + "        newPosition = new Position(x, y - step, direction)\n"
            + "    }\n"
            + "}\n"
            + "}\n"
            + "\n"
            + "class Turtle {\n"
            + "    def currentPosition\n"
            + "    def steps = []\n"
            + "    Turtle(Position start) {\n"
            + "        currentPosition = start\n"
            + "        steps.add(start)\n"
            + "    }\n"
            + "\n"
            + "    Turtle move(Direction dir) {\n"
            + "        Position newPosition\n"
            + "        if (dir == Direction.left) {\n"
            + "            newPosition = currentPosition.left()\n"
            + "        } else if (dir == Direction.right) {\n"
            + "            newPosition = currentPosition.right()\n"
            + "        } else if (dir == Direction.up) {\n"
            + "            newPosition = currentPosition.up()\n"
            + "        } else if (dir == Direction.down) {\n"
            + "            newPosition = currentPosition.down()\n"
            + "        }\n"
            + "        currentPosition = newPosition\n"
            + "        this\n"
            + "    }\n"
            + "\n"
            + "    Turtle by (Integer step) {\n"
            + "        Position newPosition = currentPosition.move(step)\n"
            + "        steps.add(newPosition)\n"
            + "        currentPosition = newPosition\n"
            + "        this\n"
            + "    }\n"
            + "}\n"
            + "\n"
            + "enum Direction {\n"
            + "    left, right, up, down\n"
            + "}\n"
            + "\n"
            + "\n"
            + "def turtle = new Turtle(new Position(1, 1, Direction.left))\n"
            + "\n"
            + "def binding = new Binding([turtle: turtle,\n"
            + "    move: turtle.&move,\n"
            + "    left: Direction.left,\n"
            + "    right: Direction.right,\n"
            + "    up: Direction.up,\n"
            + "    down: Direction.down])\n"
            + "\n"
            + "def compilerConfig = new CompilerConfiguration()\n"
            + "\n"
            + "def shell = new GroovyShell(this.class.classLoader,\n"
            + "    binding,\n"
            + "    compilerConfig)\n"
            + "///////////////////////\n"
            + "def gameDSL = '''\n"
            + "moooooooooove right by 2\n"
            + "move up by 3\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "// result contains turtle object\n"
            + "// with all steps\n"
            + "shell.evaluate gameDSL\n"
            + "\n"
            + "def builder = new groovy.json.JsonBuilder()\n"
            + "builder {\n"
            + "    steps binding[\"turtle\"].steps\n"
            + "}\n"
            + "println builder\n"
            + "builder.toString()\n"
            + "\n"
            + "\n"
            + "\n";

var editorGroovy8 = new dslPrez.editor("editorGroovy8", content8);

function editorGroovy8TurtleSend() {
    var value = editorGroovy8.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    value += "import org.codehaus.groovy.control.customizers.ASTTransformationCustomizer;\nimport groovy.transform.TypeChecked\n";
    submitTurtleFormToGroovyConsole(value, "#outputGroovy8", 'canvasGroovy8');
}

function editorGroovy8Key0() {
    editorGroovy8.currentPress(0, 2);
    setStep(0,2);
    editorGroovy8.setValue(content8);
}

function editorGroovy8Key1() {
    if (editorGroovy8.currentPress(1, 2)) {
        setStep(1,2);
        editorGroovy8.addLineClass(80, "background", "highlight");
        editorGroovy8.addLineClass(81, "background", "highlight");
        editorGroovy8.scrollIntoView(105);
    }
}
function editorGroovy8Key2() {
    if (editorGroovy8.currentPress(2, 2)) {
        setStep(2,2);
        var value = "compilerConfig.addCompilationCustomizers(\n" +
            "    new ASTTransformationCustomizer(TypeChecked,\n"+
            "        extensions:['TurtleExtension.groovy']))\n\n";
        editorGroovy8.replaceRange(value, {line:82, ch:0});
        editorGroovy8.addLineClass(80, "background", "highlight");
        editorGroovy8.addLineClass(81, "background", "highlight");
        editorGroovy8.addLineClass(82, "background", "highlight");
        editorGroovy8.addLineClass(83, "background", "highlight");
        editorGroovy8.addLineClass(84, "background", "highlight");
    }
}
function editorGroovy8Key3() {
    if (editorGroovy8.currentPress(3, 2)) {
        editorGroovy8.removeLineClass(80, "background", "highlight");
        editorGroovy8.removeLineClass(81, "background", "highlight");
        editorGroovy8.removeLineClass(82, "background", "highlight");
        editorGroovy8.removeLineClass(83, "background", "highlight");
        editorGroovy8.removeLineClass(84, "background", "highlight");
    }
}

var keymap8 = {
    "0": editorGroovy8Key0,
    "1": editorGroovy8Key1,
    "2": editorGroovy8Key2,
    "3": editorGroovy8Key3,
    "Ctrl-S": editorGroovy8TurtleSend,
    "Cmd-S": editorGroovy8TurtleSend
};
editorGroovy8.addKeyMap(keymap8);
editorGroovy8.scrollIntoView({line:80, ch:0});

//------------------------------------------------------------------->
// Groovy9. Turn around
// step1: highlight dsl
// step2: modify dsl with infinite loop
// step3: highlight ASTTransformationCustomizer
// step4: add TimeInterrupt
//------------------------------------------------------------------->
/*
var content9 = "class Position {\n"
            + "int x\n"
            + "int y\n"
            + "Direction direction\n"
            + "Position left() {\n"
            + "    new Position(x, y, Direction.left);\n"
            + "}\n"
            + "Position right() {\n"
            + "    new Position(x, y, Direction.right);\n"
            + "}\n"
            + "Position up() {\n"
            + "    new Position(x , y, Direction.up);\n"
            + "}\n"
            + "Position down() {\n"
            + "    new Position(x , y, Direction.down);\n"
            + "}\n"
            + "def Position(moveX, moveY, myDirection) {\n"
            + "    x = moveX\n"
            + "    y = moveY\n"
            + "    direction = myDirection\n"
            + "}\n"
            + "Position move(Integer step) {\n"
            + "    Position newPosition\n"
            + "    if(direction == Direction.left) {\n"
            + "        newPosition = new Position(x - step, y, direction)\n"
            + "    } else if(direction == Direction.right) {\n"
            + "        newPosition = new Position(x + step, y, direction)\n"
            + "    } else if(direction == Direction.up) {\n"
            + "        newPosition = new Position(x, y + step, direction)\n"
            + "    } else if(direction == Direction.down) {\n"
            + "        newPosition = new Position(x, y - step, direction)\n"
            + "    }\n"
            + "}\n"
            + "}\n"
            + "\n"
            + "class Turtle {\n"
            + "    def currentPosition\n"
            + "    def steps = []\n"
            + "    Turtle(Position start) {\n"
            + "        currentPosition = start\n"
            + "        steps.add(start)\n"
            + "    }\n"
            + "\n"
            + "    Turtle move(Direction dir) {\n"
            + "        Position newPosition\n"
            + "        if (dir == Direction.left) {\n"
            + "            newPosition = currentPosition.left()\n"
            + "        } else if (dir == Direction.right) {\n"
            + "            newPosition = currentPosition.right()\n"
            + "        } else if (dir == Direction.up) {\n"
            + "            newPosition = currentPosition.up()\n"
            + "        } else if (dir == Direction.down) {\n"
            + "            newPosition = currentPosition.down()\n"
            + "        }\n"
            + "        currentPosition = newPosition\n"
            + "        this\n"
            + "    }\n"
            + "\n"
            + "    Turtle by (Integer step) {\n"
            + "        Position newPosition = currentPosition.move(step)\n"
            + "        steps.add(newPosition)\n"
            + "        currentPosition = newPosition\n"
            + "        this\n"
            + "    }\n"
            + "}\n"
            + "\n"
            + "enum Direction {\n"
            + "    left, right, up, down\n"
            + "}\n"
            + "\n"
            + "\n"
            + "def turtle = new Turtle(new Position(1, 1, Direction.left))\n"
            + "\n"
            + "def binding = new Binding([turtle: turtle,\n"
            + "    move: turtle.&move,\n"
            + "    left: Direction.left,\n"
            + "    right: Direction.right,\n"
            + "    up: Direction.up,\n"
            + "    down: Direction.down])\n"
            + "\n"
            + "def compilerConfig = new CompilerConfiguration()\n"
            + "\n"
            + "compilerConfig.addCompilationCustomizers(\n"
            + "    new ASTTransformationCustomizer(TypeChecked, extensions:['TurtleExtension.groovy']))\n"
            + "\n"
            + "def shell = new GroovyShell(this.class.classLoader,\n"
            + "    binding,\n"
            + "    compilerConfig)\n"
            + "///////////////////////\n"
            + "def gameDSL = '''\n"
            + "\n"
            + "move right by 2\n"
            + "move up by 2\n"
            + "move right by 2\n"
            + "move up by 2\n"
            + "\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "// result contains turtle object\n"
            + "// with all steps\n"
            + "shell.evaluate gameDSL\n"
            + "\n"
            + "def builder = new groovy.json.JsonBuilder()\n"
            + "builder {\n"
            + "    steps binding[\"turtle\"].steps\n"
            + "}\n"
            + "println builder\n"
            + "builder.toString()\n"
            + "\n";

var editorGroovy9 = new dslPrez.editor("editorGroovy9", content9);

function editorGroovy9TurtleSend() {
    var value = editorGroovy9.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    value += "import org.codehaus.groovy.control.customizers.ASTTransformationCustomizer;\nimport groovy.transform.TypeChecked\n";
    value += "import groovy.transform.TimedInterrupt\n";
    submitTurtleFormToGroovyConsole(value, "#outputGroovy9", 'canvasGroovy9');
}

function editorGroovy9Key0() {
    editorGroovy9.currentPress(0, 4);
    setStep(0,4);
    editorGroovy9.setValue(content9);
}

function editorGroovy9Key1() {
    if (editorGroovy9.currentPress(1, 4)) {
        setStep(1,4);
        for(var i = 90; i <96 ; i++) {
            editorGroovy9.addLineClass(i, "background", "highlight");
        }
        editorGroovy9.scrollIntoView(105);
    }
}
function editorGroovy9Key2() {
    if (editorGroovy9.currentPress(2, 4)) {
        setStep(2,4);
        for(var i = 90; i <96 ; i++) {
            editorGroovy9.removeLineClass(i, "background", "highlight");
        }
        var value = "while(true) {\n" +
            "    move right by 2\n" +
            "    move up by 2\n" +
            "    move left by 2\n" +
            "    move down by 2\n" +
            "}";
        editorGroovy9.replaceRange(value, {line: 90, ch: 0}, {line:95});

        for(var i = 90; i <96 ; i++) {
            editorGroovy9.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy9Key3() {
    if (editorGroovy9.currentPress(3, 4)) {
        setStep(3,4);
        for(var i = 90; i <96 ; i++) {
            editorGroovy9.removeLineClass(i, "background", "highlight");
        }
        editorGroovy9.addLineClass(82, "background", "highlight");
        editorGroovy9.addLineClass(83, "background", "highlight");
    }
}
function editorGroovy9Key4() {
    if (editorGroovy9.currentPress(4, 4)) {
        setStep(4,4);
        for(var i = 82; i <85 ; i++) {
            editorGroovy9.removeLineClass(i, "background", "highlight");
        }
        var value = "    new ASTTransformationCustomizer(TypeChecked, extensions:['TurtleExtension.groovy']),\n" +
            "    new ASTTransformationCustomizer([value:5L], TimedInterrupt))\n";
        editorGroovy9.removeLine(83);
        editorGroovy9.replaceRange(value, {line:83, ch:0});
        for(var i = 82; i <85 ; i++) {
            editorGroovy9.addLineClass(i, "background", "highlight");
        }
    }
}
function editorGroovy9Key5() {
    if (editorGroovy9.currentPress(5, 4)) {
        for(var i = 82; i <85 ; i++) {
            editorGroovy9.removeLineClass(i, "background", "highlight");
        }
    }
}

var keymap9 = {
    "0":editorGroovy9Key0,
    "1":editorGroovy9Key1,
    "2":editorGroovy9Key2,
    "3":editorGroovy9Key3,
    "4":editorGroovy9Key4,
    "5":editorGroovy9Key5,
    "Ctrl-S": editorGroovy9TurtleSend,
    "Cmd-S": editorGroovy9TurtleSend
};
editorGroovy9.addKeyMap(keymap9);
*/

//------------------------------------------------------------------->
// Groovy10. Sneaky
// step 1: highlight dsl
// step 2: add system.exit
// step 3: add SecureASTCustomizer
//------------------------------------------------------------------->
var content10 ="class Position {\n"
            + "int x\n"
            + "int y\n"
            + "Direction direction\n"
            + "Position left() {\n"
            + "    new Position(x, y, Direction.left);\n"
            + "}\n"
            + "Position right() {\n"
            + "    new Position(x, y, Direction.right);\n"
            + "}\n"
            + "Position up() {\n"
            + "    new Position(x , y, Direction.up);\n"
            + "}\n"
            + "Position down() {\n"
            + "    new Position(x , y, Direction.down);\n"
            + "}\n"
            + "def Position(moveX, moveY, myDirection) {\n"
            + "    x = moveX\n"
            + "    y = moveY\n"
            + "    direction = myDirection\n"
            + "}\n"
            + "Position move(Integer step) {\n"
            + "    Position newPosition\n"
            + "    if(direction == Direction.left) {\n"
            + "        newPosition = new Position(x - step, y, direction)\n"
            + "    } else if(direction == Direction.right) {\n"
            + "        newPosition = new Position(x + step, y, direction)\n"
            + "    } else if(direction == Direction.up) {\n"
            + "        newPosition = new Position(x, y + step, direction)\n"
            + "    } else if(direction == Direction.down) {\n"
            + "        newPosition = new Position(x, y - step, direction)\n"
            + "    }\n"
            + "}\n"
            + "}\n"
            + "\n"
            + "class Turtle {\n"
            + "    def currentPosition\n"
            + "    def steps = []\n"
            + "    Turtle(Position start) {\n"
            + "        currentPosition = start\n"
            + "        steps.add(start)\n"
            + "    }\n"
            + "\n"
            + "    Turtle move(Direction dir) {\n"
            + "        Position newPosition\n"
            + "        if (dir == Direction.left) {\n"
            + "            newPosition = currentPosition.left()\n"
            + "        } else if (dir == Direction.right) {\n"
            + "            newPosition = currentPosition.right()\n"
            + "        } else if (dir == Direction.up) {\n"
            + "            newPosition = currentPosition.up()\n"
            + "        } else if (dir == Direction.down) {\n"
            + "            newPosition = currentPosition.down()\n"
            + "        }\n"
            + "        currentPosition = newPosition\n"
            + "        this\n"
            + "    }\n"
            + "\n"
            + "    Turtle by (Integer step) {\n"
            + "        Position newPosition = currentPosition.move(step)\n"
            + "        steps.add(newPosition)\n"
            + "        currentPosition = newPosition\n"
            + "        this\n"
            + "    }\n"
            + "}\n"
            + "\n"
            + "enum Direction {\n"
            + "    left, right, up, down\n"
            + "}\n"
            + "\n"
            + "\n"
            + "def turtle = new Turtle(new Position(1, 1, Direction.left))\n"
            + "\n"
            + "def binding = new Binding([turtle: turtle,\n"
            + "    move: turtle.&move,\n"
            + "    left: Direction.left,\n"
            + "    right: Direction.right,\n"
            + "    up: Direction.up,\n"
            + "    down: Direction.down])\n"
            + "\n"
            + "def compilerConfig = new CompilerConfiguration()\n"
            + "\n"
            + "def tc = new ASTTransformationCustomizer(TypeChecked, extensions:['TurtleExtension.groovy'])\n"
            + "def ti = new ASTTransformationCustomizer([value:5L], TimedInterrupt)\n"
            + "\n"
            + "compilerConfig.addCompilationCustomizers(tc, ti)\n"
            + "\n"
            + "def shell = new GroovyShell(this.class.classLoader,\n"
            + "    binding,\n"
            + "    compilerConfig)\n"
            + "///////////////////////\n"
            + "def gameDSL = '''\n"
            + "move right by 2\n"
            + "move up by 2\n"
            + "move left by 2\n"
            + "move down by 2\n"
            + "\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "// result contains turtle object\n"
            + "// with all steps\n"
            + "shell.evaluate gameDSL\n"
            + "\n"
            + "def builder = new groovy.json.JsonBuilder()\n"
            + "builder {\n"
            + "    steps binding[\"turtle\"].steps\n"
            + "}\n"
            + "println builder\n"
            + "builder.toString()\n";

var editorGroovy10 = new dslPrez.editor("editorGroovy10", content10);

function editorGroovy10TurtleSend() {
    var value = editorGroovy10.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    value += "import org.codehaus.groovy.control.customizers.ASTTransformationCustomizer;\nimport groovy.transform.TypeChecked\n";
    value += "import groovy.transform.TimedInterrupt;\nimport org.codehaus.groovy.control.customizers.SecureASTCustomizer\n"
    submitTurtleFormToGroovyConsole(value, "#outputGroovy10", 'canvasGroovy10');
}

function editorGroovy10Key0() {
    editorGroovy10.currentPress(0, 3);
    setStep(0,3);
    editorGroovy10.setValue(content10);
}

function editorGroovy10Key1() {
    if (editorGroovy10.currentPress(1, 3)) {
        setStep(1,3);
        for(var i = 92; i <97 ; i++) {
            editorGroovy10.addLineClass(i, "background", "highlight");
        }
        editorGroovy10.scrollIntoView(115);
    }
}

function editorGroovy10Key2() {
    if (editorGroovy10.currentPress(2, 3)) {
        setStep(2,3);
        var value = "System.exit(-1)";
        editorGroovy10.replaceRange(value, {line:96, ch:0});
        editorGroovy10.addLineClass(96, "background", "highlight");
    }
}

function editorGroovy10Key3() {
    if (editorGroovy10.currentPress(3, 3)) {
        setStep(3,3);
        for(var i = 92; i <97 ; i++) {
            editorGroovy10.removeLineClass(i, "background", "highlight");
        }
        var value = "def secure = new SecureASTCustomizer()\n" +
            "secure.with {\n" +
            "    receiversClassesBlackList = [\n" +
            "        java.lang.System\n" +
            "    ].asImmutable()\n" +
            "}\n\n";

        editorGroovy10.replaceRange(value, {line:85, ch:0});
        for(var i = 85; i <91 ; i++) {
            editorGroovy10.addLineClass(i, "background", "highlight");
        }
        editorGroovy10.removeLine(92);
        var value = "compilerConfig.addCompilationCustomizers(tc, ti, secure)\n";
        editorGroovy10.replaceRange(value, {line:92, ch:0});
    }
}
function editorGroovy10Key4() {
    if (editorGroovy10.currentPress(4, 3)) {
        editorGroovy10.removeLineClass(85, "background", "highlight");
        editorGroovy10.removeLineClass(86, "background", "highlight");
        editorGroovy10.removeLineClass(87, "background", "highlight");
        editorGroovy10.removeLineClass(88, "background", "highlight");
        editorGroovy10.removeLineClass(89, "background", "highlight");
        editorGroovy10.removeLineClass(90, "background", "highlight");
    }
}

var keymap10 = {
    "0":editorGroovy10Key0,
    "1":editorGroovy10Key1,
    "2":editorGroovy10Key2,
    "3":editorGroovy10Key3,
    "4":editorGroovy10Key4,
    "Ctrl-S": editorGroovy10TurtleSend,
    "Cmd-S": editorGroovy10TurtleSend
};
editorGroovy10.addKeyMap(keymap10);


//------------------------------------------------------------------->
// Groovy11. ask: dynamic interception
//step1: insert DSL ask
//step2: add ask method
//step3: add propertyMissingMethod
//step4: add display map method
//step5: add display map in DSL
//------------------------------------------------------------------->
var content11 ="abstract class GameScript extends Script {\n"
            + "\n"
            + "\n"
            + "}\n"
            + "def compilerConfig = new CompilerConfiguration()\n"
            + "compilerConfig.scriptBaseClass = GameScript.class.name\n"
            + "def binding = new Binding()\n"
            + "def shell = new GroovyShell(this.class.classLoader,\n"
            + "    binding,\n"
            + "    compilerConfig)\n"
            + "///////////////////////\n"
            + "def surveyDSL = '''\n"
            + "\n"
            + "'''\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "shell.evaluate surveyDSL\n"
            + "\n";

var editorGroovy11 = new dslPrez.editor("editorGroovy11", content11);

function editorGroovy11Send() {
    var value = editorGroovy11.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitFormToGroovyConsole(value, "#outputGroovy11");
}

function editorGroovy11Key0() {
    editorGroovy11.currentPress(0, 5);
    setStep(0,5);
    editorGroovy11.setValue(content11);
}

function editorGroovy11Key1() {
    if (editorGroovy11.currentPress(1, 5)) {
        setStep(1,5);
        editorGroovy11.replaceRange("ask \"Where do you want to meet\" assign to meeting", {line:12, ch:0}, {line:12});
        editorGroovy11.addLineClass(12, "background", "highlight");
    }
}

function editorGroovy11Key2() {
    if (editorGroovy11.currentPress(2, 5)) {
        setStep(2,5);
        editorGroovy11.removeLineClass(12, "background", "highlight");
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
        editorGroovy11.replaceRange(value, {line:2, ch:0});
        for(var i = 2; i <14 ; i++) {
            editorGroovy11.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy11Key3() {
    if (editorGroovy11.currentPress(3, 5)) {
       setStep(3,5);
       for(var i = 2; i <14 ; i++) {
            editorGroovy11.removeLineClass(i, "background", "highlight");
        }
        var value = "  def propertyMissing(def propertyName) {\n" +
            "    propertyName\n" +
            "  }\n";
        editorGroovy11.replaceRange(value, {line:14, ch:0});
        for(var i = 14; i <17 ; i++) {
            editorGroovy11.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy11Key4() {
    if (editorGroovy11.currentPress(4, 5)) {
        setStep(4,5);
        for(var i = 14; i <17 ; i++) {
            editorGroovy11.removeLineClass(i, "background", "highlight");
        }
        var value = "  def display(Map mapToDisplay) {\n" +
            "    mapToDisplay.eachWithIndex { key, value, index ->\n" +
            "      println \"$key: $value\"\n" +
            "    }\n" +
            " }";
        editorGroovy11.replaceRange(value, {line:17, ch:0});
        for(var i = 17; i <22 ; i++) {
            editorGroovy11.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy11Key5() {
    if (editorGroovy11.currentPress(5, 5)) {
        setStep(5,5);
        for(var i = 17; i <22 ; i++) {
            editorGroovy11.removeLineClass(i, "background", "highlight");
        }
        editorGroovy11.replaceRange("display map\n", {line:32, ch:0});
        editorGroovy11.addLineClass(32, "background", "highlight");
    }
}

function editorGroovy11Key6() {
    if (editorGroovy11.currentPress(6, 5)) {
        editorGroovy11.removeLineClass(32, "background", "highlight");
    }
}

var keymap11 = {
    "0":editorGroovy11Key0,
    "1":editorGroovy11Key1,
    "2":editorGroovy11Key2,
    "3":editorGroovy11Key3,
    "4":editorGroovy11Key4,
    "5":editorGroovy11Key5,
    "6":editorGroovy11Key6,
    "Ctrl-S": editorGroovy11Send,
    "Cmd-S": editorGroovy11Send
};
editorGroovy11.addKeyMap(keymap11);


//------------------------------------------------------------------->
// Groovy12. ask AST
//step1: add your class extending CompilationCustomizer
//step2: add it to compilerconfig
//step3: add some body contnet inside overriden call method
//       get the AST
//       find thw run method of my script
//       collect all block statement inside the run mrthod
//step4: add visit call
//       I want to visit all those block st to count the usage of move
//step5: Add MethodCallVisitor
//       we need to wite our custom visitor and overload  visitMthodCallExpression
//step6: Add body to visitMethodCallExpr
//------------------------------------------------------------------->
var content12 = "abstract class GameScript extends Script {\n"
                + "  def move(param) {println \">> move $param\"}\n"
                + "}\n"
                + "def config = new CompilerConfiguration()\n"
                + "config.scriptBaseClass = GameScript.class.name\n"
                + "\n"
                + "def binding = new Binding()\n"
                + "def shell = new GroovyShell(this.class.classLoader,\n"
                + "    binding,\n"
                + "    config)\n"
                + "\n"
                + "def dslScript = '''\n"
                + "move 1\n"
                + "move 2\n"
                + "move 3\n"
                + "move 4\n"
                + "'''\n\n"
                + "shell.evaluate dslScript";

var editorGroovy12 = new dslPrez.editor("editorGroovy12", content12);

function editorGroovy12Send() {
    var value = editorGroovy12.getValue();
    value = "import org.codehaus.groovy.ast.ClassCodeVisitorSupport\n"
        + "import org.codehaus.groovy.ast.ClassNode\n"
        + "import org.codehaus.groovy.ast.expr.MethodCallExpression\n"
        + "import org.codehaus.groovy.ast.stmt.BlockStatement\n"
        + "import org.codehaus.groovy.classgen.GeneratorContext\n"
        + "import org.codehaus.groovy.control.CompilationFailedException\n"
        + "import org.codehaus.groovy.control.CompilePhase\n"
        + "import org.codehaus.groovy.control.SourceUnit\n"
        + "import org.codehaus.groovy.control.customizers.CompilationCustomizer\n"
        + "import org.codehaus.groovy.control.CompilerConfiguration\n"
        + value;
    submitFormToGroovyConsole(value, "#outputGroovy12");
}

function editorGroovy12Key0() {
    editorGroovy12.currentPress(0, 6);
    setStep(0,6);
    editorGroovy12.setValue(content12);
}

function editorGroovy12Key1() {
    if (editorGroovy12.currentPress(1, 6)) {
        setStep(1,6);
        editorGroovy12.scrollIntoView(0);
        var value = "public class GameCustomizer extends CompilationCustomizer {\n"
                    + "  def step = 0\n"
                    + "\n"
                    + "  public GameCustomizer() {\n"
                    + "    super(CompilePhase.CONVERSION)\n"
                    + "  }\n"
                    + "\n"
                    + "  @Override\n"
                    + "  public void call(final SourceUnit source,\n"
                    + "    final GeneratorContext context,\n"
                    + "    final ClassNode classNode) throws CompilationFailedException {\n"
                    + "  }\n"
                    + "}\n\n";
        editorGroovy12.replaceRange(value, {line:0, ch:0});
        for(var i = 0; i <13 ; i++) {
            editorGroovy12.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy12Key2() {
    if (editorGroovy12.currentPress(2, 6)) {
        setStep(2,6);
        editorGroovy12.scrollIntoView(0);
        for(var i = 0; i <13 ; i++) {
            editorGroovy12.removeLineClass(i, "background", "highlight");
        }
        var value = "config.addCompilationCustomizers(new GameCustomizer())\n";

        editorGroovy12.replaceRange(value, {line:19, ch:0});
        editorGroovy12.addLineClass(19, "background", "highlight");
    }
}

function editorGroovy12Key3() {
    if (editorGroovy12.currentPress(3, 6)) {
        setStep(3,6);
        editorGroovy12.scrollIntoView(0);
        editorGroovy12.removeLineClass(19, "background", "highlight");
        var value = "    def methodCalls = []\n"
                + "    int i = 0;\n"
                + "    def ast = source.getAST();\n"
                + "    BlockStatement gameScript\n"
                + "    ast.classes.each {\n"
                + "      it.methods.each {\n"
                + "        if (it.code instanceof BlockStatement\n"
                + "            && it.name == \"run\") {\n"
                + "          gameScript = it.code\n"
                + "        }\n"
                + "      }\n"
                + "    }\n";

        editorGroovy12.replaceRange(value, {line:11, ch:0});
        for(var i = 11; i <23 ; i++) {
            editorGroovy12.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy12Key4() {
    if (editorGroovy12.currentPress(4, 6)) {
        setStep(4,6);
        editorGroovy12.scrollIntoView(33);
        for(var i = 11; i <23 ; i++) {
            editorGroovy12.removeLineClass(i, "background", "highlight");
        }
        var value = "    def methodCallVisitor = new MethodCallVisitor()\n"
            + "    methodCallVisitor.visitBlockStatement(gameScript)\n"
            + "\n"
            + "    if (methodCallVisitor.i > 3) {\n"
            + "      throw new Exception(\"Limit of allowed statements exceeded!\")\n"
            + "    }\n";

        editorGroovy12.replaceRange(value, {line:23, ch:0});
        for(var i = 23; i <29 ; i++) {
            editorGroovy12.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy12Key5() {
    if (editorGroovy12.currentPress(5, 6)) {
        setStep(5,6);
        for(var i = 23; i <29 ; i++) {
            editorGroovy12.removeLineClass(i, "background", "highlight");
        }
        var value = "class MethodCallVisitor extends ClassCodeVisitorSupport {\n"
        + "  int i = 0;\n"
        + "  @Override\n"
        + "  protected SourceUnit getSourceUnit() {\n"
        + "    return null\n"
        + "  }\n"
        + "\n"
        + "  @Override\n"
        + "  public void visitMethodCallExpression(MethodCallExpression expression) {\n"
        + "  }\n"
        + "\n"
        + "}\n";

        editorGroovy12.replaceRange(value, {line:32, ch:0});
        for(var i = 32; i <44 ; i++) {
            editorGroovy12.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy12Key6() {
    if (editorGroovy12.currentPress(6, 6)) {
        setStep(6,6);
        for(var i = 32; i <44 ; i++) {
            editorGroovy12.removeLineClass(i, "background", "highlight");
        }
        var value = "    if(expression.getMethodAsString() in [\"move\"] ) {\n"
            + "      i++\n"
            + "     }\n"
            + "     super.visitMethodCallExpression(expression)\n";

        editorGroovy12.replaceRange(value, {line:41, ch:0});
        for(var i = 41; i <45 ; i++) {
            editorGroovy12.addLineClass(i, "background", "highlight");
        }
    }
}

function editorGroovy12Key7() {
    if (editorGroovy12.currentPress(7, 6)) {
        for(var i = 41; i <45 ; i++) {
            editorGroovy12.removeLineClass(i, "background", "highlight");
        }
    }
}

var keymap12 = {
    "0": editorGroovy12Key0,
    "1": editorGroovy12Key1,
    "2": editorGroovy12Key2,
    "3": editorGroovy12Key3,
    "4": editorGroovy12Key4,
    "5": editorGroovy12Key5,
    "6": editorGroovy12Key6,
    "7": editorGroovy12Key7,
    "Ctrl-S": editorGroovy12Send,
    "Cmd-S": editorGroovy12Send
};
editorGroovy12.addKeyMap(keymap12);
//------------------------------------------------------------------->
// GroovyBuilder. Groovy builder
// step
//------------------------------------------------------------------->
/*var contentBuilder = "class MyBuilder {\n"
                    + "  int indent = 0\n"
                    + "  Object invokeMethod(String name, Object args) {\n"
                    + "    indent.times {print \"..\"}\n"
                    + "    println \"<${name}>\"\n"
                    + "    indent++\n"
                    + "    args[0].delegate = this // Change delegate to the builder\n"
                    + "    args[0].call()\n"
                    + "    indent--\n"
                    + "    indent.times {print \"..\"}\n"
                    + "    println \"</${name}>\"\n"
                    + "  }\n"
                    + "}\n"
                    + "def builder = new MyBuilder()\n"
                    + "\n"
                    + "def gameDSL = '''\n"
                    + "builder.root {\n"
                    + "    level1{\n"
                    + "        level2 { }\n"
                    + "    }\n"
                    + "}\n"
                    + "'''\n"
                    + "def compilerConfig = new CompilerConfiguration()\n"
                    + "def binding = new Binding([builder: builder])\n"
                    + "def shell = new GroovyShell(this.class.classLoader,\n"
                    + "                            binding,\n"
                    + "                            compilerConfig)\n"
                    + "def result = shell.evaluate gameDSL\n"
                    + "\n";
var editorGroovyBuilder = new dslPrez.editor("editorGroovyBuilder", contentBuilder);

function editorGroovyBuilderKey0() {
    editorGroovyBuilder.currentPress(0, 0);
    editorGroovyBuilder.setValue(contentBuilder);
}


function editorGroovyBuilderSend() {
    var value = editorGroovyBuilder.getValue();
    value += "import groovy.lang.Script;\nimport org.codehaus.groovy.control.CompilerConfiguration\n";
    submitFormToGroovyConsole(value, "#outputGroovyBuilder");
}
var keymapBuilder = {
    "Ctrl-S" :editorGroovyBuilderSend,
    "Cmd-S" :editorGroovyBuilderSend,
    "0": editorGroovyBuilderKey0
};

editorGroovyBuilder.addKeyMap(keymapBuilder);*/

$("#technologies").airport([ 'Twitter Bootstrap', 'jCloud', 'jQuery-airport', 'Grails', 'Code Mirror', 'jQuery' ]);