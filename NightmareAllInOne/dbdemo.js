
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ecsentry.sqlite');
var check;
db.serialize(function () {
    
    db.run("CREATE TABLE if not exists user_info (id TEXT,value TEXT)");
    var stmt = db.prepare("INSERT INTO user_info VALUES (?,?)");
    for (var i = 0; i < 10; i++) {
        stmt.run([i,i]);
    }
    stmt.finalize();
    
    db.each("SELECT id,value FROM user_info", function (err, row) {
        console.log(row.id + ": " + row.value);
    });
});




var columns = [];
for (var i = 0; i < 10; i++) {
    columns.push('id' + i);
}
db.run("CREATE TABLE if not exists Test1(" + columns + ")",function() {
    for (var i = 0; i < 1000; i++) {
        for (var values = [], j = 0; j < columns.length; j++) {
            values.push(i * j);
        }
        db.run("INSERT INTO Test1 VALUES (" + values + ")");
    }
});


db.close();

/*
db.all("SELECT * from blah blah blah where this=" + that, function (err, rows) {

});


db.run("INSERT into table_name(col1,col2,col3) VALUES (val1,val2,val3)");


db.run("DELETE * from table_name where condition");


db.run("UPDATE table_name where condition");
*/