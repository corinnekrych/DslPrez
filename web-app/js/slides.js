
var scala_word_array = [
    {text: "Syntaxic sugar", weight: 6},
    {text: "Traits mixin", weight: 4},
    {text: "Extractor/Apply mechanism", weight: 6},
    {text: "Pattern matching", weight: 8},
    {text: "Partial functions", weight: 8},
    {text: "Currying", weight: 7},
    {text: "Strong Typing", weight: 6},
    {text: "Implicit mechanisms", weight: 9},
    {text: "Type Inference", weight: 3},
    {text: "Type classes", weight: 4},
    {text: "Abstract Types", weight: 5},
    {text: "Case class", weight: 6},
    {text: "Higher order functions", weight: 7},
    {text: "Macros", weight: 2},
    {text: "Parser Combinators", weight: 3},
    {text: "Operators", weight: 4},
    {text: "LMS, Scala virtualization", weight: 1},
    {text: "Scripting support", weight: 6}
];

var showCloudWithArgs = function(key,word_array) {
    var height = screen.height;
    var width = screen.width;
    $("#"+key+"_wordcloud").empty();
    $("#"+key+"_wordcloud").jQCloud(word_array,{
        height: $(window).height()*0.7,
        width: $(window).width()*0.8
    });
};

var showCloud = function() {
    var height = screen.height;
    var width = screen.width;
    var word_array = [
        {text: "syntax sugar", weight: 9},
        {text: "less punctuation", weight: 7},
        {text: "scripting", weight: 5},
        {text: "binding", weight: 7},
        {text: "no getter setter", weight: 1},
        {text: "map", weight: 7},
        {text: "named parameters", weight: 8},
        {text: "closure", weight: 6},
        {text: "GString", weight: 4},
        {text: "public visibility", weight: 2},
        {text: "return statement optional", weight: 3},
        {text: "groovy truth", weight: 7},
        {text: "operator overloading", weight: 1},
        {text: "GroovyMarkup", weight: 4},
        {text: "method pointer", weight: 6},
        {text: "runtime transformation", weight: 1},
        {text: "MOP", weight: 9},
        {text: "Expando", weight: 8},
        {text: "Categories", weight: 7},
        {text: "methodMissing", weight: 8},
        {text: "command chaining", weight: 1},
        {text: "compile time transformation", weight: 7},
        {text: "AST transformation", weight: 10},
        {text: "CST transformation", weight: 5},
        {text: "TypeChecked DSL", weight: 10}
    ];
    $("#wordcloud").empty();
    $("#wordcloud").jQCloud(word_array,{
        height: $(window).height()*0.7,
        width: $(window).width()*0.8
    });
};

var blackBackground = function() {
    $(document.body).addClass("blackBackground");
}
var removeBlackBackground = function() {
    $(document.body).removeClass("blackBackground");
}
var whiteBackground = function() {
    $(document.body).addClass("whiteBackground");
}
var removeWhiteBackground = function() {
    $(document.body).removeClass("whiteBackground");
}
var showGroovyDuke = function() {
    $('.CodeMirror').addClass("groovyduke");
    $(document.body).addClass("groovycolor");
}

var showScalaDuke = function() {
    $('.CodeMirror').addClass("scaladuke");
    $(document.body).addClass("scalacolor");
}
var removeGroovyDuke = function() {
    $('.CodeMirror').removeClass("groovyduke");
    $(document.body).removeClass("groovycolor");
}

var removeScalaDuke = function() {
    $('.CodeMirror').removeClass("scaladuke");
    $(document.body).removeClass("scalacolor");
}
var slide = new dslPrez.Slide();


slide.enter("Embedded DSL: Groovy and Scala Fair Duel", whiteBackground, removeWhiteBackground);
slide.enter("Coming from...", whiteBackground, removeWhiteBackground);
slide.enter("Ext. vs int.", whiteBackground, removeWhiteBackground);
slide.enter("Internal DSL", whiteBackground, removeWhiteBackground);
slide.enter("From Debasish Gosh", whiteBackground, removeWhiteBackground);
slide.enter("DSL & Game", whiteBackground, removeWhiteBackground);
slide.enter("Corinne", whiteBackground, removeWhiteBackground);
slide.enter("Bibliography", whiteBackground, removeWhiteBackground);
slide.enter("Groovy", function() {showCloud();});
slide.enter("Scala", function() {showCloudWithArgs("scala", scala_word_array);});
slide.enter("References", whiteBackground, removeWhiteBackground);
slide.enter("AST", whiteBackground, removeWhiteBackground);

slide.enter("Groovy Script", showGroovyDuke, removeGroovyDuke);
slide.enter("Run Groovy Script", showGroovyDuke, removeGroovyDuke);

slide.enter("Scala Script", showScalaDuke, removeScalaDuke);
slide.enter("Run Scala Script", showScalaDuke, removeScalaDuke);

slide.enter("Base class in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Base class in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Binding in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Binding in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Binding in Scala", showScalaDuke, removeScalaDuke);
slide.enter("Output for Binding in Scala", showScalaDuke, removeScalaDuke);

slide.enter("Add Turtle in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Add Turtle in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Add Turtle in Scala", showScalaDuke, removeScalaDuke);
slide.enter("Output for Add Turtle in Scala", showScalaDuke, removeScalaDuke);

slide.enter("Build JSON in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Build JSON in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Build JSON in Scala", showScalaDuke, removeScalaDuke);
slide.enter("Output for Build JSON in Scala", showScalaDuke, removeScalaDuke);

slide.enter("Command Chaining in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Command Chaining in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Command Chaining in Scala", showScalaDuke, removeScalaDuke);
slide.enter("Output for Command Chaining in Scala", showScalaDuke, removeScalaDuke);

slide.enter("Odd Chaining in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Odd Chaining in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("kiss or kiss()", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for kiss in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Kiss in Scala", showScalaDuke, removeScalaDuke);
slide.enter("Output for Kiss in Scala", showScalaDuke, removeScalaDuke);

slide.enter("Adding behaviour to Integer in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Adding behaviour to Integer in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Adding behaviour to Integer in Scala", showScalaDuke, removeScalaDuke);
slide.enter("Output for Adding behaviour to Integer in Scala", showScalaDuke, removeScalaDuke);

slide.enter("TypeChecked in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for TypeChecked in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Dynamics in Scala", showScalaDuke, removeScalaDuke);
slide.enter("Output for Dynamics in Scala", showScalaDuke, removeScalaDuke);

slide.enter("Franklin wants to turn around in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Franklin wants to turn around in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Franklin wants to turn around in Scala",showScalaDuke, removeScalaDuke);
slide.enter("Output for Franklin wants to turn around in Scala", showScalaDuke, removeScalaDuke);

slide.enter("Franklin wants to play with fire in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Franklin wants to play with fire in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("Franklin wants to play with fire in Scala", showScalaDuke, removeScalaDuke);
slide.enter("Output for Franklin wants to play with fire in Scala", showScalaDuke, removeScalaDuke);

slide.enter("Franklin has a limited number of actions", showScalaDuke, removeScalaDuke);
slide.enter("Output for Franklin has a limited number of actions", showScalaDuke, removeScalaDuke);

slide.enter("Franklin wants to ask in Groovy", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Franklin wants to ask in Groovy", showGroovyDuke, removeGroovyDuke);

slide.enter("AST Tranformation", showGroovyDuke, removeGroovyDuke);
slide.enter("Output AST", showGroovyDuke, removeGroovyDuke);

slide.enter("Franklin wants to ask in Scala", showScalaDuke, removeScalaDuke);
slide.enter("Output for Franklin wants to ask in Scala", showScalaDuke, removeScalaDuke);

slide.enter("Groovy Builder", showGroovyDuke, removeGroovyDuke);
slide.enter("Output for Groovy Builder", showGroovyDuke, removeGroovyDuke);

slide.start({
    progressbar: true,
    duration: 7200,
    progressPrecision: 2
});