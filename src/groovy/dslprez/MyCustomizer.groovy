package dslprez;
import org.codehaus.groovy.ast.*
import org.codehaus.groovy.ast.expr.*
import org.codehaus.groovy.ast.stmt.*
import org.codehaus.groovy.classgen.GeneratorContext
import org.codehaus.groovy.control.CompilationFailedException
import org.codehaus.groovy.control.CompilePhase
import org.codehaus.groovy.control.CompilerConfiguration
import org.codehaus.groovy.control.SourceUnit
import org.codehaus.groovy.control.customizers.*
import org.codehaus.groovy.ast.builder.AstBuilder
import org.codehaus.groovy.syntax.Token
import org.codehaus.groovy.syntax.Types
import static org.objectweb.asm.Opcodes.ACC_PUBLIC

public class MyCustomizer extends CompilationCustomizer {
def methodCalls = []


    public MyCustomizer() {
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
                if(it.code instanceof BlockStatement && it.name=="run"){

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
				    it.code=runBlock

				}
			}

			//let's create the methods
			def step = 0
			methodCalls.each{

				BlockStatement methodCodeBlock = new BlockStatement()
				methodCodeBlock.addStatement(it)
 			 myClassNode.addMethod("doStep_"+step,1,null,[]as Parameter[],[]as ClassNode[],
		          methodCodeBlock)
		      step++
		}
			runBlock = new BlockStatement()
}


}
}