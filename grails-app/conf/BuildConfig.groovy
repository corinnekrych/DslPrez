grails.servlet.version = "2.5" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.target.level = 1.6
grails.project.source.level = 1.6

grails.project.dependency.resolution = {
    inherits("global") {
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve

    repositories {
        inherits true // Whether to inherit repository definitions from plugins
        grailsPlugins()
        grailsHome()
        grailsCentral()
        mavenCentral()
    }
    dependencies {
        runtime 'postgresql:postgresql:9.1-901-1.jdbc4'
        runtime 'org.scala-lang:scala-compiler:2.11.0-M4'
        runtime 'org.scala-lang:scala-library:2.11.0-M4'
        runtime 'scalainterpreter:scalainterpreter:1.0'
        runtime 'net.liftweb:lift-json_2.10:2.5.1'
        runtime 'postgresql:postgresql:9.1-901-1.jdbc4'
    }

    plugins {
        runtime ":jquery:1.7.1"
        compile ':heroku:1.0.1'
        compile ':cloud-support:1.0.8'
        compile ':webxml:1.4.1'
        build ':tomcat:7.0.39'
        runtime ':hibernate:3.6.10.M3'
    }
}

