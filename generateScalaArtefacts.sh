#!/usr/bin/env bash

cd ../scala-dsl

cd ScalaDSL
git pull
sbt package
cp target/scala-2.11/turtledsl_scala_2.11-1.0.jar ../../DslPrez/lib/scaladsl.jar

cd ../ScalaInterpreter
git pull
sbt package
cp target/scala-2.11/scalainterpreter_2.11-1.0.jar ../../DslPrez/lib/scalainterpreter.jar

cd ../ScalaCompilerPlugin
git pull
sbt  package
cp target/scala-2.11/scalacompilerplugin_2.11-1.0.jar ../../DslPrez/lib/plugins/scalacompilerplugin.jar

cd ../../DslPrez

