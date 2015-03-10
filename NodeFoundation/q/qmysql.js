//npm install q
//http://www.ghostchina.com/promises-in-node-js-with-q-an-alternative-to-callbacks/
//q的教程
var Q = require('q');
var mysql = require('./mysqldb');

function getData() {
    var deferred = Q.defer();
    mysql.exec("SELECT * FROM JDCategory", [], function(err, r) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(r);
        }
    });
    return deferred.promise;
}




for (var i = 0; i < 2; i++) {
    getData().then(function(data) {
        console.log(data.length);
    }, function(error) {
        console.log(error);
    });
}