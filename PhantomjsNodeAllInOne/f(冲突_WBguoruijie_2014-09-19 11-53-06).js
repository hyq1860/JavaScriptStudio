/* 计算两日期相差的日期年月日等 */
Date.prototype.dateDiff = function (interval, objDate2) {
    var d = this, i = {}, t = d.getTime(), t2 = objDate2.getTime();
    i['y'] = objDate2.getFullYear() - d.getFullYear();
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
    i['ms'] = objDate2.getTime() - d.getTime();
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
    i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
    return i[interval];
}

function killPhantom() {
    var cmd = 'taskkill /IM phantomjs.exe';
    var childProcess = require('child_process');
    var exec = childProcess.exec;
    exec(cmd, function callback(error, stdout, stderr) {
        //console.log(stdout);
        //self.close(true);
        console.log("杀死了phantomjs进程");
        startServer();
    });
}

var child_process = require('child_process');
server = null;
var phantomjsPid = 0;
var heartDate = null;
function startServer() {
    console.log('start server');
    server = child_process.fork('app.js');
    console.log('node js pid is ' + server.pid);
    server.on('close', function (code, signal) {
        console.log(code);
        console.log(signal);
        server.kill(signal);
        //server = startServer();
    });
    server.on('error', function (code, signal) {
        console.log(code);
        console.log(signal);
        server.kill(signal);
        //server = startServer();
    });
    server.on('message', function (data) {
        //console.log(data);
        if (data.PhantomjsPid != null) {
            phantomjsPid = data.PhantomjsPid;//phantomjs进程id
        } 
        else if (data.Heart != null) {
            heartDate = new Date(data.Heart);//接收心跳时间
        }
        
        
    });
    return server;
};

startServer();

var async = require('async');

async.forever(
function (cb) {
    console.log("检测心跳："+ new Date());
    console.log("心跳时间："+ heartDate);
    if (heartDate!=null && heartDate.dateDiff('s', new Date()) > 20) {
        console.log("抓取程序心跳异常");
        killPhantom();
    }
    setTimeout(cb, 19000);
},
function (err) {
    console.log(err);
}
);


