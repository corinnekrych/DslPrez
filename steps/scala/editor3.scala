/*
// step 0
import javax.script._
import scala.tools.nsc.interpreter.IMain

val engine = new ScriptEngineManager().getEngineByName("scala")

// Two next steps necessary only inside Grails/Groovy
val settings = engine.asInstanceOf[IMain].settings
settings.usejavacp.value = true

val dsl = """
object move {
   def to(direction:String) = {
      println(s"Moving $direction")
   }
}
val left = "left"
move to left // Converts into move.to(left)
          """
engine.eval(dsl);

*/

/*
// step 1
// 1. add binding
// 2. remove val left
// 3. change    def to(direction:String) into def to(direction:Object)
import javax.script._
import scala.tools.nsc.interpreter.IMain

val engine = new ScriptEngineManager().getEngineByName("scala")

// Two next steps necessary only inside Grails/Groovy
val settings = engine.asInstanceOf[IMain].settings
settings.usejavacp.value = true

val binding = engine.getBindings(ScriptContext.ENGINE_SCOPE)
binding.put("left", "left")

val dsl = """
object move {
   def to(direction:Object) = {
      println("Moving " + direction)
   }
}

move to left // Converts into move.to(left)
"""
engine.eval(dsl);
*/

// step 2: I move left
// 1.
import javax.script._
import scala.tools.nsc.interpreter.IMain

val engine = new ScriptEngineManager().getEngineByName("scala")

// Two next steps necessary only inside Grails/Groovy
val settings = engine.asInstanceOf[IMain].settings
settings.usejavacp.value = true

class Turtle {
def move(direction: String) = println("Moving to "+direction)
}

val myInstance = new Turtle

val binding = engine.getBindings(ScriptContext.ENGINE_SCOPE)
binding.put("left", "left")
binding.put("I",myInstance)

val dsl = """
I move left // Converts into myInstance.move("left")
          """
engine.eval(dsl);


// Here my comments
// Suggestion 1 - with JSR 223
import javax.script._
import scala.tools.nsc.interpreter.IMain

val engine = new ScriptEngineManager().getEngineByName("scala")

// Two next steps necessary only inside Grails/Groovy
val settings = engine.asInstanceOf[IMain].settings
settings.usejavacp.value = true

class Turtle {
def move(direction: String) = println("Moving to "+direction)
}

val myInstance = new Turtle


val binding = engine.getBindings(ScriptContext.ENGINE_SCOPE)
binding.put("left", "left")
binding.put("I",myInstance)

val dsl = """
I move left // Converts into myInstance.move("left")
          """
engine.eval(dsl);

// Fail because I is considered as Object

// Suggestion 2 - with IMain
import scala.tools.nsc.Settings
import scala.tools.nsc.interpreter.IMain


val settings = new Settings
settings.usejavacp.value = trueh

val engine = new IMain(settings)

class Turtle {
def move(direction: String) = println("Moving to "+direction)
}

val myInstance = new Turtle

engine.bind("left","left")
engine.bind("I",myInstance)

val dsl = """
I move left // Converts into myInstance.move("left")
          """
engine.eval(dsl);

// Fail classpath issue

// How to solve this
In ScalaDSL I added (git pull) a dslprez.steps.editor2 package

In ConsoleController, add the import look at commented lines
Then 
def myInstance = new Turtle
n.bind("I", myturtle) and so on
look at lines commented 
