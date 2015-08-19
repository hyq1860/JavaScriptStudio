
//http://table.finance.yahoo.com/table.csv?a=0&b=1&c=2012&d=3&e=19&f=2012&s=600000.ss

var async = require('async');
var request = require('request');
var qs = require('querystring');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');

//Date,Open,High,Low,Close,Volume,Adj Close
//上海 ss  深证sz

var options = {
    url: 'http://query.sse.com.cn/commonQuery.do?isPagination=true&sqlId=COMMON_SSE_ZQPZ_GPLB_MCJS_SSAG_L&pageHelp.pageSize=500&pageHelp.pageNo=1&pageHelp.beginPage=1&pageHelp.endPage=50&_=1429435777477',
    headers: {
        'Accept': 'application / javascript, */*;q=0.8',
'Referer': 'http://www.sse.com.cn/assortment/stock/list/name/',
'Accept-Language': 'zh-Hans-CN,zh-Hans;q=0.8,en-US;q=0.5,en;q=0.3',
'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
'Accept-Encoding': 'gzip, deflate',
'Connection': 'Keep-Alive',
'DNT': '1',
'Host': 'query.sse.com.cn'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.pageHelp.data.length);
        //console.log(info.forks_count + " Forks");
    }
}

request(options, callback);

/*
request.get({
    url: "http://query.sse.com.cn/commonQuery.do?jsonCallBack=jsonpCallback73647&isPagination=true&sqlId=COMMON_SSE_ZQPZ_GPLB_MCJS_SSAG_L&pageHelp.pageSize=50&pageHelp.pageNo=1&pageHelp.beginPage=1&pageHelp.endPage=50&_=1429435777477",
    encoding: null //让body 直接是buffer
}, function(err, response, body) {
    if (!err) {
        var html = iconv.decode(body, 'utf-8');

        var lines = html.split('\n');
        for (var i = 0; i < lines.length; i++) {
            console.log(lines[i]);
        }
    } else {
        console.log(err);
    }

    //console.log(html);

});
*/
