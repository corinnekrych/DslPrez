//var serverUrl = "http://localhost:8080/DslPrez";
function submitFormExtended(input, output, lang, additionalParams) {
    var url = serverUrl + "/console/execute?=";
    additionalParams["content"] = input
    additionalParams["lang"] = lang
    $.post(url, 
	   additionalParams,
	   function(data) {
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

function submitTurtleFormExtended(input, output, canvasId, lang, additionalParams) {
    var url = serverUrl + "/console/execute?=";
    var draw;
    additionalParams["content"] = input
    additionalParams["lang"] = lang
   
    $.post(url,
	   additionalParams, 
	   function(data) {
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


function submitFormToScalaConsole(input, output) {
    submitForm(input, output, "scala");
}

function submitFormToScalaConsoleExtended(input, output,additionalParams) {
    submitFormExtended(input, output, "scala",additionalParams);
}

function submitTurtleFormToScalaConsole(input, output, canvasId) {
    submitTurtleForm(input, output, canvasId, "scala");
}

function submitTurtleFormToScalaConsoleExtended(input, output, canvasId, additionalParams) {
    submitTurtleFormExtended(input, output, canvasId, "scala",additionalParams);
}

//------------------------------------------------------------------->
// Scala1. Script
// step 1 define move method and move to left
// step 2 use left as a variable instead of String
// step 2 replace IMain with ScriptEngineManager
// step 3 replace interpreter.eval with engine.eval
//------------------------------------------------------------------->
var contentScala1 = "import scala.tools.nsc._\n"
    + "import scala.tools.nsc.interpreter._\n\n"
    + "// Two next steps necessary only inside Grails/Groovy\n"
    + "val env = new Settings()\n"
    + "env.usejavacp.value = true\n\n"
    + "val interpreter = new IMain(env)\n\n"
    + "val gameDSL = \"\"\"\n"
    + "    println(\"I run a Scala script\")\n"
    + "\"\"\"\n"
    + "//////////////////////\n"
    + "// Run DSL script.\n"
    + "val result = interpreter.eval(gameDSL)\n\n\n";

var editorScala1 = new dslPrez.editor("editorScala1", contentScala1);

function editorScala1Send() {
    var value = editorScala1.getValue();
    submitFormToScalaConsole(value, "#outputScala1");
}

function editorScala1Key0() {
    editorScala1.currentPress(0, 5);
    editorScala1.setValue(contentScala1);
}

function editorScala1Key1() {
    if (editorScala1.currentPress(1, 5)) {
        var value = 'val gameDSL = """  \n'
            + 'object move {\n'
            + '   def to(direction:String) = {\n'
            + '      println(s"Moving $direction")\n'
            + '   }\n'
            + '}\n'
            + 'move to "left" // Converts into move.to("left")\n'
            + '""" ';
        editorScala1.replaceRange(value, {line:9, ch:0}, {line:11});
        for(var i = 9; i <17 ; i++) {
            editorScala1.addLineClass(i, "background", "highlight");
        }
    }
}

function editorScala1Key2() {
    if (editorScala1.currentPress(2, 5)) {
	for(var i = 9; i <17 ; i++) {
            editorScala1.removeLineClass(i, "background", "highlight");
        }
	editorScala1.removeLine(15)

        var value = 'val left = "left"\nmove to left // Converts into move.to(left)\n'
        editorScala1.replaceRange(value, {line:15, ch:0});
        editorScala1.addLineClass(15, "background", "highlight");
        editorScala1.addLineClass(16, "background", "highlight");
    }
}
function editorScala1Key3() {
    if (editorScala1.currentPress(3, 5)) {
        for(var i = 9; i <18 ; i++) {
            editorScala1.removeLineClass(i, "background", "highlight");
        }
        editorScala1.replaceRange("import javax.script.ScriptEngineManager", {line:0, ch:0}, {line:0});
        var value = "val engine = new ScriptEngineManager().getEngineByName(\"scala\")\n"
                  + "// Following steps necessary only inside Grails/Groovy\n"
   	          + "val settings = engine.asInstanceOf[IMain].settings\n"
                  + "settings.usejavacp.value = true\n";
        editorScala1.replaceRange(value, {line:3, ch:0}, {line:8});
        for(var i = 3; i <8 ; i++) {
            editorScala1.addLineClass(i, "background", "highlight");
        }
    }
}

function editorScala1Key4() {
    if (editorScala1.currentPress(4, 5)) {
        for(var i = 3; i <8 ; i++) {
            editorScala1.removeLineClass(i, "background", "highlight");
        }
        editorScala1.replaceRange("import javax.script.ScriptEngineManager", {line:0, ch:0}, {line:0});
        editorScala1.replaceRange("engine.eval(gameDSL)", {line:19, ch:0}, {line:19});
        editorScala1.addLineClass(19, "background", "highlight");
    }
}

function editorScala1Key5() {
    if (editorScala1.currentPress(5, 5)) {
        editorScala1.removeLineClass(19, "background", "highlight");
        for (var i=9; i<16; i++) {
	  editorScala1.removeLine(9);
	}

	var value = 'object move {\n'
                  + '   def left = {\n'
                  + '      println("Moving left")\n'
                  + '   }\n'
                  + '}\n'
                  + 'move left // Converts into move.left()\n\n'
		  + '// Generate a warning: to see it, add settings.feature.value = true\n\n'
		  + '// warning: postfix operator left should be enabled\n'
		  + '// by making the implicit value scala.language.postfixOps visible.\n'
		  + '// This can be achieved by adding the import clause \'import scala.language.postfixOps\'\n'
		  + '// or by setting the compiler option -language:postfixOps.\n'
		  + '// See the Scala docs for value scala.language.postfixOps for a discussion\n'
		  + '// why the feature should be explicitly enabled.\n';
	    
         editorScala1.replaceRange(value,{line:9, ch:0});
         for (var i=9; i<15; i++) {
	  editorScala1.addLineClass(i, "background", "highlight");
	 }
    }
}

function editorScala1Key6() {
    if (editorScala1.currentPress(6, 5)) {
        for (var i=9; i<15; i++) {
	  editorScala1.removeLineClass(i, "background", "highlight");
	 }    }
}

var keymapScala1 = {
    "0" : editorScala1Key0,
    "1" : editorScala1Key1,
    "2" : editorScala1Key2,
    "3" : editorScala1Key3,
    "4" : editorScala1Key4,
    "5" : editorScala1Key5,
    "6" : editorScala1Key6,
    "Ctrl-S" : editorScala1Send,
    "Cmd-S" : editorScala1Send
};
editorScala1.addKeyMap(keymapScala1);

//------------------------------------------------------------------->
// Scala3. Binding for Scala TODO Detail steps
// step 1 add binding
// step 2 highlight val left="left"
// step 3 remove line
// Note: I use IMain because the ScripEngine has limitations with Bindings
//------------------------------------------------------------------->
var contentScala3 = "import scala.tools.nsc.interpreter._\n"
            + "import scala.tools.nsc._\n\n"
            + "val settings = new Settings\n"
            + "settings.usejavacp.value = true \n\n"
	    + "val engine = new IMain(settings)\n\n"
            + "val gameDSL = \"\"\"\n"
            + "object move {\n"
            + "    def to(direction:Object) = {\n"
            + "        println(s\"Moving $direction\")\n"
            + "    }\n"
            + "}\n"
            + "val left = \"left\"\n"
            + "move to left // Converts into move.to(left)\n"
            + "\"\"\"\n"
            + "//////////////////////\n"
            + "// Run DSL script.\n"
            + "engine.eval(gameDSL)\n\n\n";

var editorScala3 = new dslPrez.editor("editorScala3", contentScala3);

function editorScala3Send() {
    var value = editorScala3.getValue();
    submitFormToScalaConsole(value, "#outputScala3");
}

function editorScala3Key0() {
    editorScala3.currentPress(0, 8);
    editorScala3.setValue(contentScala3);
}

function editorScala3Key1() {
    if (editorScala3.currentPress(1, 8)) {
        var value = '\nengine.bind("left", "left")';

        editorScala3.replaceRange(value, {line:6});
        editorScala3.addLineClass(7, "background", "highlight");
    }
}

function editorScala3Key2() {
    if (editorScala3.currentPress(2, 8)) {
      editorScala3.removeLine(15)
    }
}

function editorScala3Key3() {
    if (editorScala3.currentPress(3, 8)) {
      editorScala3.removeLineClass(7, "background", "highlight");
      var value ="\nobject move {\n"
            + "    def to(direction:Object) = {\n"
            + "        println(s\"Moving $direction\")\n"
            + "    }\n"
	    + "}\n";

      editorScala3.replaceRange(value, {line:8});
      for (var i=9; i<14 ;i++) {
         editorScala3.addLineClass(i, "background", "highlight");
      }
    }
}

function editorScala3Key4() {
    if (editorScala3.currentPress(4, 8)) {
      for (var i=16; i<21; i++) {
        editorScala3.removeLine(16)
      }
    }
}

function editorScala3Key5() {
    if (editorScala3.currentPress(5, 8)) {
      for (var i=9; i<14 ;i++) {
        editorScala3.removeLineClass(i, "background", "highlight");
       }
      editorScala3.replaceRange("\nengine.bind(\"move\",\"String=>Unit\",move.to _)\n", {line:14});
      editorScala3.addLineClass(15, "background", "highlight");
    }
}

function editorScala3Key6() {
    if (editorScala3.currentPress(6, 8)) {
         editorScala3.removeLineClass(15, "background", "highlight");
      editorScala3.removeLine(18)
	 editorScala3.replaceRange("move left //Fail because converted into move.left()\n", {line:18,ch:0});
         editorScala3.addLineClass(18, "background", "highlight");   
    }
}

function editorScala3Key7() {
    if (editorScala3.currentPress(7, 8)) {
         editorScala3.removeLineClass(15, "background", "highlight");
         editorScala3.removeLine(18)
	 editorScala3.replaceRange("move(left)\n", {line:18,ch:0});
         editorScala3.addLineClass(18, "background", "highlight");
   
    }
}


function editorScala3Key8() {
    if (editorScala3.currentPress(8, 8)) {
      editorScala3.removeLineClass(18, "background", "highlight");
      editorScala3.removeLine(15)       
      editorScala3.replaceRange("\nengine.bind(\"move\",move)", {line:14});
      editorScala3.addLineClass(15, "background", "highlight");

         editorScala3.removeLine(18)
	 var value = "move to left //Fail because of cp issues and some REPL limitations\n\n"
	           + "//Working when binding done outside an interpreter.\n"
		   + "//In following slides, we'll assume that we do the binding even if this is\n"
		   + "//not shown in the code. It will be emulated and binding right mechanism will\n"
		   + "//be displayed in comments";
	 editorScala3.replaceRange(value, {line:18,ch:0});
         editorScala3.addLineClass(18, "background", "highlight");
      
    }
}


function editorScala3Key9() {
    if (editorScala3.currentPress(9, 8)) {
   editorScala3.removeLineClass(15,"background", "highlight");
      editorScala3.removeLineClass(18,"background", "highlight");
    }
}


var keymapScala3 = {
    "0" : editorScala3Key0,
    "1" : editorScala3Key1,
    "2" : editorScala3Key2,
    "3" : editorScala3Key3,
    "4" : editorScala3Key4,
    "5" : editorScala3Key5,
    "6" : editorScala3Key6,
    "7" : editorScala3Key7,
    "8" : editorScala3Key8,
    "9" : editorScala3Key9,
    "Ctrl-S" : editorScala3Send,
    "Cmd-S" : editorScala3Send
};
editorScala3.addKeyMap(keymapScala3);

//------------------------------------------------------------------->
// Scala4. Structure my code TODO Detail steps
// step 1 initial 
// step 2 final
//------------------------------------------------------------------->
var contentScala4 = "import scala.tools.nsc.interpreter._\n\n"
    + "val interpreter = new IMain()\n\n"
    + "//////////////////////////\n"
    + "// Here is the DSL script.\n"
    + "val gameDSL = \"\"\"\n"
    + "    move left\n"
    + "    move right\n"
    + "\"\"\"\n\n"
    + "//////////////////////\n"
    + "// Run DSL script.\n"
    + "val result = interpreter.eval(gameDSL)\n";

var editorScala4 = new dslPrez.editor("editorScala4", contentScala4);

function editorScala4Send() {
    var value = editorScala4.getValue();
    submitFormToScalaConsole(value, "#outputScala4");
}

function editorScala4Key0() {
    if (editorScala4.currentPress(0, 2)) {
       editorScala4.setValue(contentScala4);
    }
}

function editorScala4Key1() {
    if (editorScala4.currentPress(1, 8)) {
      var value = "case class Position(x:Int, y:Int) {\n"
                + "   def left  = Position(x-1,y)\n"
                + "   def right = Position(x+1,y)\n"
                + "   def up    = Position(x,y+1)\n"
                + "   def down  = Position(x,y-1)\n"
                + "}\n\n";
       editorScala4.replaceRange(value,{line:4,ch:0});
       
       for (var i=4;i<10;i++) {
          editorScala4.addLineClass(i, "background", "highlight");   
       }
    }
}

function editorScala4Key2() {
    if (editorScala4.currentPress(2, 8)) {
      
      for (var i=4;i<10;i++) {
          editorScala4.removeLineClass(i, "background", "highlight");   
       }

       var value = "sealed trait Direction\n"
                 + "case object left extends Direction\n"
                 + "case object right extends Direction\n"
                 + "case object up extends Direction\n"
                 + "case object down extends Direction\n\n";
       editorScala4.replaceRange(value,{line:11,ch:0});
       
       for (var i=11;i<16;i++) {
          editorScala4.addLineClass(i, "background", "highlight");   
       }
    }
}

function editorScala4Key3() {
    if(editorScala4.currentPress(3, 8)) {

      for (var i=11;i<16;i++) {
          editorScala4.removeLineClass(i, "background", "highlight");   
       }

      var value = "class Turtle(var p:Position) {\n"
                 + "   def move(d: Direction) = {\n"
                 + "      d match {\n"
                 + "         case `left` => p=p.left\n"
                 + "         case `right` => p=p.right\n"
                 + "         case `up` => p=p.up\n"
                 + "         case `down` => p=p.down\n"
                 + "      }\n"
                 + "      println(s\"x = ${p.x} and y = ${p.y}\")\n"
                 + "      this\n"
                 + "   }\n"
                 + "}\n\n";
           
       editorScala4.replaceRange(value,{line:17,ch:0});
       
       for (var i=17;i<29;i++) {
          editorScala4.addLineClass(i, "background", "highlight");   
       }

    }
}

function editorScala4Key4() {
    if(editorScala4.currentPress(4, 8)) {
       for (var i=17;i<29;i++) {
          editorScala4.removeLineClass(i, "background", "highlight");   
       }

       var value="val turtle = new Turtle(Position(1,1))\n\n"
       editorScala4.replaceRange(value,{line:30,ch:0});
       editorScala4.addLineClass(30, "background", "highlight");
    }
}

function editorScala4Key5() {
    if(editorScala4.currentPress(5, 8)) {
            editorScala4.removeLineClass(30, "background", "highlight");
 
       var value="n.bind(\"turtle\",turtle)\n\n"
       editorScala4.replaceRange(value,{line:32,ch:0});
       
       editorScala4.addLineClass(32, "background", "highlight");
 
       var value2="turtle move left\n"
                 +"turtle move right\n";
		
       editorScala4.removeLine(37);
       editorScala4.removeLine(37);
       editorScala4.replaceRange(value2,{line:37,ch:0});
       
       editorScala4.addLineClass(37, "background", "highlight");
       editorScala4.addLineClass(38, "background", "highlight");

    }
}

function editorScala4Key6() {
    if(editorScala4.currentPress(6, 8)) {
       editorScala4.removeLine(32);

       var value="n.bind(\"I\",turtle)\n"
       editorScala4.replaceRange(value,{line:32,ch:0});
       
       editorScala4.addLineClass(32, "background", "highlight");
       
       var value2="I move left\n"
                 +"I move right\n";
		
       editorScala4.removeLine(37);
       editorScala4.removeLine(37);
       editorScala4.replaceRange(value2,{line:37,ch:0});
       
       editorScala4.addLineClass(37, "background", "highlight");
       editorScala4.addLineClass(38, "background", "highlight");
    }
}

function editorScala4Key7() {
    if(editorScala4.currentPress(7, 8)) {
      for (var i = 32; i<45; i++) {
       editorScala4.removeLine(32);
      }

      var value= "val I = turtle\n\n"
               + "// Here starts the DSL that is evaluated,\n"
	       + "// the 'I' variable should be bound to turtle\n"
  	       + "I move left\n"
   	       + "I move right\n";
	       
       editorScala4.replaceRange(value,{line:32,ch:0});
       
       editorScala4.addLineClass(31, "background", "highlight");
       editorScala4.addLineClass(35, "background", "highlight");
       editorScala4.addLineClass(36, "background", "highlight");
       
    }
}
function editorScala4Key8() {
    if(editorScala4.currentPress(8, 8)) {
      var newContentScala4V0 = "import scala.tools.nsc.interpreter._\n\n"
                           + "val interpreter = new IMain()\n\n"
                           + "case class Position(x:Int, y:Int) {\n"
                           + "   def left  = Position(x-1,y)\n"
                           + "   def right = Position(x+1,y)\n"
                           + "   def up    = Position(x,y+1)\n"
                           + "   def down  = Position(x,y-1)\n"
                           + "}\n\n"
                           + "sealed trait Direction\n"
                           + "case object left extends Direction\n"
                           + "case object right extends Direction\n"
                           + "case object up extends Direction\n"
                           + "case object down extends Direction\n\n"
                           + "class Turtle(var p:Position) {\n\n"
                           + "   def move(d: Direction) = {\n"
                           + "      d match {\n"
                           + "         case `left` => p=p.left\n"
                           + "         case `right` => p=p.right\n"
                           + "         case `up` => p=p.up\n"
                           + "         case `down` => p=p.down\n"
                           + "      }\n"
                           + "      println(s\"x = ${p.x} and y = ${p.y}\")\n"
                           + "      this\n"
                           + "   }\n"
                           + "}\n\n"
                           + "val turtle = new Turtle(Position(1,1))\n\n"
			   + "interpreter.interpret(\"def move(d: Direction)(implicit t:Turtle) = t.move(d)\")\n\n"
			   + "interpreter.bind(\"turtle\",turtle)\n\n"
			   + "interpreter.eval(\"implicit val implicitTurtle = turtle\")\n\n"
			   + "//////////////////////////\n"
                           + "// Here is the DSL script.\n"
                           + "val gameDSL = \"\"\"\n"
                           + "    move(left)\n"
                           + "    move (right)\n"
                           + "\"\"\"\n\n"
                           + "//////////////////////\n"
                           + "// Run DSL script.\n"
                           + "val result = interpreter.eval(gameDSL)\n";

    var newContentScala4 = "val turtle = new Turtle(Position(1,1))\n\n"
			   + "interpreter.interpret(\"def move(d: Direction)(implicit t:Turtle) = t.move(d)\")\n\n"
			   + "interpreter.bind(\"turtle\",turtle)\n\n"
			   + "interpreter.eval(\"implicit val implicitTurtle = turtle\")\n\n"
			   + "//////////////////////////\n"
                           + "// Here is the DSL script.\n"
                           + "val gameDSL = \"\"\"\n"
                           + "    move(left)   // Remember the move left translated in move.left()\n"
                           + "    move (right) // Can also use the definition of a move object with left\n"
			   + "                 // and right directions but very cumbersome\n"
                           + "\"\"\"\n\n"
                           + "//////////////////////\n"
                           + "// Run DSL script.\n"
                           + "val result = interpreter.eval(gameDSL)\n";
     editorScala4.setValue(newContentScala4);
    }
}

function editorScala4Key9() {
    if(editorScala4.currentPress(9, 8)) {
      var endContentScala4 = "//import scala.tools.nsc.interpreter._\n\n"
                           + "//val interpreter = new IMain()\n\n"
                           + "case class Position(x:Int, y:Int) {\n"
                           + "   def left  = Position(x-1,y)\n"
                           + "   def right = Position(x+1,y)\n"
                           + "   def up    = Position(x,y+1)\n"
                           + "   def down  = Position(x,y-1)\n"
                           + "}\n\n"
                           + "sealed trait Direction\n"
                           + "case object left extends Direction\n"
                           + "case object right extends Direction\n"
                           + "case object up extends Direction\n"
                           + "case object down extends Direction\n\n"
                           + "class Turtle(var p:Position) {\n"
                           + "   def move(d: Direction) = {\n"
                           + "      d match {\n"
                           + "         case `left` => p=p.left\n"
                           + "         case `right` => p=p.right\n"
                           + "         case `up` => p=p.up\n"
                           + "         case `down` => p=p.down\n"
                           + "      }\n"
                           + "      println(s\"x = ${p.x} and y = ${p.y}\")\n"
                           + "      this\n"
                           + "   }\n"
                           + "}\n\n"
                           + "val turtle = new Turtle(Position(1,1))\n\n"
			   + "//interpreter.bind(\"I\",turtle)\n\n"
                           + "//////////////////////////\n"
                           + "// Here is the DSL script.\n"
                           + "//val gameDSL = \"\"\"\n"
                           + "//   move left\n"
                           + "//   move right\n"
                           + "//\"\"\"\n\n"
                           + "//////////////////////\n"
                           + "// Run DSL script.\n"
                           + "//val result = interpreter.eval(gameDSL)\n\n"
			   + "val I = turtle\n\n"
			   + "I move left\n"
			   + "I move right\n";
     editorScala4.setValue(endContentScala4);
    }
}

var keymapScala4 = {
    "Ctrl-S" :editorScala4Send,
    "Cmd-S" :editorScala4Send,
    "0": editorScala4Key0,
    "1": editorScala4Key1,
    "2": editorScala4Key2,
    "3": editorScala4Key3,
    "4": editorScala4Key4,
    "5": editorScala4Key5,
    "6": editorScala4Key6,    
    "7": editorScala4Key7,
    "8": editorScala4Key8,
    "9": editorScala4Key9    
};
editorScala4.addKeyMap(keymapScala4);

//------------------------------------------------------------------->
// Scala5. Build JSON TODO Detail steps
// step 1 initial
// step 2 final
//------------------------------------------------------------------->

var contentScala5 = "//import scala.tools.nsc.interpreter._\n\n"
                  + "//val interpreter = new IMain()\n\n"
                  + "case class Position(x:Int, y:Int) {\n"
                  + "   def left  = Position(x-1,y)\n"
                  + "   def right = Position(x+1,y)\n"
                  + "   def up    = Position(x,y+1)\n"
                  + "   def down  = Position(x,y-1)\n"
                  + "}\n\n"
                  + "sealed trait Direction\n"
                  + "case object left extends Direction\n"
                  + "case object right extends Direction\n"
                  + "case object up extends Direction\n"
                  + "case object down extends Direction\n\n"
                  + "class Turtle(var p:Position) {\n"
                  + "   def move(d: Direction) = {\n"
                  + "      d match {\n"
                  + "         case `left` => p=p.left\n"
                  + "         case `right` => p=p.right\n"
                  + "         case `up` => p=p.up\n"
                  + "         case `down` => p=p.down\n"
                  + "      }\n"
                  + "      println(s\"x = ${p.x} and y = ${p.y}\")\n"
                  + "      this\n"
                  + "   }\n"
                  + "}\n\n"
                  + "val turtle = new Turtle(Position(1,1))\n\n"
                  + "//interpreter.bind(\"I\",turtle)\n\n"
                  + "//////////////////////////\n"
                  + "// Here is the DSL script.\n"
                  + "//val gameDSL = \"\"\"\n"
                  + "//   move left\n"
                  + "//   move right\n"
                  + "//\"\"\"\n\n"
                  + "//////////////////////\n"
                  + "// Run DSL script.\n"
                  + "//val result = interpreter.eval(gameDSL)\n\n"
		  + "val I = turtle\n\n"
	          + "I move left\n"
                  + "I move right\n";
    
var editorScala5 = new dslPrez.editor("editorScala5", contentScala5);

function editorScala5Send() {
    var value = editorScala5.getValue();
    submitTurtleFormToScalaConsole(value, "#outputScala5", "canvasScala5");
}

function editorScala5Key0() {
    editorScala5.currentPress(0, 7);
    editorScala5.setValue(contentScala5);
}

function editorScala5Key1() {
    if (editorScala5.currentPress(1, 7)) {
      editorScala5.replaceRange("import scala.collection.mutable.ArrayBuffer\n\n",{line:0, ch:0});      
      editorScala5.replaceRange("\n   val steps = new ArrayBuffer[Position]\n   steps += p\n\n",{line:20, ch:0});

      editorScala5.addLineClass(0, "background", "highlight");
      editorScala5.addLineClass(21, "background", "highlight");
      editorScala5.addLineClass(22, "background", "highlight");
    }
}

function editorScala5Key2() {
    if (editorScala5.currentPress(2,7)) {
            
      editorScala5.removeLineClass(0, "background", "highlight");
      editorScala5.removeLineClass(21, "background", "highlight");
      editorScala5.removeLineClass(22, "background", "highlight");

      editorScala5.addLineClass(31, "background", "highlight");
    }
}

function editorScala5Key3() {
    if (editorScala5.currentPress(3,7)) {
        editorScala5.removeLine(31);
        editorScala5.replaceRange("      steps += p\n",{line:31, ch:0});
        editorScala5.addLineClass(31, "background", "highlight");
    }
}

function editorScala5Key4() {
    if (editorScala5.currentPress(4,7)) {
      editorScala5.removeLineClass(31, "background", "highlight");

      var value = "import _root_.net.liftweb.json._\n"
                + "import net.liftweb.json._\n"
                + "import net.liftweb.json.JsonDSL._\n\n"
                + "import scala.language.implicitConversions // to remove warnings caused by implicits\n\n";

      editorScala5.replaceRange(value,{line:0, ch:0});
      editorScala5.addLineClass(0, "background", "highlight");
      editorScala5.addLineClass(1, "background", "highlight");
      editorScala5.addLineClass(2, "background", "highlight");
      editorScala5.addLineClass(3, "background", "highlight");
      editorScala5.addLineClass(4, "background", "highlight");
    }
}

function editorScala5Key5() {
    if (editorScala5.currentPress(5,7)) {
      editorScala5.removeLineClass(0, "background", "highlight");
      editorScala5.removeLineClass(1, "background", "highlight");
      editorScala5.removeLineClass(2, "background", "highlight");
      editorScala5.removeLineClass(3, "background", "highlight");
      editorScala5.removeLineClass(4, "background", "highlight");
      
      editorScala5.replaceRange("\nimplicit def toJsonValue(p:Position) = (\"x\"->p.x)~(\"y\"->p.y)\n",{line:18, ch:0});

      editorScala5.addLineClass(19, "background", "highlight");
    }
}

function editorScala5Key6() {
    if (editorScala5.currentPress(6, 7)) {
        editorScala5.removeLineClass(19, "background", "highlight");
        editorScala5.replaceRange("\n   def toJSon = compact(render(\"steps\"->steps))\n",{line:42, ch:0});
	editorScala5.addLineClass(43, "background", "highlight");
    }
}

function editorScala5Key7() {
    if (editorScala5.currentPress(7, 7)) {
        editorScala5.removeLineClass(43, "background", "highlight");
        editorScala5.replaceRange("\nval result = I.toJSon\nprintln(result)\nresult",{line:65, ch:0});
        editorScala5.addLineClass(66, "background", "highlight");   
	editorScala5.addLineClass(67, "background", "highlight");
	editorScala5.addLineClass(68, "background", "highlight");
    }
}


function editorScala5Key8() {
    if (editorScala5.currentPress(8,7)) {
        editorScala5.removeLineClass(66, "background", "highlight");   
	editorScala5.removeLineClass(67, "background", "highlight");
	editorScala5.removeLineClass(68, "background", "highlight");

var endContentScala5 = "import _root_.net.liftweb.json._\n"
                     + "import net.liftweb.json._\n"
                     + "import net.liftweb.json.JsonDSL._\n\n"
                     + "import scala.language.implicitConversions // to remove warnings caused by implicits\n\n"
                     + "import scala.collection.mutable.ArrayBuffer\n\n"
                     + "import scala.tools.nsc.interpreter._\n\n"
                     + "val interpreter = new IMain()\n\n"
                     + "case class Position(x:Int, y:Int) {\n"
                     + "   def left  = Position(x-1,y)\n"
                     + "   def right = Position(x+1,y)\n"
                     + "   def up    = Position(x,y+1)\n"
                     + "   def down  = Position(x,y-1)\n"
                     + "}\n\n"
                     + "implicit def toJsonValue(p:Position) = (\"x\"->p.x)~(\"y\"->p.y)\n\n"
                     + "sealed trait Direction\n"
                     + "case object left extends Direction\n"
                     + "case object right extends Direction\n"
                     + "case object up extends Direction\n"
                     + "case object down extends Direction\n\n"
                     + "class Turtle(var p:Position) {\n\n"
                     + "   val steps = new ArrayBuffer[Position]\n"
                     + "   steps += p\n\n"
                     + "   def move(d: Direction) = {\n"
                     + "      d match {\n"
                     + "         case `left` => p=p.left\n"
                     + "         case `right` => p=p.right\n"
                     + "         case `up` => p=p.up\n"
                     + "         case `down` => p=p.down\n"
                     + "      }\n"
                     + "      steps += p\n"
                     + "      this\n"
                     + "   }\n\n"
                     + "   def toJSon = compact(render(\"steps\"->steps))\n"
                     + "}\n\n"
                     + "val turtle = new Turtle(Position(1,1))\n"
                     + "interpreter.bind(\"I\",turtle)\n\n"
                     + "//////////////////////////\n"
                     + "// Here is the DSL script.\n"
                     + "val gameDSL = \"\"\"\n"
                     + "   I move left\n"
                     + "   I move right\n"
                     + "\"\"\"\n\n"
                     + "//////////////////////\n"
                     + "// Run DSL script.\n"
                     + "val result = interpreter.eval(gameDSL)\n\n"
                     + "turtle.toJSon";
      editorScala5.setValue(endContentScala5);
    }
}

var keymapScala5 = {
    "Ctrl-S" :editorScala5Send,
    "Cmd-S" :editorScala5Send,
    "0": editorScala5Key0,
    "1": editorScala5Key1,
    "2": editorScala5Key2,
    "3": editorScala5Key3,
    "4": editorScala5Key4,
    "5": editorScala5Key5,
    "6": editorScala5Key6,
    "7": editorScala5Key7,
    "8": editorScala5Key8
};
editorScala5.addKeyMap(keymapScala5);

//------------------------------------------------------------------->
// Scala6.
// step 1 initial //TODO
// step 2 final
//------------------------------------------------------------------->

var contentScala6 = "import _root_.net.liftweb.json._\n"
                  + "import net.liftweb.json._\n"
                  + "import net.liftweb.json.JsonDSL._\n"
                  + "import scala.language.implicitConversions // to remove warnings caused by implicits\n"
                  + "import scala.collection.mutable.ArrayBuffer\n\n"
                  + "case class Position(x:Int, y:Int) {\n"
                  + "   def left  = Position(x-1,y)\n"
                  + "   def right = Position(x+1,y)\n"
                  + "   def up    = Position(x,y+1)\n"
                  + "   def down  = Position(x,y-1)\n"
                  + "}\n\n"
                  + "implicit def toJsonValue(p:Position) = (\"x\"->p.x)~(\"y\"->p.y)\n\n"
                  + "sealed trait Direction\n"
                  + "case object left extends Direction\n"
                  + "case object right extends Direction\n"
                  + "case object up extends Direction\n"
                  + "case object down extends Direction\n\n"
                  + "class Turtle(var p:Position) {\n\n"
                  + "   val turtleSteps = new ArrayBuffer[Position]\n"
                  + "   turtleSteps += p\n\n"
                  + "   def move(d: Direction) = {\n"
                  + "      d match {\n"
                  + "         case `left` => p=p.left\n"
                  + "         case `right` => p=p.right\n"
                  + "         case `up` => p=p.up\n"
                  + "         case `down` => p=p.down\n"
                  + "      }\n"
                  + "      turtleSteps += p\n"
                  + "      this\n"
                  + "   }\n\n"
                  + "   def toJSon = compact(render(\"steps\"->turtleSteps))\n"
                  + "}\n\n"
                  + "val turtle = new Turtle(Position(1,1))\n\n"
 		  + "val I = turtle // emulate the binding\n\n"
		  + "///////////////////\n"
		  + "// Emulated DSL\n"
		  + "///////////////////\n"
		  + "I move left\n"
		  + "I move right\n"
		  + "////////////////////\n"
		  + "// End DSL\n"
		  + "////////////////////\n\n"
                  + "val json = turtle.toJSon\n"
		  + "println(json); json\n"


var editorScala6 = new dslPrez.editor("editorScala6", contentScala6);

function editorScala6Send() {
    var value = editorScala6.getValue();
    submitTurtleFormToScalaConsole(value, "#outputScala6", "canvasScala6");
}

function editorScala6Key0() {
    editorScala6.currentPress(0, 6);
    editorScala6.setValue(contentScala6);
}

function editorScala6Key1() {
    if (editorScala6.currentPress(1, 6)) {
       editorScala6.removeLine(47);
       editorScala6.removeLine(47);
       var value = "I move left by 2\n"
		 + "I move right by 3\n";
       editorScala6.replaceRange(value,{line:47,ch:0});
       editorScala6.addLineClass(47, "background", "highlight");
       editorScala6.addLineClass(48, "background", "highlight");
    }
}

function editorScala6Key2() {
    if (editorScala6.currentPress(2,6)) {
       editorScala6.removeLineClass(47, "background", "highlight");
       editorScala6.removeLineClass(48, "background", "highlight");

      var value = "\n   var currentDirection:Option[Direction] = None\n";
      editorScala6.replaceRange(value,{line:25,ch:0});
      editorScala6.addLineClass(26, "background", "highlight");
    }
}

function editorScala6Key3() {
    if (editorScala6.currentPress(3, 6)) {
      editorScala6.removeLineClass(26, "background", "highlight");
      var value = "      currentDirection = Some(d)\n";
      editorScala6.replaceRange(value,{line:35,ch:0});
      editorScala6.addLineClass(35, "background", "highlight");
    }
}

function editorScala6Key4() {
    if (editorScala6.currentPress(4,6)) {
       editorScala6.removeLineClass(35, "background", "highlight");

       var value = "\n   def by(step:Int) = {\n"
                 + "      // We start at 1 because we already moved once\n" 
                 + "      for (d <- currentDirection; i <- 1 until step) move(d)\n"
                 + "      currentDirection = None // Will not work anymore after until next move call\n"
		 + "      this\n"
                 + "   }\n";
      editorScala6.replaceRange(value,{line:41,ch:0});
      editorScala6.addLineClass(42, "background", "highlight");
      editorScala6.addLineClass(43, "background", "highlight");
      editorScala6.addLineClass(44, "background", "highlight");
      editorScala6.addLineClass(45, "background", "highlight");
      editorScala6.addLineClass(46, "background", "highlight");
      editorScala6.addLineClass(47, "background", "highlight");
    }
}

function editorScala6Key5() {
    if (editorScala6.currentPress(5,6)) {
        editorScala6.removeLineClass(42, "background", "highlight");
      editorScala6.removeLineClass(43, "background", "highlight");
      editorScala6.removeLineClass(44, "background", "highlight");
      editorScala6.removeLineClass(45, "background", "highlight");
      editorScala6.removeLineClass(46, "background", "highlight");
      editorScala6.removeLineClass(47, "background", "highlight");
       editorScala6.removeLine(57);
       editorScala6.removeLine(57);
       var value = "I move right by 2 steps //\\n means stop chaining alternatively use ;\n\n"
		 + "I move up by 1 step\n"
       editorScala6.replaceRange(value,{line:57,ch:0});
       editorScala6.addLineClass(57, "background", "highlight");
       editorScala6.addLineClass(58, "background", "highlight");
       editorScala6.addLineClass(59, "background", "highlight");
    }
}

function editorScala6Key6() {
    if (editorScala6.currentPress(6, 6)) {
      editorScala6.removeLineClass(57, "background", "highlight");
       editorScala6.removeLineClass(58, "background", "highlight");
       editorScala6.removeLineClass(59, "background", "highlight");
       var value = "\n   def step = () //do nothing - Return Unit to stop chaining\n"
                 + "   def steps = () //do nothing - Return Unit to stop chaining\n";
      editorScala6.replaceRange(value,{line:48,ch:0});
      editorScala6.addLineClass(49, "background", "highlight");
      editorScala6.addLineClass(50, "background", "highlight");
    }
}


function editorScala6Key7() {
    if (editorScala6.currentPress(7, 6)) {
      editorScala6.removeLineClass(49, "background", "highlight");
      editorScala6.removeLineClass(50, "background", "highlight");
      var endContentScala6 = "import _root_.net.liftweb.json._\n"
                  + "import net.liftweb.json._\n"
                  + "import net.liftweb.json.JsonDSL._\n"
                  + "import scala.language.implicitConversions // to remove warnings caused by implicits\n"
                  + "import scala.collection.mutable.ArrayBuffer\n\n"
                  + "case class Position(x:Int, y:Int) {\n"
                  + "   def left  = Position(x-1,y)\n"
                  + "   def right = Position(x+1,y)\n"
                  + "   def up    = Position(x,y+1)\n"
                  + "   def down  = Position(x,y-1)\n"
                  + "}\n\n"
                  + "implicit def toJsonValue(p:Position) = (\"x\"->p.x)~(\"y\"->p.y)\n\n"
                  + "sealed trait Direction\n"
                  + "case object left extends Direction\n"
                  + "case object right extends Direction\n"
                  + "case object up extends Direction\n"
                  + "case object down extends Direction\n\n"
                  + "class Turtle(var p:Position) {\n\n"
                  + "   val turtleSteps = new ArrayBuffer[Position]\n"
                  + "   turtleSteps += p\n\n"
		  + "   var currentDirection:Option[Direction] = None\n\n"
                  + "   def move(d: Direction) = {\n"
                  + "      d match {\n"
                  + "         case `left` => p=p.left\n"
                  + "         case `right` => p=p.right\n"
                  + "         case `up` => p=p.up\n"
                  + "         case `down` => p=p.down\n"
                  + "      }\n"
                  + "      turtleSteps += p\n"
		  + "      currentDirection = Some(d)\n"
                  + "      this\n"
                  + "   }\n\n"
                  + "   def toJSon = compact(render(\"steps\"->turtleSteps))\n\n"
		  + "   def by(step:Int) = {\n"
                  + "      // We start at 1 because we already moved once\n" 
                  + "      for (d <- currentDirection; i <- 1 until step) move(d)\n"
                  + "      currentDirection = None // Will not work anymore after until next move call\n"
		  + "      this\n"
                  + "   }\n"
                  + "}\n\n"
                  + "val turtle = new Turtle(Position(1,1))\n\n"
 		  + "val I = turtle // emulate the binding\n\n"
		  + "///////////////////\n"
		  + "// Emulated DSL\n"
		  + "///////////////////\n"
		  + "I move right by 2\n"
		  + "I move up by 3\n"
		  + "////////////////////\n"
		  + "// End DSL\n"
		  + "////////////////////\n\n"
                  + "val json = turtle.toJSon\n"
		  + "println(json); json\n";
		  editorScala6.setValue(endContentScala6);
    }
}


var keymapScala6 = {
    "Ctrl-S" :editorScala6Send,
    "Cmd-S" :editorScala6Send,
    "0": editorScala6Key0,
    "1": editorScala6Key1,    
    "2": editorScala6Key2,
    "3": editorScala6Key3,
    "4": editorScala6Key4,
    "5": editorScala6Key5,
    "6": editorScala6Key6,
    "7": editorScala6Key7
};
editorScala6.addKeyMap(keymapScala6);

//------------------------------------------------------------------->
// Scala7. Add behaviour to Integer - Usage of implicits
// step 1 initial //TODO
// step 2 final
//------------------------------------------------------------------->
var contentScala7 = "import _root_.net.liftweb.json._\n"
                  + "import net.liftweb.json._\n"
                  + "import net.liftweb.json.JsonDSL._\n"
                  + "import scala.language.implicitConversions // to remove warnings caused by implicits\n"
                  + "import scala.collection.mutable.ArrayBuffer\n\n"
                  + "case class Position(x:Int, y:Int) {\n"
                  + "   def left  = Position(x-1,y)\n"
                  + "   def right = Position(x+1,y)\n"
                  + "   def up    = Position(x,y+1)\n"
                  + "   def down  = Position(x,y-1)\n"
                  + "}\n\n"
                  + "implicit def toJsonValue(p:Position) = (\"x\"->p.x)~(\"y\"->p.y)\n\n"
                  + "sealed trait Direction\n"
                  + "case object left extends Direction\n"
                  + "case object right extends Direction\n"
                  + "case object up extends Direction\n"
                  + "case object down extends Direction\n\n"
                  + "class Turtle(var p:Position) {\n\n"
                  + "   val turtleSteps = new ArrayBuffer[Position]\n"
                  + "   turtleSteps += p\n\n"
		  + "   var currentDirection:Option[Direction] = None\n\n"
                  + "   def move(d: Direction) = {\n"
                  + "      d match {\n"
                  + "         case `left` => p=p.left\n"
                  + "         case `right` => p=p.right\n"
                  + "         case `up` => p=p.up\n"
                  + "         case `down` => p=p.down\n"
                  + "      }\n"
                  + "      turtleSteps += p\n"
		  + "      currentDirection = Some(d)\n"
                  + "      this\n"
                  + "   }\n\n"
                  + "   def toJSon = compact(render(\"steps\"->turtleSteps))\n\n"
		  + "   def by(step:Int) = {\n"
                  + "      // We start at 1 because we already moved once\n" 
                  + "      for (d <- currentDirection; i <- 1 until step) move(d)\n"
                  + "      currentDirection = None // Will not work anymore after until next move call\n"
		  + "      this\n"
                  + "   }\n"
                  + "}\n\n"
                  + "val turtle = new Turtle(Position(1,1))\n\n"
 		  + "val I = turtle // emulate the binding\n\n"
		  + "///////////////////\n"
		  + "// Emulated DSL\n"
		  + "///////////////////\n"
		  + "I move right by 2\n"
		  + "I move up by 3\n"
		  + "////////////////////\n"
		  + "// End DSL\n"
		  + "////////////////////\n\n"
                  + "val json = turtle.toJSon\n"
		  + "println(json); json\n";
    
var editorScala7 = new dslPrez.editor("editorScala7", contentScala7);

function editorScala7Send() {
    var value = editorScala7.getValue();
    submitTurtleFormToScalaConsole(value, "#outputScala7", "canvasScala7");
}

function editorScala7Key0() {
    editorScala7.currentPress(0, 4);
    editorScala7.setValue(contentScala7);
}

function editorScala7Key1() {
    if (editorScala7.currentPress(1, 4)) {
      value = "implicit class Times(i:Int) {\n"
            + "  def times(c: => Any) = for (_ <- 1 to i) c\n"
            + "}\n\n";

    }
}

function editorScala7Key2() {
    if (editorScala7.currentPress(2, 4)) {
// Ex times
    }
}

function editorScala7Key3() {
    if (editorScala7.currentPress(3, 4)) {
      value2 = "implicit def toSteps(i:Int) = Step(i)"
      value1 = "case class Step(i:Int) {\n"
             + "   def steps = this\n"
             +"}\n\n"
    }
}

function editorScala7Key4() {
    if (editorScala7.currentPress(4, 4)) {
    // Ex steps/step
    }
}

function editorScala7Key5() {
    if (editorScala7.currentPress(5, 4)) {
    }
}

var keymapScala7 = {
    "Ctrl-S" :editorScala7Send,
    "Cmd-S" :editorScala7Send,
    "0": editorScala7Key0,
    "1": editorScala7Key1,
    "2": editorScala7Key2,
    "3": editorScala7Key3,
    "4": editorScala7Key4
};
editorScala7.addKeyMap(keymapScala7);

//------------------------------------------------------------------->
// Scala8. Dynamics
// step 1 initial //TODO
// step 2 final
//------------------------------------------------------------------->
var contentScala8 = "import scala.language.dynamics\n\n"
                  + "object MyDynamicObject extends Dynamic {//works also with class\n\n"
                  + "   def applyDynamic(m: String)(args: Any*) = {\n"
                  + "     println(\"applyDynamic \"+m+\" => \"+args)\n"
                  + "   }\n\n"
                  + "   def applyDynamicNamed(m: String)(args: (String,Any)*) = {\n"
                  + "     println(\"applyDynamicNamed \"+m+\" => \"+args)\n"
                  + "   }\n\n"
                  + "   def selectDynamic(m: String) = {\n"
                  + "     println(\"selectDynamic \"+m)\n"
                  + "   }\n\n"
                  + "   def updateDynamic(m:String)(arg:Any) = {\n"
                  + "     println(\"updateDynamic \"+m+\" => \"+arg)\n"
                  + "   }\n"
                  + "}\n\n";


var editorScala8 = new dslPrez.editor("editorScala8", contentScala8);

function editorScala8Send() {
    var value = editorScala8.getValue();
    submitFormToScalaConsole(value, "#outputScala8");
}

function editorScala8Key0() {
    editorScala8.currentPress(0, 4);
    editorScala8.setValue(contentScala8);
}

function editorScala8Key1() {
    if (editorScala8.currentPress(1,4)) {
      editorScala8.replaceRange("\nMyDynamicObject.aProp //selectDynamic aProp",{line:22})
      editorScala8.addLineClass(23, "background", "highlight");    
    }
}

function editorScala8Key2() {
    if (editorScala8.currentPress(2,4)) {
      editorScala8.removeLine(22)
      editorScala8.replaceRange("\nMyDynamicObject.aProp=\"someValue\" //updateDynamic",{line:22})
        editorScala8.addLineClass(23, "background", "highlight");    
    }
}

function editorScala8Key3() {
    if (editorScala8.currentPress(3,4)) {
    editorScala8.removeLine(22)
      editorScala8.replaceRange("\nMyDynamicObject.aMeth(\"someArgs\") //applyDynamic",{line:22})
      editorScala8.addLineClass(23, "background", "highlight");    
    }
}

function editorScala8Key4() {
    if (editorScala8.currentPress(4,4)) {
       editorScala8.removeLine(22)
   editorScala8.replaceRange("\nMyDynamicObject.aMathod(myArg=\"an Arg\") //applyDynamicNamed",{line:22})
     editorScala8.addLineClass(23, "background", "highlight");    
    }
}

function editorScala8Key5() {
    if (editorScala8.currentPress(5,4)) {
      editorScala8.removeLine(22)
      editorScala8.removeLineClass(23, "background", "highlight");    
    }
}
                                                                                                                                                    
var keymapScala8 = {
    "Ctrl-S" :editorScala8Send,
    "Cmd-S" :editorScala8Send,
    "0": editorScala8Key0,
    "1": editorScala8Key1,
    "2": editorScala8Key2,
    "3": editorScala8Key3,
    "4": editorScala8Key4,
    "5": editorScala8Key5,
};

editorScala8.addKeyMap(keymapScala8);

//------------------------------------------------------------------->
// Scala9. Turn around - Timer set to 5 seconds
//------------------------------------------------------------------->

var editorScala9 = new dslPrez.editor("editorScala9","");

function editorScala9TurtleSend() {
    var value = editorScala9.getValue();
    //submitFormToScalaConsoleExtended(value, "#outputScala9", {scalaTimer:"5"});
    submitTurtleFormToScalaConsoleExtended(value, "#outputScala9", "canvasScala9", {scalaTimer:"5"});
}

var keymapScala9 = {
    "Ctrl-S": editorScala9TurtleSend,
    "Cmd-S": editorScala9TurtleSend
};
editorScala9.addKeyMap(keymapScala9);

//------------------------------------------------------------------->
// Scala10.
// step 1 initial //TODO
// step 2 final
//------------------------------------------------------------------->
var contentScala10 = "";


var editorScala10 = new dslPrez.editor("editorScala10", contentScala10);

function editorScala10Send() {
    var value = editorScala10.getValue();
    submitTurtleFormToScalaConsoleExtended(value, "#outputScala10", "canvasScala10", "scalaSecurity:on");
}

function editorScala10Key0() {
    editorScala10.currentPress(0, 2);
    editorScala10.setValue(contentScala10);
}

function editorScala10Key1() {
    if (editorScala10.currentPress(1, 2)) {

    }
}

var keymapScala10 = {
    "Ctrl-S" :editorScala10Send,
    "Cmd-S" :editorScala10Send,
    "0": editorScala10Key0,
    "1": editorScala10Key1
};
editorScala10.addKeyMap(keymapScala10);

//------------------------------------------------------------------->
// Scala11.
// step 1 initial //TODO
// step 2 final
//------------------------------------------------------------------->
var contentScala11 = "";


var editorScala11 = new dslPrez.editor("editorScala11", contentScala11);

function editorScala11Send() {
    var value = editorScala11.getValue();
    submitTurtleFormToScalaConsole(value, "#outputScala11", "canvasScala11");
}

function editorScala11Key0() {
    editorScala11.currentPress(0, 2);
    editorScala11.setValue(contentScala11);
}

function editorScala11Key1() {
    if (editorScala11.currentPress(1, 2)) {

    }
}

var keymapScala11 = {
    "Ctrl-S" :editorScala11Send,
    "Cmd-S" :editorScala11Send,
    "0": editorScala11Key0,
    "1": editorScala11Key1
};
editorScala11.addKeyMap(keymapScala11);

