package test.dsl

trait Direction

case class Steps(i:Int) {
  def steps = this
}

object Helper {
implicit def iToStep(i:Int) = Steps(i)
  }

case class Down(s:Steps)

case object move {
  def down(s:Steps) = Down(s)
}
