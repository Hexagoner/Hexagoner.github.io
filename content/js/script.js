
/*  ****************************************
    Utility Functions
    ****************************************    */
var contains = function (needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;
    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (needle) {
            var i = -1, index = -1;
            for (i = 0; i < this.length; i++) {
                var item = this[i];
                if ((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle) > -1;
}



/*  ****************************************
    App
    ****************************************    */

var app = app || {};

app.method = app.method || {};

// Page
app.page = {
    default: "page-default",
    vehicleProtect: "page-vehicle-protect",
    vehicleRoute: "page-vehicle-route",
    vehicleMap: "page-vehicle-map",
    offers: "page-offers",
    health: "page-health",
    crime: "page-crime",
    tracker: "page-tracker"
}

// Status
// This object's responsibility is to store static stuff about our app
// so we can go back to it while we are inrteracting with our app
app.status = {
    default: 'default',
    breadcrumb: ['default', 'vehicleRoute', 'vehicleMap']
}

// Breadcrumb
var breadcrumb = function () {
    // This method is reponsible to load the default page of our app.status.default
    var self = this;

}
breadcrumb.prototype.add = function (item) {
    var self = this;
    // As we drill down through the pages, we should add those pages to our app.status.breadcrumb
    // so we can keep track of them
    if (item) {
        item = item.toString();

        var exists = contains.call(app.status.breadcrumb, item);
        // To make sure we don't add the same page over and over again
        if (!exists) {
            app.status.breadcrumb.push(item);
        }
    }
    self.update();
}

breadcrumb.prototype.remove = function (item) {
    var self = this;
    // This should remove any page from the app.status.breadcrumb
    // so the back button knows where to navigate to
    if (item) {
        item = item.toString();
        if (item in app.page) {
            var index = app.status.breadcrumb.indexOf(item);
            if (index > -1) {
                app.status.breadcrumb.splice(index, 1);
            }
        }
    }
    self.update();
}

breadcrumb.prototype.update = function () {
    // This method is only responsible to refresh/update our UI
    // for instance showing and hiding relevant pages according to app.status
    console.log(app.status.breadcrumb);
}

// DOM
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
    hexagon: 'hexagon',
    welcome: 'welcome',
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
    Hexagon
    ****************************************    */
app.hexagon = function () {

    var hexagon = document.getElementById(app.DOM.hexagon),
        item = hexagon.querySelectorAll('.item'),
        logo = hexagon.querySelector('.logo'),
        buttonBack = $('#' + app.DOM.button.back),
        welcome = $('#' + app.DOM.welcome),
        page = $('#page');

    // Animation
    //$(logo).addClass('hidden').delay(500).queue(function (next) {
    //    $(this).removeClass('hidden').addClass('animated bounceIn');
    //});
    $(hexagon).addClass('animated zoomIn');

    // Hexagon Item
    item.forEach(function (element, index) {

        element.addEventListener('click', function (event) {
            var subhexagon = $(element).find('.subhexagon');
            if (subhexagon.length) {

                // Hide Welcome
                welcome.addClass('hidden');

                // Hide Hexagon Items
                $(element).siblings('li').addClass('hidden');
                $(element).addClass('selected animated zoomIn');

                // Show Subhexagon
                subhexagon.removeClass('hidden');
                subhexagon.addClass('animated zoomIn');

                // Show Back Button
                buttonBack.removeClass('hidden');
            }
        });
    });
    
    // Back Button
    buttonBack.on('click', function () {
        var selected = $(hexagon).find('> .selected');

        // Hide Subhexagon
        selected.find('.subhexagon').addClass('hidden');
        selected.removeClass('selected animated zoomIn');

        // Show Hexagon Items
        selected.siblings('li').removeClass('hidden');

        // Show Welcome
        welcome.removeClass('hidden');

        // Hide Back Button
        $(this).addClass('hidden');
    });

    // Switch Between Pages
    $(hexagon).find('a').each(function (i, e) {
        var anchor = $(e),
            data = anchor.filter('[data-page]'),
            dataValue = data.data('page');

        if (data.length) {
            //console.log(dataValue, anchor.text());
            data.on('click', function () {

                var div = '#page-' + dataValue;

                if (page.find(div).length) {

                    div = page.find(div);

                    div.removeClass('hidden').addClass('animated zoomIn');
                    $('#page-default').addClass('hidden');
                    

                    // Add the existing page to breadcrumb object so we can keep track and go back to previou(s) pages
                    // Hide the current page
                    // Show the associated DIV to the one clicked
                    // Show Back Button

                } else {
                    console.error('The ' + div + ' DIV was not found.');
                }

                //buttonBack.removeClass('hidden');
                //$(this).addClass('active');
                //console.log(dataValue, anchor.text());
            });
        }
    });

}

/*  ****************************************
    Breadcrumb
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

    // Breadcrumb
    app.breadcrumb = new breadcrumb();

    // Hexagon
    app.hexagon();

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

    //console.log(app.device())

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