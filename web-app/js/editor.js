
CodeMirror.on(window, "resize", function() {
    var showing = document.body.getElementsByClassName("CodeMirror-fullscreen")[0];
    if (!showing) return;
    showing.CodeMirror.getWrapperElement().style.height = winHeight() + "px";
});

inEditor = false;

var dslPrez = dslPrez || {};

dslPrez.editor = function (location, content) {

    var that = {};

    var inside = false;
    var currentPress = null;


    var editor = CodeMirror.fromTextArea(document.getElementById(location), {
        lineNumbers: true,
        theme: "eclipse",
        mode: "text/x-groovy"
    });
    if (content) {
        editor.setValue(content);
    }

    editor.on("focus", function() {
        inside = true;
        inEditor = true;
    });
    editor.on("blur", function() {
        inside = false;
        inEditor = false;
    });


    editor.currentPress = function(current, size) {
        if (currentPress == null) {
            if (current != 1) {
                return false;
            }
        }

        if (current != 0) {
            if (current != currentPress + 1 ) {
                return false;
            }
        }

        currentPress = current;

        var content = '';
        for (var i = 1; i <= size ; i++) {
            if (i==current) {
                content += '<span class="round">';
            } else {
                content += '<span> ';
            }
            content += i;
            content += '</span>';
        };
        $('#currentPress').empty().append(content);

        return true;
    }


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



function is_touch_device() {
    return !!('ontouchstart' in window) // works on most browsers
        || !!('onmsgesturechange' in window); // works on ie10
};





