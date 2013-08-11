implicit class Times(i:Int) {
  def times(c: => Any) = for (_ <- 1 to i) c
}

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

class Turtle(position:Position) {

  var steps = position #:: Stream.empty

  def move(d: Direction) = {
    d match {
      case `left` => steps = Stream(steps.head.left) ++ steps
      case `right` => steps = Stream(steps.head.right) ++ steps
      case `up` => steps = Stream(steps.head.up) ++ steps
      case `down` => steps = Stream(steps.head.down) ++ steps
    }
    println(s"x = ${steps.head.x} and y = ${steps.head.y}")
    this
  }
}

import _root_.net.liftweb.json._
import net.liftweb.json._
import net.liftweb.json.JsonDSL._

//avoid warning
import scala.language.implicitConversions

implicit def toJsonValue(p:Position) = ("x"->p.x)~("y"->p.y)

val t = new Turtle(Position(1,1))

3.times { t move left }

compact(render(t.steps))
