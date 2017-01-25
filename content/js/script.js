/*  ****************************************
    App
    ****************************************    */

var app = app || {};

app.page = {
    default: "page-default",
    protect: "page-protect",
    find: "page-find",
    offers: "page-offers",
    health: "page-health",
    crime: "page-crime",
    tracker: "page-tracker"
}

app.DOM = {
    root: "root",
    header: "header",
    content: "content",
    button: {
        back: "button-back",
        menu: "button-menu",
        notification: "button-notification",
        info: "button-info",
        filter: "button-filter"
    },
    page: app.page
}

app.dimension = {
    document: {
        width: $(document).width(),
        height: $(document).height()
    },
    window: {
        width: $(window).width(),
        height: $(window).height()
    },
    header: {
        width: $('#' + app.DOM.header).width(),
        height: $('#' + app.DOM.header).height()
    },
    content: {
        width: $('#' + app.DOM.content).width(),
        height: $('#' + app.DOM.content).height()
    },
}

app.method = app.method || {};


/*  ****************************************
    Activate Page
    ****************************************    */
app.method.activatePage = function () {

    // Loop through objects in app.page
    // see if any of those exists as class for html tag
    // if so, display that page by removing hidden class for its corrispondent under app.dom.page

    var activePage = '';

    //console.log(activePage)

    //setInterval(function () {
    //    for (var key in app.page) {
    //        var value = app.page[key];

    //        //console.log(document.getElementById(value));
    //    }
    //}, 2000);
}


/*  ****************************************
    ****************************************    */

/*  ****************************************
    ****************************************    */

/*  ****************************************
    ****************************************    */

/*  ****************************************
    ****************************************    */


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

    console.log(app.page, app.DOM.page)

    console.log('Init...')

    headerButtons();

    app.method.activatePage();

};


window.onload = function() {
    return app.init();
};


/*
    \\\\\\\\\\\\\\\\\\\\////////////////////
*/


/*
    Lock the screen orientation to portrait mode
*/
function doOnOrientationChange() {
    switch (window.orientation) {
        case -90:
        case 90:
            $('html').removeClass('orientation-portrait').addClass('orientation-landscape');
            break;
        default:
            $('html').removeClass('orientation-landscape').addClass('orientation-portrait');
            break;
    }
}

window.addEventListener('orientationchange', doOnOrientationChange);

// Initial execution if needed
doOnOrientationChange();

/*
    \\\\\\\\\\\\\\\\\\\\////////////////////
*/

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

/*
    \\\\\\\\\\\\\\\\\\\\////////////////////
*/