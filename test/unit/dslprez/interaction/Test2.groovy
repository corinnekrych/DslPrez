package dslprez.interaction

import org.codehaus.groovy.control.CompilerConfiguration
import dslprez.interaction.SurveyScript2
import dslprez.interaction.MyCustomizer2

def configuration = new CompilerConfiguration()
configuration.addCompilationCustomizers(new MyCustomizer2())
configuration.scriptBaseClass = SurveyScript2.name

def binding = new Binding()
def inputs = [:]
def variables = [:]
inputs.put("counter", 0)
inputs.put("variables",variables)
binding.setVariable("inputs", inputs);
def shell = new GroovyShell(this.class.classLoader, binding, configuration)

//String scriptContent = '''
//ask "what is your name?" assign into name1
//name1 = name1 + "titi"
//'''

String scriptContent = '''
ask "what is your name?" assign into name1
when true, {
  ask "what is your meal?" assign into meal2
  when false, {
    ask "what is your meal?" assign into meal3
    ask "what is your meal?" assign into meal3bis
  }
  ask "what is your meal?" assign into meal4
}
ask "what is your birthdate?" assign into date5
'''


//first evaluate should run only ask
shell.evaluate scriptContent
//second evaluate should run only ask2
def configuration2 = new CompilerConfiguration()
configuration2.addCompilationCustomizers(new MyCustomizer2())
configuration2.scriptBaseClass = SurveyScript2.name

def shell2 = new GroovyShell(this.class.classLoader, binding, configuration2)
shell2.evaluate scriptContent

//second evaluate should run only ask3
def configuration3 = new CompilerConfiguration()
configuration3.addCompilationCustomizers(new MyCustomizer2())
configuration3.scriptBaseClass = SurveyScript2.name

def shell3 = new GroovyShell(this.class.classLoader, binding, configuration3)
shell3.evaluate scriptContent

//second evaluate should run only ask3
def configuration4 = new CompilerConfiguration()
configuration4.addCompilationCustomizers(new MyCustomizer2())
configuration4.scriptBaseClass = SurveyScript2.name

def shell4 = new GroovyShell(this.class.classLoader, binding, configuration4)
shell4.evaluate scriptContent

//second evaluate should run only ask3
def configuration5 = new CompilerConfiguration()
configuration5.addCompilationCustomizers(new MyCustomizer2())
configuration5.scriptBaseClass = SurveyScript2.name

def shell5 = new GroovyShell(this.class.classLoader, binding, configuration5)
shell5.evaluate scriptContent


def configuration6 = new CompilerConfiguration()
configuration6.addCompilationCustomizers(new MyCustomizer2())
configuration6.scriptBaseClass = SurveyScript2.name

def shell6 = new GroovyShell(this.class.classLoader, binding, configuration6)
shell6.evaluate scriptContent
