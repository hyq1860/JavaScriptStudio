var async = require('async');
var urls = [
  // a list of 100 urls
];
for (var i = 0; i < 100; i++) {
    urls.push(i);
}

function makeRequest(url, callback) {
    /* make a http request */
    setTimeout(function() {
        console.log(url);
        callback();
    }, 1000);
    //callback(); // when done, callback
}

async.eachLimit(urls, 1, makeRequest, function (err) {
    if (err) throw err;
});


/*

var http = require('http');
var cheerio = require('cheerio');
var options = {
    hostname: 'www.baidu.com',
    port: 80,
    //path: '/anchor/search',
    method: 'get'
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});
 * */