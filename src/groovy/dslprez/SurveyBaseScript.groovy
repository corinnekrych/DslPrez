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

    def when(Boolean exp, Closure closure) {
        if(exp) {
            closure()
            println "inside ${exp}"
        }  else {
            __inputs.counter++
        }
        println "outside ${exp}"
        //println "--> $inputs.counter and $inputs.variables"
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
        invokeMethod()
	}

    def invokeMethod() {
        try {
            def methodToInvoke  = this.class.getMethod("doStep_${__inputs.counter}")
            methodToInvoke.invoke(this)
            if (!__inputs.question) {
                invokeMethod()
            }
        }
        catch(NoSuchMethodException exp){
            __inputs.finished = true
        }
    }
}

