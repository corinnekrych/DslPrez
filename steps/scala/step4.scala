// Configure the GroovyShell.
abstract class GameScript extends Script {
  def move = {left -> println "moving $left" }
  def left = "left"
}
def compilerConfig = new CompilerConfiguration()
compilerConfig.scriptBaseClass = GameScript.class.name
def binding = new Binding([right:"right"])
def shell = new GroovyShell(this.class.classLoader,
        binding,
        compilerConfig)
///////////////////////
def gameDSL = '''
move left
move right
'''
//////////////////////
// Run DSL script.
def result = shell.evaluate gameDSL

================================================

look at step3 for binding