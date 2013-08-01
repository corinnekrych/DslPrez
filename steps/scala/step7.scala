sealed trait Direction
case object left extends Direction
case object right extends Direction
case object up extends Direction
case object down extends Direction

case class Step(i:Int) {
  def steps = this
}

implicit def toSteps(i:Int) = Step(i)

val Left = left
val Right = right
val Up = up
val Down = down 

case class Position(x:Int, y:Int, d:Option[Direction]) {
def left  = Position(x-1,y,Some(Left))
def right = Position(x+1,y,Some(Right))
def up    = Position(x,y+1,Some(Up))
def down  = Position(x,y-1,Some(Down))
}

implicit def toJsonValue(p:Position) = ("direction"->p.d.toString)~("x"->p.x)~("y"->p.y)


class Turtle(position:Position) {

var steps = position #:: Stream.empty

def lastPosition = steps.head

var currentDirection:Option[Direction] = None

def move(d: Direction) = {
  d match {
    case `left` => steps = Stream(steps.head.left) ++ steps
    case `right` => steps = Stream(steps.head.right) ++ steps
    case `up` => steps = Stream(steps.head.up) ++ steps
    case `down` => steps = Stream(steps.head.down) ++ steps
    }
  currentDirection = Some(d)
  this
  }
  
def by(s:Step) = {
for (d <- currentDirection; i <- 1 until s.i) move(d)
currentDirection = None
}
}

val t = new Turtle

t move left
t move up by 3 steps

//JSon part
import net.liftweb.json._
import net.liftweb.json.JsonDSL._

//avoid warning
import scala.language.implicitConversions

compact(render(t.steps))


=======================================================

class Position {
  int x
  int y
  Direction direction
  /* ... */
}

class Turtle {
   def currentPosition
   def steps = []
   Turtle(Position start) {
      currentPosition = start
      steps.add(start)
   }
/* ... */
}

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
    