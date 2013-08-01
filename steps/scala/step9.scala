// Type checking 
// useless in Scala
// Alternative to show Dynamics extension

import scala.language.dynamics

object MyObj extends Dynamic {

  def applyDynamic(m: String)(args: Any*) = {
    println("applyDynamic "+m+" => "+args)
  }

  def applyDynamicNamed(m: String)(args: (String,Any)*) = {
    println("applyDynamicNamed "+m+" => "+args)
  }

  def selectDynamic(m: String) = {
    println("selectDynamic "+m)
  }

  def updateDynamic(m:String)(arg:Any) = {
    println("updateDynamic "+m+" => "+arg)
  }
}
