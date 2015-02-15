//  server.js  
var config = require('./common/config');
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var FServer = require('./server/FServer');
function index() {
    var indexPath = config.ui + '/index.html';
    fs.exists(indexPath, function(exists) {
        if (!exists) {
            throw err;
        } else {
            fs.readFile(indexPath, function(err, data) {
                if (err) {
                    throw err;
                } else {
                    function onRequest(req, res) {
                        // 取得文件路径  
                        var pathname = url.parse(req.url).pathname;
                        // 获取文件扩展名(包含前置.)  
                        var extname = path.extname(pathname);
                        var type = extname.slice(1);
                        // 获取下载文件在磁盘上的路径，  
                        var realPath = config.root + pathname;
                        if (extname === '') {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(data);
                            res.end();
                        } else {
                            FServer.filesLoad(realPath, type, req, res);
                        }
                    }

                    http.createServer(onRequest).listen(config.port);
                }
            });
        }
    });
}
exports.index = index;

// FServer.js  
var fs = require('fs');
function filesLoad(filePath, type, req, res) {
    fs.exists(filePath, function (exists) {
        if (!exists) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            // res.write();  
            res.end();
        } else {
            fs.readFile(filePath, 'binary', function (err, file) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    // res.write();  
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': mime[type] });
                    res.write(file, 'binary');
                    res.end();
                }
            });
        }
    })
}
exports.filesLoad = filesLoad;

var mine= {
    "html" : "text/html",
    "css"  : "text/css",
    "js"   : "text/javascript",
    "json" : "application/json",
    "ico"  : "image/x-icon",
    "gif"  : "image/gif",
    "jpeg" : "image/jpeg",
    "jpg"  : "image/jpeg",
    "png"  : "image/png",
    "pdf"  : "application/pdf",
    "svg"  : "image/svg+xml",
    "swf"  : "application/x-shockwave-flash",
    "tiff" : "image/tiff",
    "txt"  : "text/plain",
    "wav"  : "audio/x-wav",
    "wma"  : "audio/x-ms-wma",
    "wmv"  : "video/x-ms-wmv",
    "xml"  : "text/xml"
};
exports.mime = mine;