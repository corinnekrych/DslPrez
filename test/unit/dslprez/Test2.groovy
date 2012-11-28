package dslprez

import org.codehaus.groovy.control.CompilerConfiguration

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

//first evaluate should run only ask
shell.evaluate """
ask "what is your name?" assign into name
when false, {
  ask "what is your meal?" assign into meal
}
ask "what is your birthdate?" assign into date
"""
//second evaluate should run only ask2
def configuration2 = new CompilerConfiguration()
configuration2.addCompilationCustomizers(new MyCustomizer2())
configuration2.scriptBaseClass = SurveyScript2.name

def shell2 = new GroovyShell(this.class.classLoader, binding, configuration2)
shell2.evaluate """
ask "what is your name?" assign into name
when true, {
  ask "what is your meal?" assign into meal
}
ask "what is your birthdate?" assign into date
"""

//second evaluate should run only ask3
def configuration3 = new CompilerConfiguration()
configuration3.addCompilationCustomizers(new MyCustomizer2())
configuration3.scriptBaseClass = SurveyScript2.name

def shell3 = new GroovyShell(this.class.classLoader, binding, configuration3)
shell3.evaluate """
ask "what is your name?" assign into name
when true, {
  ask "what is your meal?" assign into meal
}
ask "what is your birthdate?" assign into date
"""
