#!/usr/bin/env bash
mkdir lib
mkdir lib/plugins

cd lib
wget -O scala-library.jar http://search.maven.org/remotecontent?filepath=org/scala-lang/scala-library/2.11.0-M4/scala-library-2.11.0-M4.jar 
wget -O scala-compiler.jar http://search.maven.org/remotecontent?filepath=org/scala-lang/scala-compiler/2.11.0-M4/scala-compiler-2.11.0-M4.jar
wget -O scala-reflect.jar http://search.maven.org/remotecontent?filepath=org/scala-lang/scala-reflect/2.11.0-M4/scala-reflect-2.11.0-M4.jar

wget -O lift-json.jar http://search.maven.org/remotecontent?filepath=net/liftweb/lift-json_2.10/2.5.1/lift-json_2.10-2.5.1.jar

cd plugins
wget -O continuations.jar http://search.maven.org/remotecontent?filepath=org/scala-lang/plugins/continuations/2.11.0-M4/continuations-2.11.0-M4.jar

cd ../..