import scala.collection.JavaConversions._
import java.net.URL
import java.io._
import scala.io._


package test {

object MyHelper {
def hello() = { println("helloiiiiiii"); "hh" }
}

object TestEval  { 

def eval(s:String, urls: Array[URL], p:java.io.PrintWriter) = {
import scala.tools.nsc._

val file = new File("/tmp/example.txt")
val out = new PrintWriter( file , "UTF-8")

try {
val env = new Settings() //out.println)

//urls foreach { url => out.println(url); 
//env.classpath.append(url.toString); 
//env.bootclasspath.append(url.toString) }

env.bootclasspath.append("/usr/home/pcohen/Dev/workspace/Gr8ConfUS/target/classes")

env.pluginOptions.appendToValue("continuations:enable")
//env.processArguments(List("-P:continuations:enable"),true)
env.pluginsDir.value="/usr/home/pcohen/Dev/workspace/Gr8ConfUS/lib"
 
env.usejavacp.value = true
//MyHelper.hello()        
//TestHelper.sayHello
val n=new scala.tools.nsc.Interpreter(env) //, new PrintWriter(System.out)) 
//n.bind("label", "Int", new Integer(4))

val r = n.interpret(s)

n.close()
r
} catch {
case t:Throwable => out.println(t.toString())
} finally {
out.close()
}
}
}
}
