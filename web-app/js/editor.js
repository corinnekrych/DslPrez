
CodeMirror.on(window, "resize", function() {
    var showing = document.body.getElementsByClassName("CodeMirror-fullscreen")[0];
    if (!showing) return;
    showing.CodeMirror.getWrapperElement().style.height = winHeight() + "px";
});

inEditor = false;

var dslPrez = dslPrez || {};

dslPrez.editor = function (location) {
    var that = {};

    var inside = false;


    var editor = CodeMirror.fromTextArea(document.getElementById(location), {
        lineNumbers: true,
        theme: "eclipse",
        mode: "text/x-groovy"
    });

    editor.on("focus", function() {
        inside = true;
        inEditor = true;
    });
    editor.on("blur", function() {
        inside = false;
        inEditor = false;
    });


    var winHeight = function () {
        var value = window.innerHeight || (document.documentElement || document.body).clientHeight;
        return value - 110;
    };

    var resizeForSlide = function() {
        var wrap = editor.getWrapperElement();
        wrap.style.height = winHeight() + "px";
        editor.refresh();
    };

    $(window).resize(function() {
        resizeForSlide();
    });

    resizeForSlide();

    return editor;
};





