var slides = $('.slide');
slides.each(function(index) {
    if (index != 0) {
        $(this).hide();
    } else {
        $(this).addClass('showSlide');
        $(this).attr('indexSlide', index);
    }
});

$(document).keydown(function(e){
    if (!inEditor) {
        var value;
        switch(e.which) {
            case 37:
                value = 0;
                break;
            case 39:
                value = 1;
                break;
            default: return; // allow other keys to be handled
        }
        changeSlide(e, value);
    }
});

var changeSlide = function(e, value) {
        var selectedSlide = $('.showSlide')[0];
        var indexSlide = parseInt($(selectedSlide).attr('indexSlide'));

        switch(value) {
            case 0:
                hideSlide(indexSlide);
                if (indexSlide == 0) {
                    showSlide(slides.size()-1)
                } else {
                    showSlide(indexSlide - 1)
                }
                break;

            case 1:
                hideSlide(indexSlide);
                if (indexSlide == slides.size()-1) {
                    showSlide(0)
                } else {
                    showSlide(indexSlide + 1)
                }
                break;

            default: return; // allow other keys to be handled
        }

        // prevent default action (eg. page moving up/down)
        // but consider accessibility (eg. user may want to use keys to choose a radio button)
        e.preventDefault();    
}


$('#run').click(function(e) {

    var url = serverUrl + "/survey/runTurtle?=";
    $.post(url, {   }, function(data) {
        var toto =data;
        if(data.finished==true) {
            $(".surveystart").hide();
            for(var index = 1; index <= counter;index++)  {
                if (answerMap[index]) {
                    var output8Value = '<div class="displayAnswer">' + answerMap[index].question + ' ' + answerMap[index].answer + '</div>';
                    $("#output8bis").append(output8Value);
                }
            }
            $('#next').click();
        }
    });
});

$('#previous').click(function(e) {
    changeSlide(e, 0);
});

$('#next').click(function(e) {
    changeSlide(e, 1);
});

var hideSlide = function(index) {
    $(slides[index]).removeClass('showSlide');
    $(slides[index]).removeAttr('indexSlide');
    $(slides[index]).slideUp(600);
};

var supportsTouch = 'ontouchstart' in window || 'onmsgesturechange' in window;
//var supportsTouch = true;

var myFunction = function() {
  alert("button pressed");
};

var showSlide = function(index) {
    $(slides[index]).addClass('showSlide');
    $(slides[index]).attr('indexSlide', index);
    $(slides[index]).slideDown(600, function(){
        $('#key1').remove();
        $('#key2').remove();
        $('#key3').remove();
        $('#key4').remove();
        $('#key5').remove();
        $('#key6').remove();
        $('#send').remove();
        if ($(slides[index]).attr('title') === 'Groovy') {
            showCloud();
        } else if ($(slides[index]).children()[0].type === 'textarea') {
            window[$(slides[index]).children()[0].id].refresh();

            if (!supportsTouch) {
                window[$(slides[index]).children()[0].id].focus();
            }

//            if (supportsTouch) {
//                if ($(slides[index]).children()[0].id === 'editor1') {
//                    $('#current').parent().append('<button id="key1" onclick="editor1Key1()"> 1 </button>');
//                    $('#current').parent().append('<button id="send" onclick="editor1Send()"> Send </button>');
//                } else if ($(slides[index]).children()[0].id === 'editor2') {
//                    $('#current').parent().append('<button id="key1" onclick="editor2Key1()"> 1</button>');
//                    $('#current').parent().append('<button id="key2" onclick="editor2Key2()">2</button>');
//                    $('#current').parent().append('<button id="key3" onclick="editor2Key3()">3</button>');
//                    $('#current').parent().append('<button id="key4" onclick="editor2Key4()">4 </button>');
//                    $('#current').parent().append('<button id="send" onclick="editor2Send()"> Send </button>');
//                } else if ($(slides[index]).children()[0].id === 'editor3') {
//                    $('#current').parent().append('<button id="key1" onclick="editor3Key1()"> 1</button>');
//                    $('#current').parent().append('<button id="key2" onclick="editor3Key2()">2</button>');
//                    $('#current').parent().append('<button id="key3" onclick="editor3Key3()">3</button>');
//                    $('#current').parent().append('<button id="key4" onclick="editor3Key4()">4</button>');
//                    $('#current').parent().append('<button id="key5" onclick="editor3Key5()">5</button>');
//                    $('#current').parent().append('<button id="key6" onclick="editor3Key6()">6 </button>');
//                    $('#current').parent().append('<button id="send" onclick="editor3Send()"> Send </button>');
//                } else if ($(slides[index]).children()[0].id === 'editor4') {
//                    $('#current').parent().append('<button id="key1" onclick="editor4Key1()"> 1</button>');
//                    $('#current').parent().append('<button id="key2" onclick="editor4Key2()">2</button>');
//                    $('#current').parent().append('<button id="key3" onclick="editor4Key3()">3</button>');
//                    $('#current').parent().append('<button id="key4" onclick="editor4Key4()">4 </button>');
//                    $('#current').parent().append('<button id="send" onclick="editor4Send()"> Send </button>');
//                } else if ($(slides[index]).children()[0].id === 'editor5') {
//                    $('#current').parent().append('<button id="key1" onclick="editor5Key1()"> 1</button>');
//                    $('#current').parent().append('<button id="key2" onclick="editor5Key2()">2 </button>');
//                    $('#current').parent().append('<button id="send" onclick="editor5Send()"> Send </button>');
//                } else if ($(slides[index]).children()[0].id === 'editor6') {
//                    $('#current').parent().append('<button id="send" onclick="editor6Send()"> Send </button>');
//                } else if ($(slides[index]).children()[0].id === 'editor7') {
//                    $('#current').parent().append('<button id="send" onclick="editor7Send()"> Send </button>');
//                } else if ($(slides[index]).children()[0].id === 'editor8') {
//                    $('#current').parent().append('<button id="send" onclick="editor8Send()"> Send </button>');
//                }
//            }
//
        }
    });
    var previous;
    if (index === 0) {
        previous = slides.size()-1;
    } else {
        previous = index -1;
    }
    var next;
    if (index === slides.size()) {
        next = 0;
    } else {
        next = index + 1;
    }

    var newPrevious = $(slides[previous]).attr('title');
    $('#previous-title').empty().append(newPrevious);
    var newNext = $(slides[next]).attr('title');
    $('#next-title').empty().append(newNext);
    $('#currentTitle').empty().append($(slides[index]).attr('title'));
    $('#currentPress').empty().append($(slides[index]).attr('press'));
};

var showCloud = function() {
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
    $("#wordcloud").jQCloud(word_array);
};

showSlide(0);
