var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ecsentry.sqlite');
var crypto = require('crypto');

//db.serialize(function () {
//    db.each("SELECT * FROM Product", function (err, row) {
//        console.log(row.Id + ": " + row.Name);
//    });
//});

function insert(thirdPartySku, source,name,price, listImage, category, images, remark) {
    db.run("insert into product(ThirdPartySku,Source,Name,Price,ListImage,Category,Images,Remark) VALUES (?,?,?,?,?,?,?,?)", thirdPartySku, source,name, price, listImage,category, images, remark);
}

function insertProductNew(guid,thirdPartySku, source, name, price, listImage, category, images, remark) {
    db.run("insert into productnew(Id,ThirdPartySku,Source,Name,Price,ListImage,Category,Images,Remark) VALUES (?,?,?,?,?,?,?,?,?)",guid, thirdPartySku, source, name, price, listImage, category, images, remark);
}

function insertJDCategory(channel,href,category,categoryUrl,item,itemUrl,pageInfo) {
    db.run("insert into JDCategoryNew(Channel,Href,Category,CategoryUrl,Item,ItemUrl,PageInfo) VALUES (?,?,?,?,?,?,?)", channel, href, category, categoryUrl, item, itemUrl, pageInfo);
}

function replaceIntoProductNew(guid, thirdPartySku, source, name, price, listImage, category, images, remark) {
    db.all("select * from productnew where ThirdPartySku='" + thirdPartySku + "'",function(err,rows) {
        if (rows.length == 0) {
            db.run("insert INTO productnew(Id,ThirdPartySku,Source,Name,Price,ListImage,Category,Images,Remark) VALUES (?,?,?,?,?,?,?,?,?)", guid, thirdPartySku, source, name, price, listImage, category, images, remark);
        }
    });
    
}

function updateJDCategoryNew(id,spiderPageIndex) {
    try {
        db.run("update JDCategoryNew set SpiderPageIndex=? where id=?", spiderPageIndex, id);
    } catch (e) {

    }
}

function insertCaoliuList(id, title, href,call) {
    
    
    db.all("SELECT * FROM CaoliuList where id='" + id + "'", function (err, rows) {
        if (rows.length == 0) {
            try {
                db.run("insert into CaoliuList(id,title,href) VALUES (?,?,?)", id, title, href);
                call();
            } catch (e) {

            }
        }
    });
    
}

function updateCaoliu(id, image) {
    
            try {
                db.run("update CaoliuList set image=? where id=?", image,id);
            } catch (e) {

            }
    };
    

function insertCaoliu(id, title, href,callback) {
    
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

var rowCount = 0;
function exist(url,callback) {
    db.each("SELECT count(1) as Total FROM JDCategoryNew where ItemUrl='"+url+"'", function (err, row) {
        if (row.Total == 0) {
            callback();
        }
    });
}

function existCaoLiu(id, callback) {
    db.each("SELECT count(1) as Total FROM caoliulist where Id='" + id + "'", function (err, row) {
        console.log("命中不了");
            callback(row);
    });
}

function getList(callback,object) {
    db.each("SELECT * FROM JDCategoryNew where pageinfo!='' limit 0,2", function (err, row) {
        
        callback(row);
        // where PageInfo!='' and channel='家用电器' limit 0,10
    });
    object.run();
}

function getCaoLiu(callback, object) {
    db.all("SELECT * FROM Caoliulist", function (err, row) {
        
        callback(row);
        
    });
    object.run();
}


function getAll(id,callback) {
    
    db.all("SELECT * FROM JDCategory where id='"+id+"'", function (err, rows) {
        closeDb();
        callback(err, rows); 
    });
   
}

function getAllByCondition(callback) {
    
    db.all("SELECT * FROM JDCategoryNew where pageInfo!='' and spiderflag=1 and pageinfo!=spiderpageindex", function (err, rows) {
        //closeDb();
        callback(err, rows);
    });
   
}

function getRowCount() {
    return rowCount;
}

function getId() {
    return Id;
}
function getSku() {
    return Sku;
}
function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};
//http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
exports.md5 = md5;
exports.getAll = getAll;
exports.getAllByCondition = getAllByCondition;
exports.getList = getList;
exports.getCaoLiu = getCaoLiu;
exports.updateCaoliu = updateCaoliu;
exports.insert = insert;
exports.insertProductNew = insertProductNew;
exports.replaceIntoProductNew = replaceIntoProductNew;
exports.updateJDCategoryNew = updateJDCategoryNew;
exports.insertJDCategory = insertJDCategory;
exports.insertCaoliuList = insertCaoliuList;
exports.exist = exist;
exports.existCaoLiu = existCaoLiu;
exports.run = run;
exports.closeDb = closeDb;
exports.getId = getId;
exports.getSku = getSku;
exports.guid = guid;