var mysql = require('./mysqldb');
var Q = require('q');
//var async = require('async');
var moment = require('moment');
var debug = require('debug')('proxydao');
var logger = require('../common/log4js').logger('jdgather');

//获取代理站点信息
module.exports.getProxySites=function() {
    var deferred = Q.defer();
    // and PageInfo!=SpiderPageIndex
    mysql.exec("SELECT * FROM proxysite where canuse=1", [], function (err, data) {
        if (err) {
            debug(err);
            logger.error(err);
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    }, true);
    return deferred.promise;
}


//获取代理站点网页信息
module.exports.getProxySiteHtml = function () {
    var deferred = Q.defer();
    // and PageInfo!=SpiderPageIndex
    mysql.exec("select Id,Site,Url,Html from proxysite t1 left JOIN proxysource t2 on t1.Id=t2.ProxySiteId where t1.CanUse=1", [], function (err, data) {
        if (err) {
            debug(err);
            logger.error(err);
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    }, true);
    return deferred.promise;
}



//存在即更新 不存在添加
module.exports.saveProxySource = function (proxysource,callback) {
    mysql.exec("insert into proxysource(ProxySiteId,Url,Html,InDate,EditDate) values(?,?,?,?,?) ON DUPLICATE KEY UPDATE Html = VALUES(Html)", [proxysource.ProxySiteId, proxysource.Url, proxysource.Html, proxysource.InDate, proxysource.EditDate], function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

//代理
module.exports.addProxys = function (proxys, callback) {
    if (proxys === undefined) {
        var error = 'proxys undefined';
        debug(error);
        callback(error);
    } else {
        mysql.exec("insert INTO proxy(IP,Port,Anonymous,Type,Speed,Flag,InDate,EditDate) VALUES ? ON DUPLICATE KEY UPDATE EditDate = VALUES(InDate)", [proxys], function (e2, r) {
            if (e2) {
                logger.error(JSON.stringify(proxys));
                debug(e2);
                callback(e2);
            } else {
                callback();
            }
        });
    }
    
}

//获取要采集的分类
module.exports.getProxys = function () {
    var deferred = Q.defer();
    // and PageInfo!=SpiderPageIndex
    mysql.exec("SELECT * FROM proxy where flag=1 ORDER BY rand() LIMIT 50", [], function (err, data) {
        if (err) {
            debug(err);
            logger.error(err);
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    }, true);
    return deferred.promise;
}

//修改失效的代理
module.exports.updateProxy = function (params) {
    var deferred = Q.defer();
    mysql.exec("update proxy set flag=? where ip=? and port=?", [params.flag, params.ip, params.port, params.type], function (err, data) {
        if (err) {
            debug(err);
            logger.error(err);
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    }, true);
    return deferred.promise;
}

/*
mysql.exec("select * from ec where id=?", ['3'], function(err,r) {
    if (err) {
        console.log(err);
    } else {
        if (r.length == 0) {
            mysql.exec("insert into ec(id,name) values(?,?)", ['3','womai'], function(err1, r1) {

            });
        }
    }
});

 */

/*批量插入
var sql = "INSERT INTO Test (name, email, n) VALUES ?";
var values = [
    ['demian', 'demian@gmail.com', 1],
    ['john', 'john@gmail.com', 2],
    ['mark', 'mark@gmail.com', 3],
    ['pete', 'pete@gmail.com', 4]
];
conn.query(sql, [values], function(err) {
    if (err) throw err;
    conn.end();
});
 */