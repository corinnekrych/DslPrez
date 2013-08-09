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



