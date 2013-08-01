package dslprez.scala.eval

import java.net.URL
import scala.tools.nsc._

object Evaluator  { 

  def eval(s:String, urls: Array[URL], stream:java.io.PrintStream, silent:Boolean = false) = {

    val file = new java.io.File("/tmp/scalaeval.out")
    val out = new java.io.PrintWriter( file , "UTF-8")
    val p = new java.io.PrintWriter(stream)
    
    val oldOut = System.out
    val oldErr = System.err
    var r = new Object()
 
    try {
      System.setOut(stream)
      System.setErr(stream)
      
      if (!silent) {
	Console.setOut(stream)
	Console.setErr(stream)
      }
      
      val env = new Settings() //p.println)

      //urls foreach { url => env.bootclasspath.append(url.toString) }
      // env.bootclasspath.append("/usr/home/pcohen/Dev/workspace/Gr8ConfUS/target/classes")

      //env.pluginOptions.appendToValue("continuations:enable")
      //env.pluginsDir.value="/usr/home/pcohen/Dev/workspace/Gr8ConfUS/lib"
 
      env.usejavacp.value = true

      val n=new scala.tools.nsc.Interpreter(env)

      r = n.interpret(s)

      n.close()
      r
    } catch {
      case t:Throwable => t.printStackTrace(out)
      r 
   } finally {
      out.close()
      System.setOut(oldOut)
      System.setErr(oldErr)
    }
 }
}
