//nodejs-debug 别名 随便写
var debug = require('debug')('nodejs-debug');

setInterval(function () {
    debug('doing some work');
    debug('doing some work%',"123456");
}, 1000);