package dslprez

import grails.converters.JSON
import org.codehaus.groovy.control.CompilerConfiguration
import org.springframework.dao.DataIntegrityViolationException
import org.codehaus.groovy.grails.web.json.JSONObject
import groovy.transform.TypeChecked
class SurveyController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list() {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [surveyInstanceList: Survey.list(params), surveyInstanceTotal: Survey.count()]
    }

    def create() {
        def title = params.title
        def content = params.content
        def surveyInstance = new Survey(params)
        surveyInstance.save(flush: true)
        render surveyInstance as JSON
    }

    def save() {
        def surveyInstance = new Survey(params)
        if (!surveyInstance.save(flush: true)) {
            render(view: "create", model: [surveyInstance: surveyInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [
                message(code: 'survey.label', default: 'Survey'),
                surveyInstance.id
        ])
        redirect(action: "show", id: surveyInstance.id)
    }

    def show() {
        def surveyInstance = Survey.get(params.id)
        if (!surveyInstance) {
            flash.message = message(code: 'default.not.found.message', args: [
                    message(code: 'survey.label', default: 'Survey'),
                    params.id
            ])
            redirect(action: "list")
            return
        }

        [surveyInstance: surveyInstance]
    }

    def run() {
        def survey = Survey.get(params.scriptId)

        def binding = new Binding("inputs": params, "invokeNext": Boolean.TRUE)

        // Get the history which goes back and forth
        if (params.answerMap) {
            binding.inputs.answerMap = JSON.parse(params.answerMap)
            binding.inputs.answerMap.each { key, value->
                if (key != "0") {
                    binding.setVariable(value.get("variable"), value.get("answer"))
                }
            }
        }

        def compilerConfig = new CompilerConfiguration()

        compilerConfig.scriptBaseClass = SurveyBaseScript.name
        compilerConfig.addCompilationCustomizers(new SurveyCustomizer())

        def groovyShell = new GroovyShell(new GroovyClassLoader(), binding, compilerConfig)
        groovyShell.evaluate(survey.content)

        render binding.inputs as JSON
    }

    def runTurtle() {

        def turtle = new dslprez.Turtle(new Position(1, 1, Direction.left))
        def compilerConfig = new CompilerConfiguration()

        compilerConfig.addCompilationCustomizers(
                new org.codehaus.groovy.control.customizers.ASTTransformationCustomizer(
                        groovy.transform.TypeChecked, extensions:['TurtleExtension.groovy']))

        def binding = new Binding([turtle: turtle,
                move: turtle.&move,
                left: Direction.left,
                right: Direction.right,
                up: Direction.up,
                down: Direction.down])
        def shell = new GroovyShell(this.class.classLoader,
                binding,
                compilerConfig)

        def gameDSL = '''
turtle1
turtleee
2
        '''

        shell.evaluate gameDSL
        def builder = new groovy.json.JsonBuilder()
        List turtleSteps =  ((Turtle)binding["turtle"]).steps
        builder {
            steps turtleSteps
        }
        println builder
        render builder as JSON

    }

    def edit() {
        def surveyInstance = Survey.get(params.id)
        if (!surveyInstance) {
            flash.message = message(code: 'default.not.found.message', args: [
                    message(code: 'survey.label', default: 'Survey'),
                    params.id
            ])
            redirect(action: "list")
            return
        }

        [surveyInstance: surveyInstance]
    }

    def update() {
        def surveyInstance = Survey.get(params.id)
        if (!surveyInstance) {
            flash.message = message(code: 'default.not.found.message', args: [
                    message(code: 'survey.label', default: 'Survey'),
                    params.id
            ])
            redirect(action: "list")
            return
        }

        if (params.version) {
            def version = params.version.toLong()
            if (surveyInstance.version > version) {
                surveyInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [
                                message(code: 'survey.label', default: 'Survey')]
                        as Object[],
                        "Another user has updated this Survey while you were editing")
                render(view: "edit", model: [surveyInstance: surveyInstance])
                return
            }
        }

        surveyInstance.properties = params

        if (!surveyInstance.save(flush: true)) {
            render(view: "edit", model: [surveyInstance: surveyInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [
                message(code: 'survey.label', default: 'Survey'),
                surveyInstance.id
        ])
        redirect(action: "show", id: surveyInstance.id)
    }

    def delete() {
        def surveyInstance = Survey.get(params.id)
        if (!surveyInstance) {
            flash.message = message(code: 'default.not.found.message', args: [
                    message(code: 'survey.label', default: 'Survey'),
                    params.id
            ])
            redirect(action: "list")
            return
        }

        try {
            surveyInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [
                    message(code: 'survey.label', default: 'Survey'),
                    params.id
            ])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [
                    message(code: 'survey.label', default: 'Survey'),
                    params.id
            ])
            redirect(action: "show", id: params.id)
        }
    }
}
