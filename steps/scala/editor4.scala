// Step final
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
//implicit val t = new Turtle(Position(1,1))
//
//// suppress warning
//import scala.language.postfixOps
//
////Disambiguation of left inside move object
//// Not needed in dsl.scala using package to qualify
//val Left = left
//val Right = right
//val Up = up
//val Down = down
//
//
//object move {
//  def left(implicit t: Turtle) = t.move(Left)
//  def right(implicit t: Turtle) = t.move(Right)
//  def up(implicit t: Turtle) = t.move(Up)
//  def down(implicit t: Turtle) = t.move(Down)
//}
//
