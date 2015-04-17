//spider先关路由
//http://melon.github.io/blog/2014/12/08/nodejs-agent-and-size-limit-of-get-method/
var request = require('request');
var iconv = require('iconv-lite');
var stockdao = require('../dao/stockdao');
var debug = require('debug')('stock');
module.exports = function (app) {
    app.get('/stock/:stock', function(req, res) {
        var stockNumber = req.params.stock;
        request.get({
            url: "http://table.finance.yahoo.com/table.csv?s="+ stockNumber+".sz",
            encoding: null, //让body 直接是buffer,
            timeout: 400000
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

                stockdao.addStocks(stocks).then(function (data) {
                    res.json({success:true});
                });
            } else {
                res.end(err.code);
            }

        });

        


    });
};

