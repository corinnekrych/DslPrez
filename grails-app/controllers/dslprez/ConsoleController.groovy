package dslprez

import grails.converters.JSON
import dslprez.Result
import dslprez.scala.eval.Evaluator

// editor2
//import dslprez.steps.editor2.Turtle

//import dslprez.Turtle
//import dslprez.up
//import dslprez.Direction
//import dslprez.Position


class ConsoleController {

    def directory

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
            if (e.message.contains("Limit of allowed statements exceeded!"))
                stacktrace = " Limit of allowed statements exceeded!"
            else
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
//   def cp = System.getProperty("java.class.path")
//   if (!cp.contains("scala")) {
//    cp = "lib/scaladsl.jar:lib/scalainterpreter.jar:lib/scala-reflect.jar:lib/scala-compiler.jar:lib/scala-library.jar:lib/lift-json.jar:target/classes:"+cp
//    System.setProperty("java.class.path", cp)
//   }
        def cp = System.getProperty("java.class.path")
        if (!cp.contains("scala")) {
            cp = "lib/scaladsl.jar:lib/scalainterpreter.jar:lib/scala-reflect.jar:lib/scala-compiler.jar:lib/scala-library.jar:lib/lift-json.jar:" + cp
            System.setProperty("java.class.path", cp)
            System.getProperty("java.class.path", ".").tokenize(File.pathSeparator).each {
                println it
            }

            def compilerPath = java.lang.Class.forName("scala.tools.nsc.Interpreter").getProtectionDomain().getCodeSource().getLocation().getPath()
            println " >>>>>>>>> " + compilerPath
            def evaluatorPath = java.lang.Class.forName("dslprez.scala.eval.Evaluator").getProtectionDomain().getCodeSource().getLocation().getPath()
            def libraryPath = java.lang.Class.forName("scala.App").getProtectionDomain().getCodeSource().getLocation().getPath()
            def reflectPath = java.lang.Class.forName("scala.reflect.api.Annotations").getProtectionDomain().getCodeSource().getLocation().getPath()
            System.setProperty("java.class.path", evaluatorPath + ":" + libraryPath + ":" + compilerPath + ":" + reflectPath + ":" + cp)

            println ">>>>>>> $directory"
        }
        def encoding = 'UTF-8'
        def stream = new ByteArrayOutputStream()
        def printStream = new PrintStream(stream, true, encoding)

        def result = ""
        def stacktrace = ""

        def evaluator
        try {
            if (directory ==null) {
                def compilerPath = java.lang.Class.forName("scala.tools.nsc.Interpreter").getProtectionDomain().getCodeSource().getLocation().getPath()
                directory = compilerPath.toString() - "lib/scala-compiler.jar"
            }
            println ">>>>>>++++++++++++++++      Plug in Dir      ++++++++++>>>>>>>>>>>>>>>>>>> $directory" + "lib"
            evaluator = new Evaluator(printStream).withContinuations().withPluginsDir(directory + "lib")

            // Temporary solution
            if (params.scalaTimer != null) {
                dslprez.scala.timer.MyTimer.reinit()
                evaluator.withPluginOption("dslplugin:timerValue:"+params.scalaTimer)
            }
            if (params.scalaSecurity != null) {
                evaluator.withPluginOption("dslplugin:blacklistFile:anyfile")
            }

            result = evaluator.eval(params.content)
        } catch (Exception e) {
            stacktrace = e.message+"\n\n"+stream.toString(encoding)
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
