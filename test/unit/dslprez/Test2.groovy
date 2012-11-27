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
ask "what is your birthdate?" assign into date
when true, {
  ask "what is your meal?" assign into meal
}
"""
//second evaluate should run only ask2
shell.evaluate """
ask "what is your name?" assign into name
ask "what is your birthdate?" assign into date
when true, {
  ask "what is your meal?" assign into meal
}
"""