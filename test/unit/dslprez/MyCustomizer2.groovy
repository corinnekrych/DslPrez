package dslprez;


import org.codehaus.groovy.ast.ClassNode
import org.codehaus.groovy.ast.Parameter
import org.codehaus.groovy.ast.expr.ArgumentListExpression
import org.codehaus.groovy.ast.expr.ConstantExpression
import org.codehaus.groovy.ast.expr.MethodCallExpression
import org.codehaus.groovy.ast.expr.VariableExpression
import org.codehaus.groovy.ast.stmt.BlockStatement
import org.codehaus.groovy.ast.stmt.ReturnStatement
import org.codehaus.groovy.classgen.GeneratorContext
import org.codehaus.groovy.control.CompilationFailedException
import org.codehaus.groovy.control.CompilePhase
import org.codehaus.groovy.control.SourceUnit
import org.codehaus.groovy.control.customizers.CompilationCustomizer

public class MyCustomizer2 extends CompilationCustomizer {
    def methodCalls = []


    public MyCustomizer2() {
        super(CompilePhase.CONVERSION);
    }

    @Override
    public void call(final SourceUnit source, final GeneratorContext context, final ClassNode classNode) throws CompilationFailedException {
        def ast = source.getAST();
        def myClassNode
        BlockStatement runBlock
        ast.classes.each {
            myClassNode = it
            it.methods.each {
                if (it.code instanceof BlockStatement && it.name == "run") {

                    runBlock = it.code
                    runBlock.statements.each {
                        methodCalls << it
                    }
                    runBlock = new BlockStatement()
                    def dispatcherCall = new MethodCallExpression(
                            new VariableExpression("this"),
                            new ConstantExpression("dispatch"),
                            new ArgumentListExpression(
                                    [])
                    )
                    runBlock.addStatement(new ReturnStatement(dispatcherCall))
                    it.code = runBlock

                }
            }

            //let's create the methods
            def step = 0
            methodCalls.each {

                BlockStatement methodCodeBlock = new BlockStatement()
                methodCodeBlock.addStatement(it)
                myClassNode.addMethod("doStep_" + step, 1, null, [] as Parameter[], [] as ClassNode[],
                        methodCodeBlock)
                step++
            }
            runBlock = new BlockStatement()
        }


    }
}