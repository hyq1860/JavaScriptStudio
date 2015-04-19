//spider先关路由
//http://melon.github.io/blog/2014/12/08/nodejs-agent-and-size-limit-of-get-method/
var request = require('request');
var iconv = require('iconv-lite');
var stockdao = require('../dao/stockdao');
var debug = require('debug')('stock');
var underscore = require("underscore")._;
module.exports = function (app) {
    app.get('/stock/:stock', function(req, res) {
        var stockNumber = req.params.stock;
        request("http://table.finance.yahoo.com/table.csv?s="+ stockNumber+".sz", {
            encoding: null, //让body 直接是buffer,
            timeout: 400000,
            pool: { maxSockets: 10 },
            method:'post'
        }, function(err, response, body) {
            if (!err) {
                var html = iconv.decode(body, 'utf-8');
                var stocks = [];
                var lines = html.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i] != "" && i != 0) {
                        var data = lines[i].split(',');
                        stocks.push([stockNumber, data[0], data[1], data[2], data[3], data[4], data[5], data[6]]);
                    }
                    
                }

                stockdao.addStocks(stockNumber,stocks).then(function (data) {
                    res.json({success:true});
                });
            } else {
                res.end(err.code);
            }

        });

        


    })
    .get('/stock/show/:stock', function (req, res) {
        stockdao.getDetails(req.params.stock).then(function (data1) {

            var dateArray = [];
            var dataArray = [];
            underscore.each(data1.date,function(item,index) {
                dateArray.push(item.date);
            });
            underscore.each(data1.data, function (item, index) {
                //dataArray.push([item.Open, item.High, item.Low, item.Close, item.Volume, item.AdjClose]);
                dataArray.push([item.Open, item.High, item.Low, item.Close]);
            });
            /*
            for (var i = 0; i < 2; i++) {
                dateArray.push(data1.date[i].date);
            }
            
            for (var j = 0; j < 2; i++) {
                var item = data1.data[j];


                dataArray.push([item.Open,item.High,item.Low,item.Close,item.Volume,item.AdjClose]);
            }*/

            res.render('stock',  { datas: { date: dateArray, data: dataArray}  });
             
            //res.render('stock', { datas: { date: data.date.length, data: data.data.length } });
        });
        
    })
    .get('/stock/gather/:type',function(req, res) {
        if (req.params.type == 'ss') {
            request({
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
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    var stocks = [];
                    underscore.each(info.result, function(item,index) {
                        stocks.push([item.PRODUCTID, item.PRODUCTNAME]);
                    });

                    stockdao.gatherStocks(stocks, 'ss').then(function (data) {
                        res.json({ success: true });
                    });
                }
            });
        }
        else if (req.params.type == 'sz') {
            request({
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
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    var stocks = [];
                    underscore.each(info.result, function (item, index) {
                        stocks.push([item.PRODUCTID, item.PRODUCTNAME]);
                    });
                    
                    stockdao.gatherStocks(stocks, 'ss').then(function (data) {
                        res.json({ success: true });
                    });
                }
            });
        }
    });
};

