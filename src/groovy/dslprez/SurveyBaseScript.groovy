package dslprez

abstract class SurveyBaseScript extends Script {
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
    }

	def propertyMissing(String name) {
        name
	}

	//entry point method each time the script is called
	void dispatch() {

		if(!__inputs.answerMap){
			__inputs.answerMap = [:]
		} else {
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

