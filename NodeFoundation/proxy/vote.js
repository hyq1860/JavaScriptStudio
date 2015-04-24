//npm install jschardet -save
//https://cnodejs.org/topic/53142ef833dbcb076d007230
//encoding : null //让body 直接是buffer
var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var debug = require('debug')('checkproxy');
var common = require('../common.js');
//console.log("{0}test".format(1));
//var baseUrl = "http://182.92.167.82:5001";
var baseUrl = "http://127.0.0.1:5001";
module.exports.vote = function (type, ip, port, callback) {
    //var jschardet = require("jschardet");
    if (type == 'qq') {
        callback();
    }
    if (type == '' || type == null || type == undefined) {
        type = 'http';
    }
    var proxy = '{0}://{1}:{2}'.format(type, ip, port);
    request('http://longdian.com/topic/ajax_vote/1/697?create_key=&from_key=', {
        method: 'GET',
        encoding: null,
        pool: { maxSockets: 10 },
        proxy: proxy,
        timeout:5000,
        headers: {
            'Accept': 'application / javascript, */*;q=0.8',
            'Referer': 'http://longdian.com/topic/vote_num/1',
            'Accept-Language': 'zh-Hans-CN,zh-Hans;q=0.8,en-US;q=0.5,en;q=0.3',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
            'Accept-Encoding': 'gzip, deflate',
            'X-Requested-With': 'XMLHttpRequest',
            'Connection': 'Keep-Alive',
            'DNT': '1',
            'Host': 'longdian.com'
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var html = iconv.decode(body, 'gb2312'); //将GBK编码的字符转换成utf8的
            //var $ = cheerio.load(html);

            debug(ip+" "+html);
            setTimeout(function() {
                callback();
            }, 2000);
            //console.log(ip);
        } else {
            debug(ip+"error");
            setTimeout(function () {
                callback();
            }, 2000);
        }
    });
    //.on('error', function (err) {
    //    debug("checkProxy request error:" + err);
    //    setTimeout(function () {
    //        callback();
    //    }, 1500);
    //    //if (err.message.code === 'ETIMEDOUT') {
    //    //    debug("err.message.code:ETIMEDOUT");
    //    //    setTimeout(function () {
    //    //        callback();
    //    //    }, 1500);
    //    //}
    //});
    //callback();
}





//<html>
//<head>
//<meta http-equiv="content-type" content="text/html; charset=gb2312">
//<title> 您的IP地址 </title>
//</head>
//<body style="margin:0px"><center>您的IP是：[202.108.50.75] 来自：北京市 联通</center></body></html>
/*
substr 方法
返回一个从指定位置开始的指定长度的子字符串。
stringvar.substr(start [, length ]) 

substring 方法
返回位于 String 对象中指定位置的子字符串。
strVariable.substring(start, end) 
 */

