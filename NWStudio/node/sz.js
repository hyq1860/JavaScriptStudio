
//http://table.finance.yahoo.com/table.csv?a=0&b=1&c=2012&d=3&e=19&f=2012&s=600000.ss

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

var async = require('async');
async.eachSeries(pageNumbers, function (item, callback) {
    
    request.post({
        url: 'http://www.szse.cn/szseWeb/FrontController.szse?randnum=0.8981524095694041',
        encoding: null,
        form: {
            ACTIONID: "7",
            AJAX: "AJAX - TRUE",
            CATALOGID: "1110",
            REPORT_ACTION: "navigate",
            TABKEY: "tab1",
            tab1PAGECOUNT: "1653",
            tab1PAGENUM: item,
            tab1RECORDCOUNT: "1653"
        }
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var html = iconv.decode(body, 'gb2312');
            var $ = cheerio.load(html);
            var trs = $("#REPORTID_tab1").find('.cls-data-tr');
            var stocks = [];
            trs.each(function() {
                var tr = $(this);
                var tds = tr.find("td");
                var stock = [];
                tds.each(function(index, item) {
                    var td = $(item);
                    if (index == 0) {
                        stock[0]=td.text();
                    }
                    if (index == 1) {
                        stock[1] = td.text();
                    }
                    if (index == 2) {
                        stock[2] = td.text();
                    }
                    if (index == 3) {
                        stock[4] = td.text();
                    }
                    if (index == 4) {
                        stock[5] = td.text();
                    }
                    stock[3] = "sz";
                });
                
                stocks.push(stock);
            });
            mysqldao.addStocks(stocks, "sz", callback);
        } else {
            callback();
        }
    });

    
}, function (err) {
    if (err) {
        console.log('sz股票信息抓取错误：' + err);
    }
    console.log("sz股票信息抓取完毕");
});




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
