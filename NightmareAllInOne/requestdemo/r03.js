//http://blog.chinaunix.net/uid-22414998-id-3692113.html?page=3 python+phantomjs

var async = require('async');
var request = require('request');
var qs = require('querystring');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');

var response = function (err, response, body) {
    //返回的body 直接就是buffer 了...
    var html = iconv.decode(body, 'utf-8');
    console.log(html);

}

request.get({
    url : "http://127.0.0.1:8080" ,
    encoding : null //让body 直接是buffer
}, response);