package dslprez

import grails.converters.JSON
import dslprez.Result


class ConsoleController {

	def execute() {
		def console = new Console(content:params.content);

		def encoding = 'UTF-8'
		def stream = new ByteArrayOutputStream()
		def printStream = new PrintStream(stream, true, encoding)

		def result = ""
		def stacktrace = new StringWriter()
		def errWriter = new PrintWriter(stacktrace)
		def aBinding = new Binding([out: printStream])

		def originalOut = System.out
		def originalErr = System.err
		
		System.setOut(printStream)
		System.setErr(printStream)
		try {
			result = new GroovyShell(this.class.classLoader, aBinding).evaluate(params.content)
		} catch (Throwable e) {
			stacktrace = e.message - 'startup failed:\nScript1.groovy: '
		} finally {
			System.setOut(originalOut)
			System.setErr(originalErr)
		}

		def resultObject = new Result()
		resultObject.result = stream.toString(encoding)
        //println "resultobject: $resultObject.result"
        resultObject.shellResult = result
        //println "shellresult: $resultObject.shellResult"
		resultObject.stacktrace = stacktrace
		
		// to avoid grails bringing 404 error
		render resultObject as JSON
	}

	
	def escape(object) {
		object ? object.toString().replaceAll(/\n/, /%0D/).replaceAll(/\t/, /\\\t/).replaceAll(/"/, /\\"/) : ""
	}
}
