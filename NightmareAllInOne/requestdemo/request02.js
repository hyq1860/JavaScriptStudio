var async = require('async');
var request = require('request');
var qs = require('querystring');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');

var response = function (err, response, body) {
    //返回的body 直接就是buffer 了...
    var html = iconv.decode(body, 'utf-8');
    //console.log(buf);
    $ = cheerio.load(html);
    $("a")
}

request.get({
    url : "http://list.jd.com/list.html?cat=9987,653,655" ,
    encoding : null //让body 直接是buffer
}, response);

/*
function fetchContent(url, calback) {
    var req = request(url, { timeout: 10000, pool: false });
    req.setMaxListeners(50);
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
        .setHeader('accept', 'text/html,application/xhtml+xml');
    
    req.on('error', function (err) {
        console.log(err);
    });
    req.on('response', function (res) {
        var bufferHelper = new BufferHelper();
        res.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });
        res.on('end', function () {
            var result = iconv.decode(bufferHelper.toBuffer(), 'GBK');
            calback(result);
        });
    });
}
 * */