import dslprez.continuations.Ask
import scala.util.continuations._

def f = {
  val fName = Ask.ask("What is your first name")
  println("Hello "+fName)

  val mName = if (fName == "John") {
  	Ask.ask("So What is your middle name "+fName)
  } else {
  	""
  }
  
  if (mName != "")
  println("Hello "+fName+" "+mName)
   
  
  val lName = Ask.ask("And what is your last name "+fName)
  println("Hello "+fName+" "+lName)
}

Ask.start(f)

Ask.answer("")

======================================================



import scala.util.continuations._

// Should be better with a class
// Simpler for demo
object Ask {
   // The continuation
   var cont: Option[String => Unit] = None

   def ask(query:String):String @cps[Unit] = {
      shift { 
         k: (String => Unit) => 
            // Make the continuation available for call
            cont = Some(k) 
            // Display the query and then quit the continuation
            println(query)
         } 
   }

   // Starts the DSL - basically a set of DSL rules
   // with ask and waiting for answer to continue
   def mystart(f: => Unit @cps[Unit])  = {
      reset {
         f
      }
   }

   // get back into the DSL flow by calling the stored continuation
   def answer(answer:String) = if (!cont.isEmpty) cont.get(answer) else {println("finished"); cont=None}
}




========================================================


def compilerConfig = new CompilerConfiguration()
compilerConfig.scriptBaseClass = SurveyScript.class.name
def binding = new Binding()
// Configure the GroovyShell.
def shell = new GroovyShell(this.class.classLoader,
                            binding,
                            compilerConfig)

///////////////////////
def surveyDSL = '''
ask "what is your name?" assign to name
ask "what is your birthday?" assign to date
display map
'''
//////////////////////
// Run DSL script.
shell.evaluate surveyDSL

abstract class SurveyScript extends Script {

  def i = 1;
  def map = [:]

  def ask(question) {
    [assign : { to ->
      [:].withDefault {variable ->
        map["question$i"] = question
        map["variable$i"] = variable
        i++
      }
    }]
  }

  def propertyMissing(def propertyName) {
    propertyName
  }

  def display(Map mapToDisplay) {
    mapToDisplay.eachWithIndex { key, value, index ->
      println "$key: $value"
      if (index % 2) {
        println "______________________________________\n"
      }
    }
  }
}
    