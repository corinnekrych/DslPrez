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

var showSlide = function(index) {
    $(slides[index]).addClass('showSlide');
    $(slides[index]).attr('indexSlide', index);
    $(slides[index]).slideDown(600, function(){
        if ($(slides[index]).attr('title') === "Groovy") {
            showCloud();
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
    $('#current').empty().append($(slides[index]).attr('title'));

};

var showCloud = function() {
    var settings = {
        "size" : {
            "grid" : 22,
            "factor" : 0, // font resize factor, 0 means automatic
            "normalize" : true // reduces outliers for more attractive output
        },
        "options" : {
            "color" : "random-dark",
            "rotationRatio" : 0.2, // 0 is all horizontal, 1 is all vertical
            "printMultiplier" : 4 // set to 3 for nice printer output; higher numbers take longer
        },
        "shape" : "circle"
    };

    $("#wordcloud").awesomeCloud( settings );
};

showSlide(0);
