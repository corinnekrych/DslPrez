package dslprez

abstract class SurveyBaseScript extends Script {

	def ask(question) {
		[assign : { to ->
				[:].withDefault {assignment ->
					inputs.question = question
					inputs.lastAssignment = assignment
					inputs.counter++
                    invokeNext = Boolean.FALSE
				}
			}]
	}

    def when(Boolean exp, Closure closure) {
        if(exp) {
            closure()
        }  else {
            inputs.counter++
        }
    }

	def propertyMissing(String name) {
        name
	}

	//entry point method each time the script is called
	void dispatch() {

		if(!inputs.answerMap){
			inputs.answerMap = [:]
		}
        if(!inputs.counter){
            inputs.counter=0
        }

        inputs.answerMap[inputs.counter] = [variable:inputs.lastAssignment, question:inputs.question, answer:inputs.answer]
        invokeMethod()
	}

    def invokeMethod() {
        try {
            def methodToInvoke  = this.class.getMethod("doStep_${inputs.counter}")
            methodToInvoke.invoke(this)
            if (invokeNext) {
                invokeMethod()
            }
        }
        catch(NoSuchMethodException exp){
            inputs.finished = true
        }
    }
}

