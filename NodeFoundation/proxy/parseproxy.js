var proxyConfig = require('./parseconfig.js');

var request = require('request');
var fs = require('fs');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var jschardet = require("jschardet");
var Nightmare = require('nightmare');
var moment = require('moment');
var debug = require('debug')('proxy');

//var baseUrl = "http://127.0.0.1:5001/";
var baseUrl = "http://127.0.0.1:5001/";
module.exports.parseProxy=function() {
    request(baseUrl + 'proxy/getProxySiteHtml', { encoding : null }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = iconv.decode(body, 'UTF-8');//将GBK编码的字符转换成utf8的
            var datas = JSON.parse(data);
            datas.forEach(function (item, i) {
                var func = proxyConfig[item.Id];
                var proxys = func(item);
                request.post({ url: baseUrl + 'proxy', form: { proxys: proxys } }, function (err, httpResponse, body) {
                    if (err) {
                        debug("request spider:" + err);
                    } else {
                        debug(body);
                    }
                });
            });
        
        } else {
            if (error) {
                console.log(error);
            }
        }
    });
}


