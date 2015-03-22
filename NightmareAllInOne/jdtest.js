var Nightmare = require('nightmare');
var headlessBrower = new Nightmare({
    timeout: 1000,
    loadImages: false,
    weak: false,
    phantomPath: 'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\'
});

headlessBrower.on("timeout",function(msg) {
        console.log(msg);
    })
    .goto("http://list.jd.com/6728-6745-11889.html?page=254")
    //.type('#kw', '红包')
    //.click('#su')
    .wait('.haha')
    .evaluate(function () {
    return document.body.outerHTML;
}, function (result) {
    console.log("成功");
}).run();