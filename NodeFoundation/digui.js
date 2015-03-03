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

function eachCallback(arr, func, callback) {
    if (!arr || !arr.length) {
        callback.call(null, arr);
        return;
    }
    var s = arr.length;
    var resultArr = [];
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
    var time = ~~(Math.random() * 2000);
    setTimeout(function () {
        console.log(val);
        callback(time);
    }, 2000);
}, function(result) {
    //这里就是循环里所有异步结束后的回调
    console.log(result);
});


//参考eachSeries和applyEachSeries。 