package dslprez.interaction;


import org.codehaus.groovy.ast.ClassNode
import org.codehaus.groovy.ast.Parameter
import org.codehaus.groovy.ast.expr.ArgumentListExpression
import org.codehaus.groovy.ast.expr.ConstantExpression
import org.codehaus.groovy.ast.expr.MethodCallExpression
import org.codehaus.groovy.ast.expr.VariableExpression
import org.codehaus.groovy.ast.stmt.BlockStatement
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
import org.codehaus.groovy.ast.builder.AstBuilder

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
                    def result = new AstBuilder().buildFromCode {
                        this.dispatch()
                    }
                    it.code = result[0];
                }
            }
            methodCalls.each {
                def booleans = []
                addStatement(it, myClassNode, booleans)
            }
        }
    }

    private def addStatement(ExpressionStatement exprStmt, myClassNode, booleans) {
        if (exprStmt.expression.hasProperty("method")) {
            booleans << exprStmt.expression.arguments.expressions[0]
            def whenClosure = exprStmt.expression.arguments.expressions[1]
            whenClosure.code.statements.each {
                addStatement(it, myClassNode, booleans)
            }
            if (booleans.size > 0) {
                booleans.remove(booleans.size-1)
            }
        } else {
            BlockStatement methodCodeBlock = new BlockStatement()
            if (booleans.size > 0) {
                def newWhenExpression = getWhenExpression(exprStmt, booleans)
                methodCodeBlock.addStatement(newWhenExpression)
            } else {
                methodCodeBlock.addStatement(exprStmt)
            }
            myClassNode.addMethod("doStep_" + step, 1, null, [] as Parameter[], [] as ClassNode[], methodCodeBlock)
            step++
        }
        step
    }

    private ExpressionStatement getWhenExpression(ExpressionStatement exprStmt, booleans) {
        BlockStatement block = new BlockStatement()
        block.addStatement(exprStmt)
        ClosureExpression closureExpression = new ClosureExpression(null, block)

        Expression binaryExpr = booleans[0];
        for (def i = 0; i < booleans.size - 1; i++) {
            binaryExpr = new BinaryExpression(binaryExpr, Token.newSymbol("&&", 0, 0), booleans[i + 1])
        }

        new ExpressionStatement(new MethodCallExpression(
                new VariableExpression("this"),
                new ConstantExpression("when"),
                new ArgumentListExpression([binaryExpr, closureExpression])))
    }
}