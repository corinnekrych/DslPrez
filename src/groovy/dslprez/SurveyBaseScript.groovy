package dslprez

import grails.converters.JSON;
import groovy.json.JsonSlurper;
import groovy.lang.Script

abstract class SurveyBaseScript extends Script {
	def answerMap
	def ask(question) {
		[assign : { to ->
				[:].withDefault {assignment ->
					__inputs.question = question
					__inputs.lastAssignement=assignment
					__inputs.counter++
			
				}
			}]
	}

	def propertyMissing(String name) {
		return __inputs.answerMap[name]
	}

	//entry point method each time the script is called
	void dispatch() {

		if(!__inputs.answerMap){
			__inputs.answerMap = [:]
		}
		if (__inputs.answer) {
			__inputs.answerMap[__inputs.lastAssignement] = __inputs.answer
		}
		if(!__inputs.counter){

			__inputs.counter=0
		}
		try {
			def methodToInvoke  = this.class.getMethod("doStep_${__inputs.counter}")
			methodToInvoke.invoke(this)
		}
		catch(NoSuchMethodException exp){
			__inputs.finished = true
		}
	}
}

