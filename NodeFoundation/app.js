//node process相关
//http://www.cnblogs.com/softlover/archive/2012/10/03/2707139.html 
process.on('uncaughtException', function (err) {
    　　console.log('Caught exception: ' + err);
});
setTimeout(function () {
    　　console.log('This will still run.');
}, 500);
// Intentionally cause an exception, but don't catch it.
nonexistentFunc();
console.log('This will not run.');

var http = require('http');
var server = http.createServer(function (req, res) {
    　　res.writeHead(200, {});
    　　res.end('response');
    　　badLoggingCall('sent response');
    　　console.log('sent response');
});

server.listen(8080);