var Nightmare = require('nightmare');
var headlessBrower = new Nightmare({
    loadImages: false,
    weak: false,
    timeout: 100,
    phantomPath:'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\'
});

headlessBrower
    .goto("http://www.baidu.com")
    .type('#kw', '红包')
    .click('#su')
    .wait(1000)
    .evaluate(function() {
        return document.title;
    }, function(result) {
        console.log(result);
    })
    .run();