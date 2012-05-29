package dslprez
import groovy.lang.Script;

abstract class DSLBaseScript extends Script {
	
	def ask(question) {
		[assign : { into ->
				[:].withDefault {variable ->
					inputs.variables["$inputs.counter"] = variable
					inputs.questions["$inputs.counter"] = question
					println "ask called $inputs.counter and $inputs.variables and $inputs.questions"
					inputs.counter++
				}
			}]
	}
	
	def propertyMissing(def propertyName) {
		propertyName
	}
	
	void dispatch() {
		this.class.getMethod("doStep_$inputs.counter").invoke(this)
	}
}