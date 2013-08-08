package dslprez

import grails.converters.JSON
import dslprez.Result
import dslprez.scala.eval.Evaluator
import dslprez.Turtle
import dslprez.up
import dslprez.Direction
import dslprez.Position

class ConsoleController {

  def execute() {
    def lang = params.lang

    if (lang == "scala") executeScala()
    else if (lang == "groovy") executeGroovy()
  }

  def executeGroovy() {
    def console = new Console(content:params.content);
    
    def encoding = 'UTF-8'
    def stream = new ByteArrayOutputStream()
    def printStream = new PrintStream(stream, true, encoding)

    def result = ""
    def stacktrace = new StringWriter()
    def aBinding = new Binding([out: printStream])

    def originalOut = System.out
    def originalErr = System.err
		
    System.setOut(printStream)
    System.setErr(printStream)

    try {
      result = new GroovyShell(this.class.classLoader, aBinding).evaluate(params.content)
    } catch (Exception e) {
	  stacktrace = e.message - 'startup failed:\nScript1.groovy: '
    } finally {
	  System.setOut(originalOut)
	  System.setErr(originalErr)
    }

    def resultObject = new Result()
    resultObject.result = stream.toString(encoding)
    resultObject.shellResult = result
    resultObject.stacktrace = stacktrace
		
    // to avoid grails bringing 404 error
    render resultObject as JSON
  }

   def executeScala() {
   // Ugly search how to do better
   def cp = System.getProperty("java.class.path")
   cp = "lib/scaladsl.jar:lib/scalainterpreter.jar:lib/scala-reflect.jar:lib/scala-compiler.jar:lib/scala-library.jar:lib/lift-json.jar:target/classes:"+cp

   System.setProperty("java.class.path", cp)
     	
    def encoding = 'UTF-8'
    def stream = new ByteArrayOutputStream()
    def printStream = new PrintStream(stream, true, encoding)

    def result = ""
    def stacktrace = ""
    
    def evaluator
    try {
      evaluator = new Evaluator(printStream).withContinuations().withPluginsDir("lib/plugins")


      // Example for the game use bind and import
      //def turtle = new Turtle(new Position(0,0,up as Direction))
      //evaluator.addImport("dslprez._")      
      //println("Turtle is $turtle ==========") 
      //evaluator.bind("I","dslprez.Turtle",turtle)
      //End
 

      result = evaluator.eval(params.content)
    } catch (Exception e) {
      stacktrace = e.message
    } finally {
      if (evaluator != null) evaluator.close()
    }

    def resultObject = new Result()
    resultObject.result = stream.toString(encoding)
    resultObject.shellResult = result
    resultObject.stacktrace = stacktrace
	
    // to avoid grails bringing 404 error
    render resultObject as JSON
  }

	
  def escape(object) {
    object ? object.toString().replaceAll(/\n/, /%0D/).replaceAll(/\t/, /\\\t/).replaceAll(/"/, /\\"/) : ""
  }
}
