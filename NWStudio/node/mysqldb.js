var mysql = require('mysql');
//var debug = require('debug')('mysaldb');
var username = 'root';
var password = '123qwe';
var db_host = '127.0.0.1';
var db_port = 3306;
var db_name = 'stockdatabase';
var option = {
    host: db_host,
    port: db_port,
    user: username,
    password: password,
    database: db_name
};

/*连接池*/
var pool = mysql.createPool({
    //connectionLimit : 10,
    host: db_host,  
    user: username,  
    password: password,  
    database: db_name,  
    port: db_port
}); 
/*连接池*/

function _exec(sqls, values,after,usePool) {
    if (!usePool) {
        var client = mysql.createConnection(option);

        client.connect(function(err) {
            if (err) {

                console.log(err);
                return;
            }

            client.query(sqls || '', values || [], function(err1, r) {
                after(err1, r);
            });
            client.end();

        });

        client.on('error', function(err) {
            if (err.errno != 'ECONNRESET') {
                after("err01", false);
                throw err;
            } else {
                after("err02", false);
            }
        });
    } else {
        pool.getConnection(function (err, conn) {
            if (err) {
                //debug("mysql pool:"+err);
                after(err, null);
            } else {
                if (conn === undefined || conn == null) {
                    //debug("mysql conn is undefined or null");
                } else {
                    conn.query(sqls || '', values || [], function (err1, r) {
                        //释放连接  
                        pool.releaseConnection(conn);
                        //conn.release();
                        //事件驱动回调  
                        after(null, r);
                    });
                }
                
                
            }
        });  
    }

}


exports.exec = _exec;