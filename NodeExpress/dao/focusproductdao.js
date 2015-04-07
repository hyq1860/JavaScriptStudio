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

//获取用户关注商品
module.exports.getFocusProductsByUserId = function (userId) {
    var deferred = Q.defer();
    mysql.exec("select * from focusproduct fp INNER JOIN product p on fp.Sku=p.Sku where fp.UserId=?", [userId], function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(result);
        }
    }, true);
    return deferred.promise;
}

//