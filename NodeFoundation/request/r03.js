//http://blog.chinaunix.net/uid-22414998-id-3692113.html?page=3 python+phantomjs

var async = require('async');
var request = require('request');
var qs = require('querystring');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var JSON2 = require('JSON2');
var response = function (err, response, body) {
    //返回的body 直接就是buffer 了...
    var html = iconv.decode(body, 'utf-8');
    console.log(html);
    html = html.replace("var jsTimeSharingData=", "");
    html = html.replace(";","");
    var jsonData = JSON2.parse(html);
    console.log(jsonData);
}

request.get({
    url : "http://hqdigi2.eastmoney.com/EM_Quote2010NumericApplication/CompatiblePage.aspx?Type=OB&stk=0000022&Reference=xml&limit=0&page=1&rt=0.9733460071005027" ,
    encoding : null //让body 直接是buffer
}, response);