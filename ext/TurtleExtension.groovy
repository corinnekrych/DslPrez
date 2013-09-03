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

//setup {
//    context.pushErrorCollector()
//}
//
//finish {
//    def ec = context.popErrorCollector()
//    def oc = context.errorCollector
//    ec.errors.each {
//        oc.addError(new SimpleMessage('Boum', null)      )
//    }
//}


