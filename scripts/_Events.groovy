eventSetClasspath = {

    def directory = java.lang.Class.forName("scala.tools.nsc.Interpreter").getProtectionDomain().getCodeSource().getLocation().getPath().toString() - 'lib/scala-compiler.jar'
    println " >>>>>>>>> 2 >>" + directory

    rootLoader.addURL(new File(directory + "ext").toURI().toURL())
    WebApplicationContext.getClassLoader().addURL(new File(directory + "ext").toURI().toURL())
    rootLoader.addURL(new File("lib/scala-reflect.jar").toURI().toURL())
    rootLoader.addURL(new File("lib/scala-compiler.jar").toURI().toURL())
    rootLoader.addURL(new File("lib/scala-library.jar").toURI().toURL())
    classpathSet = true //false
}


eventCreateWarStart = { warName, stagingDir ->
    Ant.delete(
            dir:"${stagingDir}/js", includes:"**/*.js")
    Ant.delete(
            dir:"${stagingDir}/css" , includes:"**/*.css")
    Ant.copy(file: "dist/index.html",
            tofile: "${stagingDir}/index.html")
    Ant.copy(file: "dist/js/kt.js",
            tofile: "${stagingDir}/js/kt.js")
    Ant.copy(file: "dist/css/kt.css",
            tofile: "${stagingDir}/css/kt.css")


    Ant.copy(file: "ext/TurtleExtension.groovy",
            tofile: "${stagingDir}/WEB-INF/ext/TurtleExtension.groovy")

    println stagingDir
}


