/*
Node.js可以处理数以千记的并发， 但是一个Node.js进程在某一时刻其实只是在处理一个请求。
*/
var start = Date.now();//获取当前时间戳
setTimeout(function () {
    console.log(Date.now() - start);
    for (var i = 0; i < 1000000000; i++) {//执行长循环
    }
}, 1000);
setTimeout(function () {
    console.log(Date.now() - start);
}, 2000);

//~~表示将用户传递的参数n取整，功能类似Math.floor函数。
console.log(~~1.6);