//http://stackoverflow.com/questions/17764279/a-media-spider-in-node-js
//http://www.cnblogs.com/zeusro/p/4185196.html
var async = require('async');
var http = require('http');
var urls = ['http://www.jd.com', 'http://www.jd.com', 'http://www.jd.com'];


async.mapSeries(urls, http.get, function (results) {
    // Array of results

});
var http = require('http');
var querystring = require('querystring');
var contents = querystring.stringify({
    name: 'TOM_SON',  
    email: 'gxhacx@gmail.com',  
    address: 'Changshu Dalian Load'
});

var options = {
    host: 'www.jd.com',  
    path: '',  
    method: 'get',  
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  
        'Content-Length': contents.length
    }
};

var req = http.request(options, function (res) {
    res.setEncoding('utf-8');
    res.on('data', function (data) {
        console.log(data);
    });
});

req.write(contents);
req.end();  

/**
 * @author xjsean
 * @alias stack.js
 */
/*
 * @brief: 定义堆栈类
 * @remark: 实现堆栈基本功能
 */
function Stack() {
    //存储元素数组
    var aElement = new Array();
    /*
  * @brief: 元素入栈
  * @param: 入栈元素列表
  * @return: 堆栈元素个数
  * @remark: 1.Push方法参数可以多个
  *    2.参数为空时返回-1
  */
 Stack.prototype.Push = function (vElement) {
        if (arguments.length == 0)
            return -1;
        //元素入栈
        for (var i = 0; i < arguments.length; i++) {
            aElement.push(arguments[i]);
        }
        return aElement.length;
    }
    /*
  * @brief: 元素出栈
  * @return: vElement
  * @remark: 当堆栈元素为空时,返回null
  */
 Stack.prototype.Pop = function () {
        if (aElement.length == 0)
            return null;
        else
            return aElement.pop();
    }
    /*
  * @brief: 获取堆栈元素个数
  * @return: 元素个数
  */
 Stack.prototype.GetSize = function () {
        return aElement.length;
    }
    /*
  * @brief: 返回栈顶元素值
  * @return: vElement
  * @remark: 若堆栈为空则返回null
  */
 Stack.prototype.GetTop = function () {
        if (aElement.length == 0)
            return null;
        else
            return aElement[aElement.length - 1];
    }
    /*
  * @brief: 将堆栈置空 
  */
 Stack.prototype.MakeEmpty = function () {
        aElement.length = 0;
    }
    /*
  * @brief: 判断堆栈是否为空
  * @return: 堆栈为空返回true,否则返回false
  */
 Stack.prototype.IsEmpty = function () {
        if (aElement.length == 0)
            return true;
        else
            return false;
    }
    /*
  * @brief: 将堆栈元素转化为字符串
  * @return: 堆栈元素字符串
  */
 Stack.prototype.toString = function () {
        var sResult = (aElement.reverse()).toString();

     aElement.reverse();
        
        return sResult;
    }
}
/*
var http = require('http');
var stack = new Stack();
var isProcess = true;
function fetch(url, node) {
    stack.Push(url);
    
    if (isProcess) {
        var request = http.get(stack.Pop(), function (response) {
            var html = "";
            request.on('data', function (chunk) {
                html += chunk;
            });
            
            request.on('end', function () {
                isProcess = false;
                console.log(html);
            });
        });
    } else {
        while (!isProcess) {
            
        }
    }
}



for (var i=0;i<urls.length;i++) {
    fetch(urls[i]);
}


function fetch(url, node) {
    if (node == null)
        return;
    // here do something with http request
    var req = http.get('www.google.com', function(res) {
        var data = '';
        res.on('data', function(chunk) {
            data += chunk;
        }.on('end', function() {
            // maybe here generate more new urls
            // get another url_list
            //node = node.next;
            //fetch(url_new, node);
        }
    };
    
    // here need to be run in sync
    for (url in url_arr) {
        fetch(url, node);
    };
 * */