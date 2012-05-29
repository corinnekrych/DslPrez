package dslprez

import grails.converters.JSON
import dslprez.Result
import dslprez.DSLBaseScript
import org.codehaus.groovy.ast.*
import org.codehaus.groovy.ast.expr.*
import org.codehaus.groovy.ast.stmt.*
import org.codehaus.groovy.classgen.GeneratorContext
import org.codehaus.groovy.control.CompilationFailedException
import org.codehaus.groovy.control.CompilePhase
import org.codehaus.groovy.control.CompilerConfiguration
import org.codehaus.groovy.control.SourceUnit
import org.codehaus.groovy.control.customizers.*
import org.codehaus.groovy.ast.builder.AstBuilder
import org.codehaus.groovy.syntax.Token
import org.codehaus.groovy.syntax.Types
import static org.objectweb.asm.Opcodes.ACC_PUBLIC

////first evaluate should run only ask
//shell.evaluate """
////ask()
////ask()
//ask "what is your name?" assign into name
//ask "what is your birthdate?" assign into date
// 
//"""
////secondevqluqte should run only ask2
//shell.evaluate """
//ask "what is your name?" assign into name
//ask "what is your birthdate?" assign into date
// 
// 
//"""
//grails -noreloading run-app
class DslConsoleController {

	def execute() {
		
		def configuration = new CompilerConfiguration()
		configuration.addCompilationCustomizers(new MyCustomizer())
		configuration.scriptBaseClass = DSLBaseScript.name

		def console = new DslConsole(params);
		
		// TODO real object domain
		def myMap = [:]
		def counter = console.inputs?.counter
		def variables = console.inputs?.variables
		def questions = console.inputs?.questions
		def answers = console.inputs?.answers
		myMap.put("counter", counter ?:0 )
		myMap.put("variables", variables ?:[:])
		myMap.put("questions", questions ?:[:])
		myMap.put("answers", answers ?:[:])
		myMap.put("scriptContent", console.content)
		
		

		def encoding = 'UTF-8'
		def stream = new ByteArrayOutputStream()
		def printStream = new PrintStream(stream, true, encoding)

		def result = ""
		def stacktrace = new StringWriter()
		def errWriter = new PrintWriter(stacktrace)
		def aBinding = new Binding([out: printStream, inputs : myMap])

		def originalOut = System.out
		def originalErr = System.err
		
		System.setOut(printStream)
		System.setErr(printStream)
		def shell
		try {
			shell = new GroovyShell(this.class.classLoader, aBinding, configuration)
			result = shell.evaluate(console.content)
		} catch (groovy.lang.GroovyRuntimeException e) {
			stacktrace = e.message - 'startup failed:\nScript1.groovy: '
		} finally {
			System.setOut(originalOut)
			System.setErr(originalErr)
		}

		def resultObject = new Result()
		resultObject.result =  stream.toString(encoding)
		resultObject.stacktrace = stacktrace
		resultObject.inputs = aBinding.inputs
		
		// to avoid grails bringing 404 error
		render resultObject as JSON
	}

}
