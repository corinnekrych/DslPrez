var dslPrez = dslPrez || {};

dslPrez.Slide = function () {
    var that = this;
    var slides = $('.slide');
    var callEnter = {};

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

    var currentSlideIndex = function() {
        var selectedSlide = $('.showSlide')[0];
        return parseInt($(selectedSlide).attr('indexSlide'));
    };

    var changeSlide = function(e, value) {
        var indexSlide = currentSlideIndex();
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
        if (e != null) {
            e.preventDefault();
        }
    }

    var startSlide = function(index) {
        if (index > slides.length-1) {
            index = 0;
        }
        hideSlide(0);
        showSlide(index);
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
        $('#count').empty().append("  " + index + "/" + (slides.length-1) + "  ");
        window.history.pushState("", "Title", "/DslPrez/#" + index);

        $(slides[index]).addClass('showSlide');
        $(slides[index]).attr('indexSlide', index);
        $(slides[index]).slideDown(600, function(){
            if (callEnter[$(slides[index]).attr('title')] != null) {
                callEnter[$(slides[index]).attr('title')]();
            } else if ($(slides[index]).children()[0].type === 'textarea') {
                window[$(slides[index]).children()[0].id].refresh();
                window[$(slides[index]).children()[0].id].focus();
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
        var text = "&nbsp;";
        if($(slides[index]).attr('press')) {
            text = $(slides[index]).attr('press')
        }
        $('#currentPress').empty().append(text);
    };

    that.enter = function(title, callback) {
        callEnter[title] = callback;
    };

    var startProgress  = function (conf){
        if (conf.progressbar) {

            var div = $('<div>');
            div.attr({
                id: 'container',
                class: 'progress-container'
            });
            var progress = $('<div>');
            progress.attr({
                id: 'progress-bar',
                class: 'progress'
            });
            div.append(progress);

            div.insertAfter($('#currentPress'));
            var startDate = new Date().getTime();
            var totalDuration = conf.duration*1000;

            var progress;
            function clock() {
                var $s = $("#progress-bar");
                var d = new Date().getTime();
                var diff = d - startDate;
                var percent = (diff*100)/totalDuration;
                if (percent >100) {
                    window.clearInterval(progress);
                    percent = 100;
                }
                $s.width(percent + "%").trigger("change");

                var idealTime = $(slides[currentSlideIndex()]).attr('timing');
                if (idealTime) {
                    if (Math.abs(idealTime*1000 - diff) < (totalDuration*conf.progressPrecision)/100) {
                        $s.css("background", "green");
                    } else if (idealTime*1000 > diff){
                        $s.css("background", "yellow");
                    } else {
                        $s.css("background", "red");
                    }
                }
            }
            progress = window.setInterval(clock, 1000);
        }
    };

    that.start = function(conf) {
        var url = window.location.href;

        var pos = url.indexOf('#');
        if (pos < 0) {
            var val = 0;
        }
        else {
            var val = Number(url.substring(pos + 1));
        }
        startSlide(val);
        startProgress(conf);
    };

    return that;
};


