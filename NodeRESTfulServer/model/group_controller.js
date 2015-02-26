var Group = require('./group').group;
var sqlite3 = require('sqlite3').verbose();

function group_dao(){
    //创建数据库连接
    var db = new sqlite3.Database('ecsentry.sqlite');
	
    this.getList = function (id,callback){
        var groups = [];
        //"SELECT * FROM JDCategory where id='" + id + "'"
        db.all("SELECT * FROM JDCategory limit 0,10", function (err, rows) {
            
            for (var i = 0; i < rows.length; i++) {
                var group = new Group(rows[i].Id, rows[i].Item, rows[i].Item, rows[i].ItemUrl);
                groups.push(group);
            }

            callback(groups);
            db.close();
        });
				
		
	};
	
}

exports.dao = group_dao;
