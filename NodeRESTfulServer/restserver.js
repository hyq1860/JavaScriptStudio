//http://www.ibm.com/developerworks/cn/web/1211_zuochao_nodejsrest/

//http://127.0.0.1:8090/list?id=1
var http = require('http'), restrouter = require('./router'), restparser = require('./restparser'), parse = require('url').parse, util = require('util'),
formidable = require('formidable');


http.createServer(function (req, res) {

    var url = parse(req.url), pathname = url.pathname;
    //过滤掉favicon.ico请求
    if (pathname.indexOf('/favicon.ico')>0)
        return;
    console.log('Request URL: http://127.0.0.1:8090' + url.href);
	//解析URL参数到resource对象
	req.resource = restparser.parse(pathname);
	//resource.id 存在，表示是RESTful的请求
	if(req.resource.controller){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		restrouter.router(req, res, req.resource, function(stringfyResult){
			res.end(stringfyResult);
		});
	}else{
		 res.writeHead(200, {'Content-Type': 'text/plain'});
		 console.log('Request URL is not in RESTful style!');
		res.end('Request URL is not in RESTful style!');
	}
}).listen(8090, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8090/');


