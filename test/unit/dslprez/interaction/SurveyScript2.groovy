package dslprez.interaction

/**
 * Created with IntelliJ IDEA.
 * User: corinne
 * Date: 11/27/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */
abstract class SurveyScript2 extends Script {

    def ask(question) {
        [assign : { into ->
            [:].withDefault {variable ->
                inputs.variables["$inputs.counter"] = variable
                println "ask called $inputs.counter and $inputs.variables"
                inputs.counter++
            }
        }]
    }

    def when(Boolean exp, Closure closure) {
        if(exp) {
            closure()
            println "inside ${exp}"
        }  else {
            inputs.counter++
        }
        println "outside ${exp}"
    }

    def propertyMissing(def propertyName) {
        propertyName
    }

    void dispatch() {
        this.class.getMethod("doStep_$inputs.counter").invoke(this)
    }
}