//https://passport.jd.com/uc/login?ltype=logout
//click and wait() spend a lot of time
//https://github.com/sgentle/phantomjs-node/issues/248
//https://github.com/segmentio/nightmare/issues/123#issuecomment-75136899
//https://github.com/segmentio/nightmare/issues/126#issuecomment-75928167
//node_modules / phantom / shoe / index.js
/*
var server = sockjs.createServer({
        heartbeat_delay : 200
}); 
*/
//做测试
//http://weblogs.asp.net/mikaelsoderstrom/writing-end-to-end-tests-with-nightmare-js
var Nightmare = require('nightmare');
var cheerio = require('cheerio');
var moment = require('moment');
var request = require('request');
var debug = require('debug')('jdlogin');
var db = require('./db');
var webdriver = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 2000,
        //phantomPath: 'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\',
        cookiesFile:'D:\\github\\JavaScriptStudio\\NightmareAllInOne\\jdcookie.txt'
    }
);
var baseUrl = 'http://127.0.0.1:5001';
//var baseUrl = 'http://182.92.167.82:5001';
webdriver
    .on('timeout', console.log)
    .on('resourceRequestStarted', function(requestData, networkRequest) {
        //console.log('requested: ' + JSON.stringify(requestData, undefined, 4));
        var url = requestData.url;
        if (url.indexOf('.css') > 0) {
            console.log("css abort");
            return;
        }
    })
    .useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13')
    .goto("https://passport.jd.com/uc/login?ltype=logout")
    .wait(1000)
    .type("#loginname", "hyq1860")
    .type("#nloginpwd", "1984107hyq")
    .click("#loginsubmit")
    .wait(5000);
var urls = ['http://order.jd.com/center/list.action?d=2&s=4096&t='
, 'http://order.jd.com/center/list.action?d=2014&s=4096&page=1'
, 'http://order.jd.com/center/list.action?d=2014&s=4096&page=2'
, 'http://order.jd.com/center/list.action?d=2014&s=4096&page=3'
, 'http://order.jd.com/center/list.action?d=2013&s=4096&page=1'
, 'http://order.jd.com/center/list.action?d=2013&s=4096&page=2'
, 'http://order.jd.com/center/list.action?d=2012&s=4096&page=1'
, 'http://order.jd.com/center/list.action?d=2012&s=4096&page=2'
, 'http://order.jd.com/center/list.action?d=2012&s=4096&page=3'
, 'http://order.jd.com/center/list.action?d=2012&s=4096&page=4'
, 'http://order.jd.com/center/list.action?d=3&s=4096&page=1'
, 'http://order.jd.com/center/list.action?d=3&s=4096&page=2'];
urls.forEach(function(url, index) {
    webdriver
        .goto(url)
        .evaluate(function() {
            //return document.title;
            return document.documentElement.outerHTML;
        }, function(html) {
        var $ = cheerio.load(html);
        var focusproducts = [];
            $('.tb-void > tbody  a.img-box').each(function(index, item) {
            //console.log($(item).attr('href'));
                var url = $(item).attr('href');
            if (url.indexOf('item.jd.com') > 0) {
                focusproducts.push([1,url.replace('.html','').replace('http://item.jd.com/',''),2, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),1 ]);
            }
                
            });
            request.post({ url: baseUrl + '/spider/focusproduct', form: { focusproducts: focusproducts } }, function(err, httpResponse, body) {
                if (err) {
                    debug("request spider:" + err);
                } else {
                    debug(body);
                }
            });

        });
});

webdriver.run(function (err, nightmare) {
    if (err) return console.log(err);
    console.log('Done!');
});