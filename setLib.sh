#!/usr/bin/env bash
mkdir lib

cd lib
wget -O scala-library.jar http://search.maven.org/remotecontent?filepath=org/scala-lang/scala-library/2.11.0-M7/scala-library-2.11.0-M7.jar 
wget -O scala-compiler.jar http://search.maven.org/remotecontent?filepath=org/scala-lang/scala-compiler/2.11.0-M7/scala-compiler-2.11.0-M7.jar
wget -O scala-reflect.jar http://search.maven.org/remotecontent?filepath=org/scala-lang/scala-reflect/2.11.0-M7/scala-reflect-2.11.0-M7.jar

wget -O lift-json.jar http://search.maven.org/remotecontent?filepath=net/liftweb/lift-json_2.10/2.6-M2/lift-json_2.10-2.6-M2.jar

wget -O continuations.jar http://search.maven.org/remotecontent?filepath=org/scala-lang/plugins/continuations/2.11.0-M7/continuations-2.11.0-M7.jar

cd ..
