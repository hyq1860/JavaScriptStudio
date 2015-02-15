var Nightmare = require('nightmare');
var db = require('./db');
var myScrape = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 100,
        phantomPath:'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\'
    }
);
var p1 = 1,
    p2 = 2;

myScrape
  .evaluate(function (param1, param2) {
    //now we're executing inside the browser scope.
    return param1 + param2;
}, function (result) {
    // now we're inside Node scope again
    console.log(result);
}, p1, p2 // <-- that's how you pass parameters from Node scope to browser scope
)//end evaluate
  .run();

for (var i = 0; i < 100; i++) {
    myScrape.evaluate(function(p) {
        return p;
    }, function(result) {
        console.log(result);
    },i);
}
myScrape.run();


myScrape.evaluate(function() {}, function() {
    console.log(1/0);
});
myScrape.run(function (error, nightmare)
{
    if (error) {
        console.log(error);
    }
});

myScrape
.useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13')
.goto('http://www.baidu.com/')
.evaluate(function () {
    return window.navigator.userAgent;
}, function (res) {
        console.log(res);
    })
.run();


