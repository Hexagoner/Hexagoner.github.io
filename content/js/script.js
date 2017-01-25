/*
    App
*/

var app = app || {};

app.DOM = {
    header: "header",
    content: "content",
    button: {
        back: "button-back",
        menu: "button-menu",
        notification: "button-notification",
        info: "button-info",
        filter: "button-filter"
    }
}

// Header buttons
var headerButtons = function () {

    console.log('Header buttons...');

    for (var key in app.DOM.button) {

        var id = app.DOM.button[key];

        var element = document.getElementById(id);

        console.log(element)

        if (element) {
            element.addEventListener('click', function () {

                console.log('You clicked on the ' + id);

            });
        }

    }

};

app.init = function () {

    console.log('Init...')

    headerButtons();

};


window.onload = function() {
    return app.init();
};


/*
    Lock the screen orientation to portrait mode
*/
$(document).ready(function () {
    function reorient(e) {
        var portrait = (window.orientation % 180 == 0);
        $("#root").css("-webkit-transform", !portrait ? "rotate(-90deg)" : "");
    }
    window.onorientationchange = reorient;
    window.setTimeout(reorient, 0);
});


/*
    Add header background when page scrolls
*/
$(function () {

    var fun = function () {
        if ($(window).scrollTop() > 10) {
            $('#' + app.DOM.header).addClass('scrolled');
        } else {
            $('#' + app.DOM.header).removeClass('scrolled');
        }
    }

    $(window).on("scroll", fun);

    window.addEventListener('scroll', fun);

});