var mysql = require('./mysqldb');
var Q = require('q');

var moment = require('moment');
var debug = require('debug')('mysqldao');
var logger = require('../common/log4js').logger('jdgather');
//增加关注商品
module.exports.addFocusProducts = function (focusproducts) {
    var deferred = Q.defer();
    mysql.exec("insert INTO focusproduct(UserId,Sku,ECId,InDate,Flag) VALUES ? ON DUPLICATE KEY UPDATE InDate = VALUES(InDate)", [focusproducts], function (error, result) {
        if (error) {
            logger.error(JSON.stringify(focusproducts));
            deferred.reject(error);
        } else {
            deferred.resolve(result);
        }
    },true);
    return deferred.promise;
}