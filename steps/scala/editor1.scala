// step 0 : initial script present in HTML
/*
import scala.tools.nsc.Settings
import scala.tools.nsc.interpreter.IMain

// Two next steps necessary only inside Grails/Groovy
val settings = new Settings()
settings.usejavacp.value = true

val interpreter = new IMain(settings)

val dsl = """
  println("I run a Scala script")
"""

val result = interpreter.eval(dsl)

*/

/*
// step 1
import scala.tools.nsc.Settings
import scala.tools.nsc.interpreter.IMain

// Two next steps necessary only inside Grails/Groovy
val settings = new Settings()
settings.usejavacp.value = true

val interpreter = new IMain(settings)

val dsl = """
object move {
   def to(direction:String) = {
      println(s"Moving $direction")
   }
}
val left = "left"
move to left // Converts into move.to(left)
"""

val result = interpreter.eval(dsl)

*/

///*
// step 2
import javax.script.ScriptEngineManager
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

//*/