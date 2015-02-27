//CREATE TABLE "t1" ("Id" BLOB PRIMARY KEY  NOT NULL , "Name" TEXT)
var uuid = require('node-uuid');
var db = require('./db');
console.log(uuid.v1());
db.insertUUID(uuid.v1(), "测试");