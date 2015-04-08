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

//更新商品价格
module.exports.addPriceHistory = function(pricehistories) {
    var deferred = Q.defer();
    var sql = "";
    if (pricehistories == null || pricehistories == undefined || pricehistories.length == 0) {
        deferred.reject("参数pricehistories有误");
    } else {
        for (var i = 0; i < pricehistories.length; i++) {
            sql += "INSERT INTO pricehistory(logicid, sku, price) SELECT '" + pricehistories[i].LogicId + "', '" + pricehistories[i].Sku + "', " + pricehistories[i].Price + " FROM DUAL WHERE NOT EXISTS(SELECT logicid FROM pricehistory WHERE logicid = '" + pricehistories[i].LogicId + "' and Price=" + pricehistories[i].Price + ");";
        }

        mysql.exec(sql, [], function(error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }
        }, true);
    }


    return deferred.promise;
};