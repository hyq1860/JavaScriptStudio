/*
 * 上海股票行业抓取
 * http://www.sse.com.cn/assortment/stock/list/trade/
 * 
 * http://query.sse.com.cn/security/stock/queryIndustryIndex.do?jsonCallBack=jsonpCallback72093006&csrcCode=B&_=1440340101274
 * */


//http://table.finance.yahoo.com/table.csv?a=0&b=1&c=2012&d=3&e=19&f=2012&s=600000.ss

//var async = require('async');
var request = require('request');
//var qs = require('querystring');
//var iconv = require('iconv-lite');
//var cheerio = require('cheerio');
var mysqldao = require('./mysqldao');
var async = require('async');

var industries = [];
industries.push("A");
industries.push("B");
industries.push("C");
industries.push("D");
industries.push("E");
industries.push("F");
industries.push("G");
industries.push("H");
industries.push("I");
industries.push("J");
industries.push("K");
industries.push("L");
industries.push("M");
industries.push("N");
industries.push("O");
industries.push("P");
industries.push("Q");
industries.push("R");
industries.push("S");
var jsonCallBack = "jsonpCallback72093006";
async.eachSeries(industries, function (item, callback) {
    var options = {
        url: "http://query.sse.com.cn/security/stock/queryIndustryIndex.do?jsonCallBack=jsonpCallback72093006&csrcCode="+ item+"&_=1440340101274",
        headers: {
            'Accept': 'application / javascript, */*;q=0.8',
            'Referer': 'http://www.sse.com.cn/assortment/stock/list/trade/',
            'Accept-Language': 'zh-Hans-CN,zh-Hans;q=0.8,en-US;q=0.5,en;q=0.3',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'Keep-Alive',
            'DNT': '1',
            'Host': 'query.sse.com.cn'
        }
    };
    
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = body.replace(jsonCallBack + "(", "");
            body = body.substr(0, body.length - 1);
            var info = JSON.parse(body);
            var stocks = [];
            for (var i = 0; i < info.result.length; i++) {
                var stock = [];
                stock[0] = info.result[i].companycode;
                stock[1] = null;
                stock[2] = info.result[i].fullname;
                stock[3] = 'ss';
                stock[4] = info.result[i].csrcCodeDesc;
                stock[5] = null;
                
                stocks.push(stock);
            }
            
            mysqldao.addStocks(stocks, "ss", callback);
        } else {
            callback();
        }
        
    });
}, function(err) {
    if (err) {
        console.log('sz股票信息行业抓取错误：' + err);
    }
    console.log("sz股票信息行业抓取完毕");
});