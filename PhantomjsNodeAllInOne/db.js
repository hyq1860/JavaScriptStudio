var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ecsentry.sqlite');

//db.serialize(function () {
//    db.each("SELECT * FROM Product", function (err, row) {
//        console.log(row.Id + ": " + row.Name);
//    });
//});

function insert(id, thirdPartySku, source,name,price,images) {
    db.run("insert into product(Id,ThirdPartySku,Source,Name,Price,images) VALUES (?,?,?,?,?,?)", id, thirdPartySku, source,name, price, images);
}
function closeDb() {
    db.close();
}

var Id = 0;
var Sku = 0;
function run(callback) {
    db.each("SELECT max(Id) as Id,ThirdPartySku FROM product", function (err, row) {
        Id = row.Id;
        Sku = row.ThirdPartySku;
        //console.log(maxId);
        callback();
    });
}

function getId() {
    return Id;
}
function getSku() {
    return Sku;
}
exports.insert = insert;
exports.run = run;
exports.closeDb = closeDb;
exports.getId = getId;
exports.getSku = getSku;