//http://www.ibm.com/developerworks/cn/web/1211_zuochao_nodejsrest/

//127.0.0.1:8090/group/getList?&id=1
var http = require('http');
var restrouter = require('./router');
var restparser = require('./restparser');
var common = require("./common");
var parse = require('url').parse;
var util = require('util');
var formidable = require('formidable');
//调试
var debug = require('debug')('nodejs-server');
http.createServer(function (req, res) {
    var url = parse(req.url);
    var pathname = url.pathname;
    //过滤掉favicon.ico请求
    if (!pathname.indexOf('/favicon.ico')|| common.isNullOrEmpty(pathname))
        return;
    debug('Request URL: http://127.0.0.1:8090' + url.href);
	//解析URL参数到resource对象
	req.resource = restparser.parse(pathname);
	//resource.id 存在，表示是RESTful的请求
	if(req.resource.controller){
		res.writeHead(200, {'Content-Type': 'application/json'});
		restrouter.router(req, res, req.resource, function(stringfyResult){
			res.end(stringfyResult);
		});
    } else {
        debug('Request URL is not in RESTful style!');
	    res.writeHead(200, { 'Content-Type': 'text/plain' });
	    res.end('Request URL is not in RESTful style!');
	}
}).listen(8090, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8090/');


