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

module.exports.gatherProxy=function() {
    //var baseUrl = 'http://127.0.0.1:1337';
    var baseUrl = 'http://182.92.167.82:5001';
    myScrape
.useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13')
.goto('http://proxy.goubanjia.com/index1.shtml')
.wait(2000)
.evaluate(function () {
        return document.documentElement.outerHTML;
    }, function (html) {
        //var temphtml = html.replace("<!--<![endif]-->","");
        //fs.writeFileSync('./baidu.html', temphtml, 'UTF-8');
        var $ = cheerio.load(html);
        var proxys = [];
        $('#list > table > tbody > tr').each(function (index, item) {
            var proxy = { IP: "", Port: null, Anonymous: null, Type: null, Speed: null, Flag: null, InDate: null, EditDate: null };
            $(item).find('td').each(function (i, e) {
                switch (i) {
                    case 0:
                        $(e).children().each(function (i1, e1) {
                            if ($(e1).attr('style') !== undefined && $(e1).attr('style').indexOf('none') == -1 || $(e1).attr('style') === undefined) {
                                proxy.IP += $(e1).text();
                            }
                        });
                        break;
                    case 1:
                        proxy.Port = $(e).text().split(';')[1];
                        break;
                    case 2:
                        proxy.Anonymous = $(e).text();
                        break;
                    case 3:
                        proxy.Type = $(e).text();
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
            

            });
            proxy.InDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            proxy.EditDate = proxy.InDate;
            proxy.Speed = 0, proxy.Flag = 1;
            proxys.push([proxy.IP, proxy.Port, proxy.Anonymous, proxy.Type, proxy.Speed, proxy.Flag, proxy.InDate, proxy.EditDate]);
        });
        request.post({ url: baseUrl + '/proxy', form: { proxys: proxys } }, function (err, httpResponse, body) {
            if (err) {
                debug("request spider:" + err);
            } else {
                debug(body);
            }
        });
    //console.log(proxys);
    //console.log(temp);
    });
    myScrape.run();
}

/*
request('http://proxy.goubanjia.com/index1.shtml', { encoding : null }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var html = iconv.decode(body, 'UTF-8');//将GBK编码的字符转换成utf8的
        var $ = cheerio.load(html);
        $('.table tr').each(function (index, item) {
            var data = "";
            $(item).find('td').each(function (i, e) {
                if (i == 0) {
                    $(e).children().each(function (i1, e1) {
                        if ($(e1).attr('style') != 'display:none;') {
                            data += $(e1).text();
                        }
                    });
                }
                else if (i == 1) {
                    $(e).text().slice(config.startStr.length, 0 - config.endStr.length)
                    data +=$(e).text();
                }
                
                
            });
            console.log(data);
        });
    } else {
        if (error) {
            console.log(error);
        }
    }
});
 */