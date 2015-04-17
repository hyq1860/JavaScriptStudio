var mysql = require('./mysqldb');
var Q = require('q');
//var async = require('async');
var moment = require('moment');
var debug = require('debug')('proxydao');
var logger = require('../common/log4js').logger('jdgather');



//股票
module.exports.addStocks = function (stocks) {
    var deferred = Q.defer();
    if (stocks === undefined) {
        var error = 'Stocks undefined';
        debug(error);
        deferred.reject(error);
    } else {
        mysql.exec("insert INTO StockHistory(StockNumber,Date,Open,High,Low,Close,Volume,AdjClose) VALUES ?", [stocks], function (error, r) {
            if (error) {
                debug(error);
                deferred.reject(error);
            } else {
                deferred.resolve(data);
            }
        }, true);
    }

    return deferred.promise;
    
}