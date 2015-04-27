var schedule = require('node-schedule');
var request = require('request');
var async = require('async');
var debug = require('debug')('votetask');
var proxy = require('./gather.js');
var vote = require('./vote.js');
//var url = "http://182.92.167.82:5001/proxy/getproxy";
//var url = "http://127.0.0.1:5001/proxy/getproxy";
//validateProxy.validateProxyTask(url);

//vote.vote("http","180.97.178.221","80",function(){});


var url = "http://127.0.0.1:5001/proxy/getproxy";

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            debug("ip length:" + data.length);
            //如果中途出错，则马上把错误传给最终的callback，还未执行的不再执行。
            async.eachSeries(data, function (item, callback) {
            //debug(item);
            vote.vote(item.Type, item.IP, item.Port, callback);
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

//vote.vote("", "127.0.0.1", "8087", function () { });
//schedule.scheduleJob('*/5 * * * * *', function () {
//    //vote.vote();
//    vote.vote("", "127.0.0.1", "8087", function(){});
//});

