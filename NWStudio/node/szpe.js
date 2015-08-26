/*
深圳市盈率抓取
 http://www.szse.cn/szseWeb/FrontController.szse?ACTIONID=8&CATALOGID=1815_stock_child&txtDm=000002&ENCODE=1&TABKEY=tab 
http://www.szse.cn/szseWeb/FrontController.szse?ACTIONID=8&CATALOGID=1815_stock_child&txtDm=000002&ENCODE=1&TABKEY=tab1
*/

var async = require('async');
var request = require('request');
var qs = require('querystring');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var mysqldao = require('./mysqldao');
var fetch = require('node-fetch');

exports.szpe=function() {
    var pageNumbers = [];
    for (var i = 1; i <= 1; i++) {
        pageNumbers.push(i);
    }
    
    var jsonCallBack = "jsonpCallback84099";
    async.eachSeries(pageNumbers, function (item, callback) {
        //request.get({
        //    url: "http://www.szse.cn/szseWeb/FrontController.szse?ACTIONID=8&CATALOGID=1815_stock_child&txtDm=000002&ENCODE=1&TABKEY=tab1"
        //},
        //function (error, response, body) {
        //    if (!error && response.statusCode == 200) {
        //        Console.log(body);
        //    } else {
        //        console.log(error);
        //    }
        //});
        
        fetch('http://www.szse.cn/szseWeb/FrontController.szse?ACTIONID=8&CATALOGID=1815_stock_child&txtDm=000002&ENCODE=1&TABKEY=tab1')
    .then(function (res) {
            return res.text();
        }).then(function (body) {
                return {status:true,message:'正在抓取'};
                console.log(body);
        });

    }, function (err) {
        if (err) {
            console.log('sz股票信息抓取错误：' + err);
        }
        console.log("sz股票信息抓取完毕");
        return { status: false, message: '出错了' };
    });
}







