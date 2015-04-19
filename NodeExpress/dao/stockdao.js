var mysql = require('./mysqldb');
var Q = require('q');
//var async = require('async');
var moment = require('moment');
var debug = require('debug')('proxydao');
var logger = require('../common/log4js').logger('jdgather');


//获取股票编码
module.exports.gatherStocks = function (stocks,market) {
    var deferred = Q.defer();
    if (stocks === undefined) {
        var error = 'Stocks undefined';
        debug(error);
        deferred.reject(error);
    } else {
        var sql1 = "delete from Stock where StockMarket=\'" + market+"\'";
        mysql.exec(sql1, [stocks], function (error, data) {
            if (error) {
                debug(error);
                deferred.reject(error);
            } else {
                var sql2 = "insert INTO Stock(StockNumber,StockMarket) VALUES ?";
                mysql.exec(sql2, [stocks], function (error, data) {
                    if (error) {
                        debug(error);
                        deferred.reject(error);
                    } else {
                        deferred.resolve(data);
                    }
                }, true);

            }
        }, true);

        
    }
    
    return deferred.promise;
    
}

//股票
module.exports.addStocks = function(stockId,stocks) {
    var deferred = Q.defer();
    if (stocks === undefined) {
        var error = 'Stocks undefined';
        debug(error);
        deferred.reject(error);
    } else {
        var sql1 = "delete from StockHistory where StockNumber = " + stockId;
        mysql.exec(sql1, [stocks], function (error, data) {
            if (error) {
                debug(error);
                deferred.reject(error);
            } else {
                var sql2 = "insert INTO StockHistory(StockNumber,Date,Open,High,Low,Close,Volume,AdjClose) VALUES ?";
                mysql.exec(sql2, [stocks], function (error, data) {
                    if (error) {
                        debug(error);
                        deferred.reject(error);
                    } else {
                        deferred.resolve(data);
                    }
                }, true);

            }
        }, true);

        
    }

    return deferred.promise;
    
}

//获取股票的时间

//获取股票的值
module.exports.getDetails = function(stockId) {
    var deferred = Q.defer();

    var sql1 = "select date from stockhistory where StockNumber = ? order by Date asc";
    mysql.exec(sql1, [stockId], function(error, data1) {
        if (error) {
            debug(error);
            deferred.reject(error);
        } else {
            var sql2 = "select Open,High,Low,Close,Volume,AdjClose from stockhistory where StockNumber=? order by Date asc";
            mysql.exec(sql2, [stockId], function(error, data2) {
                if (error) {
                    debug(error);
                    deferred.reject(error);
                } else {
                    //debug({ date: data1, data: data2 });
                    deferred.resolve({ date: data1, data: data2 });
                }
            }, true);

        }
    }, true);


    return deferred.promise;

};