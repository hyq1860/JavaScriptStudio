//npm install jschardet -save
//https://cnodejs.org/topic/53142ef833dbcb076d007230
//encoding : null //让body 直接是buffer
var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var debug = require('debug')('checkproxy');
var common = require('../common.js');
//console.log("{0}test".format(1));
var baseUrl = "http://182.92.167.82:5001";
//var baseUrl = "http://127.0.0.1:1337";
module.exports.checkProxy = function(type,ip,port,callback) {
    //var jschardet = require("jschardet");
    if (type == 'qq') {
        callback();
    }
    if (type == '' || type == null || type == undefined) {
        type = 'http';
    }
    var proxy = '{0}://{1}:{2}'.format(type, ip, port);
    request('http://1111.ip138.com/ic.asp', { method: 'GET',encoding : null, 'proxy': proxy}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var html = iconv.decode(body, 'gb2312');//将GBK编码的字符转换成utf8的
            var $ = cheerio.load(html);
            var text = $('center').text();
            var startIndex = text.indexOf('[');
            var endIndex = text.indexOf(']');
            //text.substr(startIndex + 1, endIndex - startIndex - 1);
            //console.log(ip);
            //return ip;
            debug("proxy:{0} is ok".format(proxy));
            callback();
            //console.log(ip);
        } else {
            //if (error) {
            //    //console.log(error);
            //    callback(error);
            //} else {
            //    callback(response.statusCode);
            //}
            request.post({ url: baseUrl + "/proxy/update", form: { params: {flag:0, ip: ip, port:port, type: type} } }, function (err, httpResponse, body) {
                if (err) {
                    debug("request spider:" + err);
                } else {
                    debug(body);
                }
            });
            callback();
        }
    }).on('error', function (err) {
        debug("checkProxy request error:" + err);
        if (err.message.code === 'ETIMEDOUT') {
            debug("err.message.code:ETIMEDOUT");
            callback();
        }
    });
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