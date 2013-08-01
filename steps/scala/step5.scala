sealed trait Direction 
case object left extends Direction
case object right extends Direction
case object up extends Direction
case object down extends Direction

case class Position(x:Int, y:Int) {
def left  = Position(x-1,y)
def right = Position(x+1,y)
def up    = Position(x,y+1)
def down  = Position(x,y-1)
}

class Turtle(var p:Position) {
def move(d: Direction) = {
  d match {
    case `left` => p=p.left
    case `right` => p=p.right
    case `up` => p=p.up
    case `down` => p=p.down
    }
  println(s"x = ${p.x} and y = ${p.y}")
  this
  }
}

val t = new Turtle(Position(1,1))

t move left

// Alternative with implicits
implicit val t = new Turtle(Position(1,1))

// suppress warning
import scala.language.postfixOps

//Disambiguation of left inside move object
// Not needed in dsl.scala using package to qualify
val Left = left
val Right = right
val Up = up
val Down = down


object move {
def left(implicit t: Turtle) = t.move(Left)
def right(implicit t: Turtle) = t.move(Right)
def up(implicit t: Turtle) = t.move(Up)
def down(implicit t: Turtle) = t.move(Down)
}

==============================================================

class Position {
  int x
  int y
  /* ... */
}

class Turtle {
   /* ... */
   Turtle move(Direction dir) {
      Position newPosition
      if (dir == Direction.left) {
        newPosition = currentPosition.left()
      }/* ...*/
      currentPosition = newPosition
      println "x = $currentPosition.x and y = $currentPosition.y"

      this
   }
}

def turtle = new Turtle(new Position(1, 1))
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

  move right
  move up

'''
//////////////////////
// Run DSL script.
// result contains turtle object
// with all steps
shell.evaluate gameDSL


