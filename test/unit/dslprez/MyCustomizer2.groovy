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
import org.codehaus.groovy.ast.stmt.ExpressionStatement
import org.codehaus.groovy.ast.expr.Expression
import org.codehaus.groovy.ast.expr.ClosureExpression
import org.codehaus.groovy.ast.expr.BinaryExpression
import org.codehaus.groovy.syntax.Token

public class MyCustomizer2 extends CompilationCustomizer {
    def step = 0

    public MyCustomizer2() {
        super(CompilePhase.CONVERSION);
    }

    @Override
    public void call(final SourceUnit source, final GeneratorContext context, final ClassNode classNode) throws CompilationFailedException {
        def methodCalls = []
        def ast = source.getAST();
        ast.classes.each {
            def myClassNode = it
            it.methods.each {
                if (it.code instanceof BlockStatement && it.name == "run") {
                    it.code.statements.each {
                        methodCalls << it
                    }
                    BlockStatement runBlock = new BlockStatement()
                    def dispatcherCall = new MethodCallExpression(
                            new VariableExpression("this"),
                            new ConstantExpression("dispatch"),
                            new ArgumentListExpression([])
                    )
                    runBlock.addStatement(new ReturnStatement(dispatcherCall))
                    it.code = runBlock
                }
            }
            //let's create the methods
            methodCalls.each {
                def booleans = []
                addStatement(it, myClassNode, booleans)
            }
        }
    }

    private def addStatement(it, myClassNode, booleans) {
        if (it.hasProperty("expression") && it.expression.hasProperty("method") && it.expression.method.value == "when") {
            booleans << it.expression.arguments.expressions[0]
            def whenClosure = it.expression.arguments.expressions[1]
            whenClosure.code.statements.each {
                addStatement(it, myClassNode, booleans)
            }
            if (booleans.size > 0) {
                booleans.remove(booleans.size-1)
            }
        } else {
            BlockStatement methodCodeBlock = new BlockStatement()
            if (booleans.size > 0) {
                BlockStatement block = new BlockStatement()
                block.addStatement(it)
                ClosureExpression closureExpression = new ClosureExpression(null, block)
                Expression binaryExpr = booleans[0];
                for (def i = 0; i<booleans.size-1; i++) {
                    binaryExpr = new BinaryExpression(binaryExpr, Token.newSymbol("&&", 0, 0), booleans[i+1])
                }
                ExpressionStatement whenExpression = new ExpressionStatement (new MethodCallExpression(
                        new VariableExpression("this"),
                        new ConstantExpression("when"),
                        new ArgumentListExpression([binaryExpr, closureExpression])))
                methodCodeBlock.addStatement(whenExpression)
            } else {
                methodCodeBlock.addStatement(it)
            }
            myClassNode.addMethod("doStep_" + step, 1, null, [] as Parameter[], [] as ClassNode[], methodCodeBlock)
            step++
        }
        return step
    }
}