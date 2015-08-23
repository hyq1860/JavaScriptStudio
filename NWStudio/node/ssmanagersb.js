/*
 * http://query.sse.com.cn/commonQuery.do?jsonCallBack=jsonpCallback27815&isPagination=true&sqlId=COMMON_SSE_XXPL_CXJL_SSGSGFBDQK_S&COMPANY_CODE=&NAME=&BEGIN_DATE=&END_DATE=&pageHelp.pageSize=100&pageHelp.cacheSize=5&_=1440345081207
 * 
 * */
//http://www.sse.com.cn/disclosure/listedinfo/credibility/change/
var async = require('async');
var request = require('request');
var qs = require('querystring');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var mysqldao = require('./mysqldao');
var pageNumbers = [];
for (var i = 1; i <= 173; i++) {
    pageNumbers.push(i);
}

request.post({
        url: 'http://query.sse.com.cn/commonQuery.do?jsonCallBack=jsonpCallback84099&isPagination=true&sqlId=COMMON_SSE_XXPL_CXJL_SSGSGFBDQK_S&pageHelp.pageSize=15&pageHelp.cacheSize=5&pageHelp.pageNo=1&pageHelp.beginPage=1&pageHelp.endPage=5&_=1440344680406',
        encoding: null,
        headers: {
            'Accept': 'application / javascript, */*;q=0.8',
            'Referer': 'http://www.sse.com.cn/disclosure/listedinfo/credibility/change/',
            'Accept-Language': 'zh-Hans-CN,zh-Hans;q=0.8,en-US;q=0.5,en;q=0.3',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'Keep-Alive',
            'DNT': '1',
            'Host': 'query.sse.com.cn'
        }
    },
    function (error, response, body) {
    console.log(response);
    console.log(body);
    console.log(error);
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    });

var async = require('async');
//async.eachSeries(pageNumbers, function (item, callback) {
    


    
//}, function (err) {
//    if (err) {
//        console.log('sz股票信息抓取错误：' + err);
//    }
//    console.log("sz股票信息抓取完毕");
//});
