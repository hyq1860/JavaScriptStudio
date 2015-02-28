var fork = require('child_process').fork;
var worker = fork('./child.js');//创建一个工作进程
worker.on('message', function(m) { //接收工作进程计算结果
    console.log(m);
    worker.kill(); //发送杀死进程的信号
});
worker.send(35);
