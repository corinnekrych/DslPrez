def getShell(binding) {
  def config = new CompilerConfiguration()
  config.addCompilationCustomizers(new SurveyCustomizer())
  config.scriptBaseClass = SurveyScript.name
  new GroovyShell(this.class.classLoader,
                  binding,
                  config)
}
def binding = new Binding()
def inputs = [:]
binding.setVariable("inputs", inputs)
def script = """
ask "what's your name?" assign to name
ask "what's your birthday?" assign to date
"""
//first evaluate should run only the first ask
getShell(binding).evaluate script
//second evaluate should run only the second ask2
getShell(binding).evaluate script


abstract class SurveyScript extends Script {
  def ask(question) {
    [assign : { to ->
      [:].withDefault {assignment ->
        inputs.question = question
        inputs.lastAssignment = assignment
        println "ask called\n --> counter: $inputs.counter \n" +
        "--> question: $question\n" +
        "--> variables: $inputs.lastAssignment\n" +
        "______________________________________\n"
        inputs.counter++
      }
    }]
  }

  def propertyMissing(String name) {
    name
  }

  //entry point method each time the script is called
  void dispatch() {
    if(!inputs.answerMap){
      inputs.answerMap = [:]
    }
    if(!inputs.counter){
      inputs.counter=0
    }
    inputs.answerMap[inputs.counter] =
      [variable:inputs.lastAssignment,
       question:inputs.question,
       answer:inputs.answer]
    invokeMethod()
  }

  def invokeMethod() {
    try {
      def method =
      this.class.getMethod("doStep_${inputs.counter}")
      method.invoke(this)
    }
    catch(NoSuchMethodException exp){
      inputs.finished = true
    }
  }
}

public class SurveyCustomizer extends CompilationCustomizer {
  def step = 0

  public SurveyCustomizer() {
    super(CompilePhase.CONVERSION);
  }

  @Override
  public void call(final SourceUnit source,
                   final GeneratorContext context,
                   final ClassNode classNode)
    throws CompilationFailedException {
    def methodCalls = []
    def ast = source.getAST();
    ast.classes.each {
      def myClassNode = it
      it.methods.each {
        if (it.code instanceof BlockStatement
          && it.name == "run") {
          it.code.statements.each {
            methodCalls << it
          }
          def result = new AstBuilder().buildFromCode {
            this.dispatch()
          }
          it.code = result[0];
        }
      }
      methodCalls.each {
        addStatement(it, myClassNode)
      }
    }
  }

  private def addStatement(ExpressionStatement exprStmt,
                           myClassNode) {
    BlockStatement methodCodeBlock = new BlockStatement()
    methodCodeBlock.addStatement(exprStmt)
    myClassNode.addMethod("doStep_" + step,
                          1,
                          null,
                          [] as Parameter[],
                          [] as ClassNode[],
                          methodCodeBlock)
    step++
  }
}
    