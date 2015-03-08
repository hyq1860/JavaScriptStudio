var mysql = require('./mysqldb');

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