//http://proxy.goubanjia.com/index1.shtml

//npm install jschardet -save
//https://cnodejs.org/topic/53142ef833dbcb076d007230
//encoding : null //让body 直接是buffer
var request = require('request');
var fs = require('fs');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var jschardet = require("jschardet");
var Nightmare = require('nightmare');
var moment = require('moment');
var debug = require('debug')('proxy');
var common = require('../common.js');
var myScrape = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 5000,
        //phantomPath:"D:\\GitHub\\JavaScriptStudio\\PhantomjsExamples\\"
        //phantomPath: "D:\\Sync\\Node\\phantomjs-2.0.0-windows\\"
    }
);
myScrape
    .useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13');
//var baseUrl = 'http://182.92.167.82:5001';
var baseUrl = 'http://127.0.0.1:5001';
request(baseUrl + "/proxy/getproxysites", function (err, response, body) {
    if (!err && response.statusCode == 200) {
        var data = JSON.parse(body);
        data.forEach(function(item, i) {
            myScrape
                .goto(item.Site)
                .wait(1000)
                .evaluate(function(item) {
                return { item: item, html: document.documentElement.outerHTML };
            }, function(data) {

                var proxySource = {ProxySiteId: data.item.Id, Url: data.item.Site, Html: data.html, InDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), EditDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")};
                request.post({ url: baseUrl + "/proxy/saveProxySource", form: { ProxySource: proxySource } }, function(err, response, body) {
                    if (!err) {
                        debug(body);
                    } else {
                        debug(err);
                    }
                });

            },item);
        });
        myScrape.run();
    } else {
            
    }
});

module.exports.gatherProxy = function () {

    request(baseUrl+"/proxy/getproxysites", function(err,response,body) {
        if (!err&& response.statusCode == 200) {
            debug(body);
        } else {
            
        }
    });

    //var baseUrl = 'http://127.0.0.1:1337';
    /*
    myScrape
        .useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13')
        .goto('http://proxy.goubanjia.com/index1.shtml')
        .wait(1000)
        .evaluate(function() {
            return document.documentElement.outerHTML;
        }, function(html) {});
    myScrape.run();*/
};
