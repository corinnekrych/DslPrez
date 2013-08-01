// Configure the GroovyShell.
def shell = new GroovyShell()

///////////////////////
def gameDSL = '''
'''
//////////////////////
// Run DSL script.
def result = shell.evaluate gameDSL

=====================================================

import scala.tools.nsc._

// Two next steps necessary only inside Grails/Groovy
val env = new Settings()
env.usejavacp.value = true

val interpreter=new scala.tools.nsc.Interpreter(env)

val dsl = ""

val result = interpreter.eval(dsl)