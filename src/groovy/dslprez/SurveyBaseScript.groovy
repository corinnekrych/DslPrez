package dslprez

abstract class SurveyBaseScript extends Script {

    //def invokeNext = "CONTINUE"

	def ask(question) {
		[assign : { to ->
				[:].withDefault {assignment ->
					__inputs.question = question
					__inputs.lastAssignement = assignment
					__inputs.counter++
                    __inputs.invokeNext = "STOP"
				}
			}]
	}

    def when(Boolean exp, Closure closure) {
        if(exp) {
            closure()
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
		}
        if(!__inputs.counter){
            __inputs.counter=0
        }

        __inputs.answerMap[__inputs.counter] = [variable:__inputs.lastAssignement, question:__inputs.question, answer:__inputs.answer]
        __inputs.invokeNext = "CONTINUE"
        invokeMethod()
	}

    def invokeMethod() {
        try {
            def methodToInvoke  = this.class.getMethod("doStep_${__inputs.counter}")
            methodToInvoke.invoke(this)
            if (__inputs.invokeNext == "CONTINUE") {
                invokeMethod()
            }
        }
        catch(NoSuchMethodException exp){
            __inputs.finished = true
        }
    }
}

