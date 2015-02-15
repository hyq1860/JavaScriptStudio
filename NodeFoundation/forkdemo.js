var fork = require('child_process').fork;
var cpus = require('os').cpus();
//保存被子进程实例数组
var workers = {};

//这里的被子进程理论上可以无限多
var appsPath = ['./child1.js', './child2.js', './child2.js'];

var createWorker = function (appPath) {
    //保存fork返回的进程实例
    var worker = fork(appPath);
 
    //监听子进程exit事件
    worker.on('exit', function () {
        console.log('worker:' + worker.pid + 'exited');
        delete workers[worker.pid];
        createWorker(appPath);
    });
    
    workers[worker.pid] = worker;
    console.log('Create worker:' + worker.pid);
}

//启动所有子进程

for (var i = appsPath.length - 1; i >= 0; i--) {
    createWorker(appsPath[i]);
};

//父进程退出时杀死所有子进程
process.on('exit', function () {
    for (var pid in workers) {
        workers[pid].kill();
    }
})