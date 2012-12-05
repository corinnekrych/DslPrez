package dslprez


import javax.script.Bindings;

import org.codehaus.groovy.control.CompilerConfiguration;
import dslprez.SurveyBaseScript;
import dslprez.SurveyCustomizer
import org.springframework.dao.DataIntegrityViolationException
import grails.converters.*
import org.codehaus.groovy.grails.web.json.*;
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
		def binding = new Binding()
		binding.setVariable("__inputs", params)
		def myBinding = binding.getVariable("__inputs")
		if(params.answerMap){
			myBinding.answerMap = JSON.parse(params.answerMap)
		}
		def compilerConfig = new CompilerConfiguration()
		compilerConfig.scriptBaseClass = SurveyBaseScript.name
		compilerConfig.addCompilationCustomizers(new SurveyCustomizer())

		def groovyShell = new GroovyShell(new GroovyClassLoader(),binding,compilerConfig)
		groovyShell.evaluate(survey.content)
        render binding.__inputs as JSON
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
