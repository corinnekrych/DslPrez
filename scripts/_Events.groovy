eventSetClasspath = {
    rootLoader.addURL(new File("ext").toURI().toURL())

rootLoader.addURL(new File("lib/scala-reflect.jar").toURI().toURL())
rootLoader.addURL(new File("lib/scala-compiler.jar").toURI().toURL())
rootLoader.addURL(new File("lib/scala-library.jar").toURI().toURL())
//rootLoader.addURL(new URL("/usr/home/pcohen/Dev/workspace/Gr8ConfUS/target/classes"))
    classpathSet = true //false
}
