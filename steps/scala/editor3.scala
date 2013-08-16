// Groovy binding: I can do binding in Groovy too
// no scala editor here
import scala.tools.nsc.interpreter._
import scala.tools.nsc._

val settings = new Settings
settings.usejavacp.value = true 


val engine = new IMain(settings)

engine.bind("left", "left")

object move {
    def to(direction:Object) = {
        println(s"Moving $direction")
    }
}

engine.bind("move","Object=>Unit",move.to _)


val gameDSL = """

move(left) // Converts into move.to(left)
"""
//////////////////////
// Run DSL script.
engine.eval(gameDSL)

