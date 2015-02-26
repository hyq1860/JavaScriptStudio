//http://stackoverflow.com/questions/28568283/nightmare-run-function-que-in-while-loop-let-the-loop-wait-until-que-is-finishe
//http://stackoverflow.com/questions/26544613/why-doesnt-this-patched-asynchronous-input-work-in-nightmarejs/26546243#26546243
//http://stackoverflow.com/questions/18539491/headless-browser-and-scraping-solutions
exports.typeAsync = function (selector, done) {
    var text = prompt('dynamic, blocking input:');
    debug('.type() %s into %s', text, selector);
    this.page.evaluate(function (selector, text) {
        var element = document.querySelector(selector);
        element.value = text;
    }, done, selector, text);
};
nightmare.typeAsync('#foo');
/*
var nightmare;
var Nightmare = require('nightmare');
var Screenshot = require('nightmare-screenshot');

var runNext = function (i) {
    if (i < 10) {
        nightmare = new Nightmare();
        nightmare.goto('https:/website/?id=' + i);
        nightmare.screenshot('/home/linaro/cointellect_bot/screenshot1.png');
        nightmare.use(Screenshot.screenshotSelector('screenshot' + i + '.png', 'img[id="test"]'));
        nightmare.run(function () { runNext(i + 1); });
    }
}
runNext(0);
*/


/*
var Nightmare = require('nightmare');
var Screenshot = require('nightmare-screenshot');
var async = require('async')

var pages = [];

// You could do this recursively if you want
for (var i = 0; i < 10; i++) {
    pages.push({
        url: 'https://website/?id=' + i,
        filePath: 'screenshot' + i + '.png',
        selector: 'img[id="test"]'
    });
}

var screenshotPage = function (data, callback) {
    var nightmare = new Nightmare();
    nightmare.goto(data.url);
    nightmare.use(Screenshot.screenshotSelector(data.filePath, data.selector));
    nightmare.run(function () {
        callback(null);
    });
}

async.map(pages, screenshotPage, function () {
  // Here all screenshotPage functions will have been called 
  // there has been an error
});

 */