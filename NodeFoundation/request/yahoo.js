
//http://table.finance.yahoo.com/table.csv?a=0&b=1&c=2012&d=3&e=19&f=2012&s=600000.ss

var async = require('async');
var request = require('request');
var qs = require('querystring');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');

//Date,Open,High,Low,Close,Volume,Adj Close
//上海 ss  深证sz

request.get({
    url: "http://table.finance.yahoo.com/table.csv?s=000100.sz",
    encoding: null //让body 直接是buffer
}, function(err, response, body) {
    if (!err) {
        var html = iconv.decode(body, 'utf-8');

        var lines = html.split('\n');
        for (var i = 0; i < lines.length; i++) {
            console.log(lines[i]);
        }
    }

    //console.log(html);

});

/*
request.get({
    url : "http://table.finance.yahoo.com/table.csv?a=0&b=1&c=2015&d=5&e=17&f=2015&s=000100.sz" ,
    encoding : null //让body 直接是buffer
}, function (err, response, body) {
    if (!err) {
        var html = iconv.decode(body, 'utf-8');
        
        var lines = html.split('\n');
        for (var i = 0; i < lines.length; i++) {
            console.log(lines[i]);
        }
    }
    
    //console.log(html);

});

*/

/*
request.get({
    url : "http://finance.yahoo.com/d/quotes.csv?s=000100.sz&f=snab" ,
    encoding : null //让body 直接是buffer
}, function (err, response, body) {
    if (!err) {
        var html = iconv.decode(body, 'utf-8');
        
        var lines = html.split('\n');
        for (var i = 0; i < lines.length; i++) {
            console.log(lines[i]);
        }
    }
    
    //console.log(html);

});

*/

//yahoo数据格式说明
//http://www.jarloo.com/yahoo_finance/

/*
request.get({
    url : "http://finance.yahoo.com/d/quotes.csv?s=000100.sz&f=kj" ,
    encoding : null //让body 直接是buffer
}, function (err, response, body) {
    if (!err) {
        var html = iconv.decode(body, 'utf-8');
        
        var lines = html.split('\n');
        for (var i = 0; i < lines.length; i++) {
            console.log(lines[i]);
        }
    }
    
    //console.log(html);

});
*/
