// Read the Phantom webpage '#intro' element text using jQuery and "includeJs"

var page = require('webpage').create();

page.onConsoleMessage = function (msg) {
    console.log(msg);
};

page.open("http://list.jd.com/6728-6745-11889.html?page=245", function (status) {
    if (status === "success") {
            page.evaluate(function () {
                console.log(document.body.innerHTML);
            });
            //phantom.exit();

    }
});

