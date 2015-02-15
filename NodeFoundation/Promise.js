//该代码需要比较新的node 0.12才能运行
//http://es6.ruanyifeng.com/#docs/promise
//http://cssha.com/ecmascript6-promise/
//http://www.cnblogs.com/silin6/p/4288967.html
var name,
    p = new Promise(function (resolve) {
        setTimeout(function () {//异步回调
            resolve();
        }, 1000);//1s后执行
    });
p.then(function () {
    name = 'linkFly';
    console.log(name);//linkFly
}).then(function () {
    name = 'cnBlog';
    console.log(name);
});
//这段代码1s后会输出linkFly,cbBlog