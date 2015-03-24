var http = require('http');
var url = require('url').parse('http://www.ip138.com/');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

http.get(url, function (res) {
    var bufferHelper = new BufferHelper();
    res.on('data', function (chunk) {
        bufferHelper.concat(chunk);
    });
    res.on('end', function () {
        console.log(iconv.decode(bufferHelper.toBuffer(), 'GBK'));
    });
})