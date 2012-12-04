package dslprez.language

import org.codehaus.groovy.control.CompilerConfiguration
import dslprez.language.SurveyScript

def compilerConfiguration = new CompilerConfiguration()
compilerConfiguration.scriptBaseClass = SurveyScript.class.name

def binding = new Binding()

// Configure the GroovyShell.
def shell = new GroovyShell(this.class.classLoader, binding, compilerConfiguration)

///////////////////////
def surveyDSL = '''
ask "what is your name?" into name
ask "what is your birthdate?" into date
when true, {
    println "toto"
}

when (true) {
    println "titi"
}

when true, {
   ask "what is your favourite meal?" into meal
}

when false, {
   ask "what is your favourite meal4?" into meal4
}

//when true then ask "what is your favourite meal4?" into meal4

println map
'''
//////////////////////
// Run DSL script.
shell.evaluate surveyDSL