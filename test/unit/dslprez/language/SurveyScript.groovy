package dslprez.language

/**
 * Created with IntelliJ IDEA.
 * User: corinne
 * Date: 11/27/12
 * Time: 9:29 PM
 * To change this template use File | Settings | File Templates.
 */
abstract class SurveyScript extends Script {
    def i = 1;
    def map = [:]
    def ask(question) {
        map["question$i"] = question
        return this
    }
    def into(variable) {
        map["variable$i"] = variable
        i++
    }
    def propertyMissing(def propertyName) {
        propertyName
    }
    def when(Boolean exp, Closure closure) {
        if(exp) {
            closure()
            println "inside if"
        }
        println "outside if"
    }
}