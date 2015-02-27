//https://github.com/broofa/node-uuid

//http://fred-zone.blogspot.com/2012/01/nodejs-mongodb.html nodejs mongodb uuid
var uuid = require('node-uuid');
var debug = require('debug')('uuid');
// Generate a v1 (time-based) id
var uuid1 = uuid.v1();
var uuid2 = uuid.v1();
var uuid3 = uuid.v1({ node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab] });
var uuid4 = uuid.v1({ node: [0, 0, 0, 0, 0, 0] });
//// Generate a v4 (random) id
var uuid5 = uuid.v4();
var uuid6 = uuid.v4();
debug(uuid1);
debug(uuid2);
debug(uuid3);
debug(uuid4);
debug(uuid5);
debug(uuid6);