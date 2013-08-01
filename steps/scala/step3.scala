// Configure the GroovyShell.
abstract class GameScript extends Script {
  def move = {left -> println "moving $left" }
  def left = "left"
}
def compilerConfig = new CompilerConfiguration()
compilerConfig.scriptBaseClass = GameScript.class.name
def binding = new Binding()
def shell = new GroovyShell(this.class.classLoader,
        binding,
        compilerConfig)
///////////////////////
def gameDSL = '''
move left
'''
//////////////////////
// Run DSL script.
def result = shell.evaluate gameDSL
    
=======================================

// There is no ScriptBaseClass
// There are alternatives like executionWrapper
// Or compileScript or interpreter
// Or binding 

// Option #1

import scala.tools.nsc._

val env = new Settings()
env.usejavacp.value = true
val interpreter=new scala.tools.nsc.Interpreter(env)

object move {
   def to(direction:String) = {
      println("Moving "+direction)
   }
}
val left = "left"
val dsl ="""
move to left
"""

interpreter.bind("move","move",move)
interpreter.bind("left","String",left)
val result = interpreter.eval(dsl)

// The binding of move works only outside the interpreter 
//(I mean work if not interpreter nested into another interpreter)

import scala.tools.nsc._

val env = new Settings()
env.usejavacp.value = true
val interpreter=new scala.tools.nsc.Interpreter(env)

val code = """object move {
   def to(direction:String) = {
      println("Moving "+direction)
   }
}"""

interpreter.compileString(code)
val left = "left"

val dsl ="""
move to left
"""

// Fail inside interpreter
//interpreter.bind("move","move",move)
interpreter.bind("left","String",left)
val result = interpreter.eval(dsl)

