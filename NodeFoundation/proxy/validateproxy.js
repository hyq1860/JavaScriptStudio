var async = require('async');
var request = require('request');
var proxy = require('./checkproxy.js');
var debug = require('debug')('validateproxy');
//var url = "http://182.92.167.82:5001/proxy/getproxy";
var url = "http://127.0.0.1:5001/proxy/getproxy";

module.exports.validateProxyTask=function(url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            debug("ip length:" + data.length);
            //如果中途出错，则马上把错误传给最终的callback，还未执行的不再执行。
            async.eachSeries(data, function (item, callback) {
                //debug(item);
                proxy.checkProxy(item.Type, item.IP, item.Port, callback);
            }, function (err) {
                if (err) {
                    debug("处理异常：" + err);
                }
            });
        } else {
            if (error) {
                debug(error);
            }
        }
    });
}