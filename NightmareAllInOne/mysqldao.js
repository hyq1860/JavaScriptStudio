var mysql = require('./mysqldb');
var Q = require('q');
//var async = require('async');
var moment = require('moment');
var debug = require('debug')('mysqldao');
//获取要采集的分类
module.exports.getCategory = function () {
    var deferred = Q.defer();
    // and PageInfo!=SpiderPageIndex
    mysql.exec("SELECT * FROM JDCategory where pageInfo!='' and SpiderFlag=1 and PageInfo!=SpiderPageIndex", [], function(err, data) {
        if (err) {
            debug(err);
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

//sku不存在就新增
module.exports.addProduct = function (product) {
    mysql.exec("select count(1) as total from product where Sku=?", [product.thirdPartySku], function(e1,row) {
        if (row.length == 1 && row[0].total == 0) {
            mysql.exec("insert INTO product(LogicId,Sku,Source,Name,Price,InDate,ListImage,Category) VALUES (?,?,?,?,?,?,?,?)", [product.LogicId, product.Sku, product.Source, product.Name, product.Price, moment().format("YYYY-MM-DD HH:mm:SS"), product.ListImage, product.Category ], function(e2, r) {
                if (e2) {
                    debug(e2);
                }
            });
        }
    });
}

//
module.exports.updateJDCategory = function (id, spiderPageIndex) {
    mysql.exec("update JDCategory set SpiderPageIndex=? where Id=?", [spiderPageIndex, id], function(err, r) {
        if (err) {
            debug(err);
        }
    });
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