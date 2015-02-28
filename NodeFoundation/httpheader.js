var http = require('http');
var server = http.createServer(function(req, res) {
    var body = JSON.stringify(req.headers) + '\n' + Object.keys(req.headers);
    res.end(body);
}).listen(3000);


var getfn = function (path, cb) {
    var request = http.request({
        host: '192.168.1.220',
        port: 3000,
        path: '/' + path,
        method: 'GET',
        headers: {
            'Accept': 'text/html',
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Content-Length': '19',
            'User-Agent': 'node.js-v0.8.8', 
            'cookie': 'userid=123456; mycookie2=abcdefg', 
            'X-Requested-With': 'xmlhttprequest',
            'Connection': 'keep-alive',
            'Referer': 'http://www.cnodejs.org/'
        }
    }, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            // convert chunk to utf8 text:
            body += chunk;
      // process utf8 text chunk
        });
        res.on('end', function () {
            cb(res, body);
        });
    }).on('err', function (e) {
        throw e;
    });
    request.end();
}

getfn('/', function (res, body) {
    console.log(body)
});