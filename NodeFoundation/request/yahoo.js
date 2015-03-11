
//http://table.finance.yahoo.com/table.csv?a=0&b=1&c=2012&d=3&e=19&f=2012&s=600000.ss

var async = require('async');
var request = require('request');
var qs = require('querystring');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');


request.get({
    url : "http://table.finance.yahoo.com/table.csv?a=0&b=1&c=2012&d=3&e=19&f=2012&s=600000.ss" ,
    encoding : null //让body 直接是buffer
}, function (err, response, body) {
    var html = iconv.decode(body, 'utf-8');
    console.log(html);
});
