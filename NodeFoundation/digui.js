for (var i = 0; i < 10; i++) {
    console.log(i);
    setTimeout(function() {
        console.log(i);
    },1000);
}

/*
var i = 0;

function recurse() {
    // ...做爱做的事...
    setTimeout(function() {
        console.log(i);
        if (i < 100) {
            recurse();
        }
    }, 1000);
    i++;
    
}

recurse()
 */

/*
for 循环体中建立了一个匿名函数，将循环迭代变量 i 作为函数的参数传递并调用。由于运行时闭包的存在，该匿名函数中定义的变量（包括参数表）在它内部的函数（fs.readFile 的回调函数）执行完毕之前都不会释放，因此我们在其中访问到的 i 就分别是不同的闭包实例，这个实例是在循环体执行的过程中创建的，保留了不同的值。
补充：闭包的写法，无法保证按数组存放文件顺序读取文件内容，相当多个文件读取操作并行进行，根据文件大小决定读取的快慢；而forEach是可以的保证顺序读取; 
 */

/*
var data = [];
for (var i = 0; i < 100; i++) {
    data.push(i);
}
//http://stackoverflow.com/questions/5050265/javascript-node-js-is-array-foreach-asynchronous
data.forEach(function (item) {
    setTimeout(function() {
        console.log(item);
    }, 2000);
});

*/


/*
for (var i = 0; i < 100; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i);
        }, 2000);
    })(i);
}
*/
return;
function eachCallback(arr, func, callback) {
    if (!arr || !arr.length) {
        callback.call(null, arr);
        return;
    }
    var s = arr.length;
    var resultArr = [];
    //闭包
    function done(data) {
        var key = this.key;
        resultArr[key] = data;
        s--;
        if (s == 0) callback.call(null, resultArr, arr);
    }
    for (var i = 0; i < s; i++) {
        var newdone = done.bind({ key: i });
        func.call(null, arr[i], newdone);
    }
}

eachCallback([1, 2, 3, 4,5,6], function(val, callback) {
    //这里就是循环体，模仿一下异步
    //callback需要在异步结束后调用，应保证每次循环都需要调用callback
    var time = ~~(Math.random() * 2000);//取整
    setTimeout(function () {
        console.log(val);
        callback(time);
    }, 2000);
}, function(result) {
    //这里就是循环里所有异步结束后的回调
    console.log(result);
});


//参考eachSeries和applyEachSeries。 


//https://blog.phoenixlzx.com/2014/05/19/for-loop-in-async-function-with-async-in-it/
//http://jsbin.com/hiqilidiba/1/edit
//而且这种情况， 用 promise 正适合啊
//简单来说吧， 将 key 和 arr 的不同搭配转换成 prmoise 数组， 以promise.all 等待全部 promise 执行完成
//demo http://jsbin.com/wuwiqe/1/edit
var obj = { a: 123, b: 234, c: 12456 };
var arr = ['one', 'two', 'three'];

var promiseArr = [];
function asyncMethod(key, n) {
    return new Promise(function (resolve, reject) {
        //do stuff
        resolve([key, n]);
    });
}
var key;
for (key in obj) {
    /*
  if(isNotNeed(key)) //DOM解析获得obj，isNotNeed函数判断属性是否是需要的
    continue;
  */
  for (var i = 0; i < arr.length; i++) {
        promiseArr.push(asyncMethod(key, arr[i]));
    }
}

Promise.all(promiseArr).then(function (results) {
    console.log("all is done", results);
    document.write("all is done");
});