var mysql = require('./mysqldb');
//var Q = require('q');
//var async = require('async');
//var moment = require('moment');
//var debug = require('debug')('mysqldao');
var logger = require('./log4js').logger('jdgather');


//保存股市数据
module.exports.addStock = function (stock,market,callback) {
    mysql.exec("insert into stock(Id,Name,FullName,Market,Industry,WebSite) values(?,?,?,?,?,?)", [stock.Id,stock.Name,stock.FullName, market, stock.Industry, stock.WebSite], function (err, result) {
        if (err) {
            logger.error(err);
            //console.log(err);
            callback(err);
        }
        callback();
    });
}

module.exports.addStocks = function (stocks, market, callback) {
    mysql.exec("insert into stock VALUES ? ON DUPLICATE KEY UPDATE Industry = VALUES(Industry), WebSite = VALUES(WebSite)", [stocks], function (err, result) {
        if (err) {
            logger.error(err);
            //console.log(err);
            callback(err);
        } else {
            callback();
        }
    });
}




//获取要采集的分类
module.exports.getCategory = function () {
    var deferred = Q.defer();
    // and PageInfo!=SpiderPageIndex
    mysql.exec("SELECT * FROM JDCategory where pageInfo!='' and SpiderFlag=1 and PageInfo!=SpiderPageIndex", [], function(err, data) {
        if (err) {
            debug(err);
            logger.error(err);
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    },true);
    return deferred.promise;
}

//sku不存在就新增
module.exports.addProduct = function (product) {
    mysql.exec("select count(1) as total from product where Sku=?", [product.thirdPartySku], function(e1,row) {
        if (row.length == 1 && row[0].total == 0) {
            mysql.exec("insert INTO product(LogicId,Sku,Source,Name,Price,InDate,ListImage,Category) VALUES (?,?,?,?,?,?,?,?)", [product.LogicId, product.Sku, product.Source, product.Name, product.Price, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), product.ListImage, product.Category ], function(e2, r) {
                if (e2) {
                    logger.error(e2);
                    debug(e2);
                }
            });
        }
    });
}

//sku不存在就新增
module.exports.addProducts = function (products) {

    mysql.exec("insert INTO product(LogicId,Sku,Source,Name,Price,InDate,ListImage,Category) VALUES ? ON DUPLICATE KEY UPDATE Price = VALUES(Price), Name = VALUES(Name)", [products], function(e2, r) {
        if (e2) {
            logger.error(JSON.stringify(products));
            debug(e2);
        }
    });

}


//
module.exports.updateJDCategory = function (id, spiderPageIndex) {
    mysql.exec("update JDCategory set SpiderPageIndex=? where Id=?", [spiderPageIndex, id], function(err, r) {
        if (err) {
            //logger.error(err);
            debug(err);
        }
    });
}
module.exports.updateJDCategoryTask = function () {
    mysql.exec("select Id from jdcategory where SpiderFlag=0 and channel!='图书|音像|电子书刊' limit 1", [], function (err, r) {
        if (err) {
            //logger.error(err);
            debug(err);
        } else {
            mysql.exec("update JDCategory set SpiderPageIndex=0,SpiderFlag=1 where Id=?", [r[0].Id], function(e1, r1) {
                if (r1) {
                    console.log(r1);
                }
            });
        }
    });
}

module.exports.saveHtml=function(html) {
    mysql.exec("insert into html(Url,Source,Type,Content,InDate) values(?,?,?,?,?) ON DUPLICATE KEY UPDATE Content = VALUES(Content)", [html.Url, html.Source,html.Type, html.Content,html.InDate], function(err,result) {
        if (err) {
            logger.error(err);
        }
    });
}

module.exports.getListHtml = function (url) {
    var deferred = Q.defer();
    mysql.exec("select * from html where url=?", [url], function(err, r) {
        if (err) {
            logger.error(err);
            deferred.reject(err);
        } else {
            deferred.resolve(r);
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