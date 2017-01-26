/*  ****************************************
    App
    ****************************************    */

var app = app || {};

app.method = app.method || {};

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
    }
}

app.method.updateDimension = function () {
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
        }
    }

    return app.dimension;
}

app.device = function () {
    var width = app.dimension.window.width,
        height = app.dimension.window.height,
        //mobile = false,
        //tablet = false,
        //desktop = false,
        device;

    if (width) {
        if (width <= 767) {
            //mobile = true,
            //tablet = false,
            //desktop = false;
            device = 'MOBILE';
        }
        else if (width <= 1024) {
            //mobile = false,
            //tablet = true,
            //desktop = false;
            device = 'TABLET';
        }
        else if (width => 1025) {
            //mobile = false,
            //tablet = false,
            //desktop = true;
            device = 'DESKTOP';
        }
        return device;
    }
}


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
    Lock Orientation
    ****************************************    */
app.method.lockOrientation = function () {
    var html = $('html'),
        body = $('body'),
        root = $(app.DOM.root);
    //if (app.device() == 'MOBILE')

    switch (window.orientation) {
        case -90:
        case 90:

            html.css({
                'overflow-x': 'auto',
                'overflow-y': 'hidden'
            });
            body.css({
                'overflow-x': 'auto',
                'overflow-y': 'hidden'
            });
            root.css({
                'position': 'absolute',
                'width': app.dimension.window.height,
                'height': app.dimension.window.width,
                'top': '-' + 146,
                'left': 146
            });

            $('html').removeClass('orientation-portrait').addClass('orientation-landscape');
            break;
        default:
            html.removeAttr('style');
            body.removeAttr('style');
            root.removeAttr('style');
            $('html').removeClass('orientation-landscape').addClass('orientation-portrait');
            break;
    }
}

/*  ****************************************
    ****************************************    */

/*  ****************************************
    ****************************************    */

/*  ****************************************
    Nav
    ****************************************    */
app.nav = function () {

    for (var key in app.DOM.button) {

        var id = app.DOM.button[key];
        var element = document.getElementById(id);

        if (element) {
            element.addEventListener('click', function () {

                //console.log('You clicked on the ' + id);

            });
        }
    }
}


/*  ****************************************
    Init
    ****************************************    */
app.init = function () {

    // Nav
    app.nav();

    // Dimension
    app.dimension;

    // Device
    app.device;

    // Activate Page
    app.method.activatePage();

    // Lock Orientation
    app.method.lockOrientation();
    window.addEventListener('orientationchange', app.method.lockOrientation);

};


window.onload = function() {
    return app.init();
};

$(window).on('resize', function () {
    app.method.updateDimension();
    app.device();

    console.log(app.device())

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

/*
    \\\\\\\\\\\\\\\\\\\\////////////////////
*/