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
for (var i = 1; i <= 736; i++) {
    pageNumbers.push(i);
}

var jsonCallBack = "jsonpCallback84099";
async.eachSeries(pageNumbers, function(item, callback) {
    request.get({
            url: "http://query.sse.com.cn/commonQuery.do?jsonCallBack=jsonpCallback84099&isPagination=true&sqlId=COMMON_SSE_XXPL_CXJL_SSGSGFBDQK_S&pageHelp.pageSize=15&pageHelp.cacheSize=5&pageHelp.pageNo=" + item + "&pageHelp.beginPage=1&pageHelp.endPage=5&_=1440344680406",
            headers: {
                'Accept': 'application / javascript, */*;q=0.8',
                'Referer': 'http://www.sse.com.cn/disclosure/listedinfo/credibility/change/',
                'Accept-Language': 'zh-Hans-CN,zh-Hans;q=0.8,en-US;q=0.5,en;q=0.3',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'Keep-Alive',
                'DNT': '1',
                'Host': 'query.sse.com.cn',
                'Content-type': 'application/json'
            }
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = body.replace(jsonCallBack + "(", "");
                body = body.substr(0, body.length - 1);
                var info = JSON.parse(body);
                var sbs = [];
                var datas = info.pageHelp.data;
                for (var i = 0; i < datas.length; i++) {

                var sb = [];
                    sb[0] = 0;
                    sb[1] = datas[i].COMPANY_CODE;
                    sb[2] = datas[i].COMPANY_ABBR;
                    sb[3] = datas[i].NAME;
                    sb[4] = datas[i].DUTY;
                    sb[5] = datas[i].STOCK_TYPE;
                    sb[6] = datas[i].CURRENCY_TYPE;
                    sb[7] = datas[i].CURRENT_NUM;
                    sb[8] = datas[i].CHANGE_NUM;
                    sb[9] = datas[i].CURRENT_AVG_PRICE;
                    sb[10] = datas[i].HOLDSTOCK_NUM;
                    sb[11] = datas[i].CHANGE_REASON;
                    sb[12] = datas[i].CHANGE_DATE;
                    sb[13] = datas[i].FORM_DATE;
                    sbs.push(sb);
                }
                mysqldao.addManagerSB(sbs, callback);
            } else {
                console.log(error);
                callback();
            }
        });

}, function(err) {
    if (err) {
        console.log('sz股票信息抓取错误：' + err);
    }
    console.log("sz股票信息抓取完毕");
});





