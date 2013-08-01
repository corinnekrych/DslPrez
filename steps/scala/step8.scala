// Clarify this one

===============================================

class Position {
/* ... */
}

class Turtle {
/* ... */

def turtle = new Turtle(new Position(1, 1, Direction.left))
def compilerConfig = new CompilerConfiguration()
def binding = new Binding([turtle: turtle,
			   move: turtle.&move,
                           left: Direction.left,
                           right: Direction.right,
                           up: Direction.up,
                           down: Direction.down])
def shell = new GroovyShell(this.class.classLoader,
        binding,
        compilerConfig)
///////////////////////
def gameDSL = '''
2.times {
  move right by 2
  move up by 1
}
'''
//////////////////////
// Run DSL script.
// result contains turtle object
// with all steps
shell.evaluate gameDSL
def builder = new groovy.json.JsonBuilder()
builder {
   steps binding["turtle"].steps
}
println builder
builder.toString()

    