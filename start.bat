@echo off

set PATH=%PATH%;D:\Java\Groovy\grails-2.3.0\bin

grails clean & grails --offline run-app
