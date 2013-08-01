// Configure the GroovyShell.
def shell = new GroovyShell()

///////////////////////
def gameDSL = '''
def move(left) {
  println "moving $left"
}
def left = "left"
move left

'''
//////////////////////
// Run DSL script.
def result = shell.evaluate gameDSL

==========================================

import scala.tools.nsc._

val env = new Settings()
env.usejavacp.value = true
val interpreter=new scala.tools.nsc.Interpreter(env)

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

// Alternative
// Less elegant

import scala.tools.nsc._

val env = new Settings()
env.usejavacp.value = true
val interpreter=new scala.tools.nsc.Interpreter(env)

val dsl = """
def move(direction:String) = {
println("Moving "+direction)
println(s"Moving $direction")
}
val left = "left"
this move left
"""

val result = interpreter.eval(dsl)
