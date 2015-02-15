var sqlite3 = require('sqlite3').verbose();


function InsertWithTransaction(count) {
    //添加的表行数
    var rowCount = count;
    var db = new sqlite3.Database('sqlite.sqlite');
    db.serialize(function () {
        db.run("BEGIN");
        var stmt1 = db.prepare("Insert Into Product(Sku,Name,Price,Images) VALUES (?, ?, ?, ?)");
        //var stmt2= db.prepare("InsertInto ProductPrice([Id], [Price]) VALUES (?, ?)");
        for (var i = 0; i < rowCount; i++) {
            var sku = i;
            var name = "商品名称新品首发大促销便宜实惠"+i;
            var price = GetRandomNum(1,10000);
            stmt1.run(sku, name, price, "http://img12.360buyimg.com/n0/jfs/t430/237/86689205/76176/27430b2d/54092d36N4d80b0ec.jpg");
            //stmt2.run(id, price);
        }
        stmt1.finalize();
        
    });
    db.run("COMMIT");
    getCount();
    db.close();
    
}

function getCount() {
    var db = new sqlite3.Database('sqlite.sqlite');
    db.each("SELECT max(Id) as Id FROM product", function (err, row) {
        console.log("数据一共" + row.Id + "条");
    });
}

function getData() {
    var db = new sqlite3.Database('sqlite.sqlite');
    db.each("SELECT * FROM product where id=100000", function (err, row) {
        console.log(row);
    });
}

function GetRandomNum(min, max) {
    var range = max - min;
    var rand = Math.random();
    return (min + Math.round(rand * range));
}

getData();
//var count = 0;
//var async = require('async');
//async.forever(
//function (cb) {
//    InsertWithTransaction(100000);
    
//    setTimeout(cb, 500);
//},
//function (err) {
//    if (err) {
//        console.log('error: ', err);
//    }
//    console.log("插入成功");
//}
//);