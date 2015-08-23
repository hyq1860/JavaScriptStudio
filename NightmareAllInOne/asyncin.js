//parallelLimit
//async.eachLimit, 或者 async.queue
//https://github.com/lzxue/51job


var async = require('async');
var Nightmare = require('nightmare');

var urls = [];
urls.push("http://www.baidu.com");
urls.push("http://www.jd.com");
async.map(urls, function (url,callback) {
    new Nightmare(
        {
            loadImages: false,
            weak: false,
            timeout: 10000,
            phantomPath: 'D:\\GitHub\\phantomjs-1.9.8-windows\\'
        }
    )
        .goto(url)
        .evaluate(function () {
        return document.title;
    }, function (result) {
        console.log(result);
    })
.run(callback);
}, function (err) {
    if (err) throw err;
});