import org.codehaus.groovy.control.messages.SimpleMessage

unresolvedVariable { var ->
    if (var.name in ['left', 'right', 'up', 'down']) {
        storeType(var, classNodeFor(dslprez.Direction))
        handled = true
    }
}
methodNotFound { receiver, name, argList, argTypes, call ->
    if (name in ['by', 'move']) {
       return newMethod(name, classNodeFor(dslprez.Turtle))
    }
}

// return value not type

// return more error Type check string in method call

setup {
    context.pushErrorCollector()
}

finish {
    def ec = context.popErrorCollector()
    def oc = context.errorCollector
    ec.errors.each {
        oc.addError(new SimpleMessage('Boum', null)      )
    }
}



//@groovy.transform.Field def var = "toto"
//4.times {
//
//    ask toto assign to name
//    when (name == "Franklin) {
//}
//ask "what's your birthday?" assign to date
//}


//use future in AST transform
//

// ext module

// a la scala home() -> home

// delegate + @DelegateTo -> See guillaume

// tests for DSL