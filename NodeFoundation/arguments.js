/*
 Arguments
 代表正在执行的函数和调用他的函数的参数 
 * 
 */
function argumentsTest(data) {
    //期望的函数参数length
    var expertArgumentLength = argumentsTest.length;
    console.log('期望的函数参数长度：' + expertArgumentLength);
    //实际传递的参数的数值
    var actualArgumentLength = data.length;
    console.log('实际参数长度：' + actualArgumentLength);

    
    
    for (var i = 0; i < actualArgumentLength; i++) {
        console.log(arguments[i]);
    }

    console.log('arguments instanceof Array:'+(arguments instanceof Array).toString());
    console.log('arguments instanceof Object:'+(arguments instanceof Object).toString());
}

argumentsTest([1, 2, 3, 4],"123");

/*
callee
返回正被执行的 Function 对象，也就是所指定的 Function 对象的正文

callee 属性的初始值就是正被执行的 Function 对象。

callee 属性是 arguments 对象的一个成员，它表示对函数对象本身的引用，这有利于匿名
函数的递归或者保证函数的封装性，例如下边示例的递归计算1到n的自然数之和。而该属性
仅当相关函数正在执行时才可用。还有需要注意的是callee拥有length属性，这个属性有时候
用于验证还是比较好的。arguments.length是实参长度，arguments.callee.length是
形参长度，由此可以判断调用时形参长度是否和实参长度一致。
*/
function calleeDemo() {
    console.log("arguments.callee:" + arguments.callee);
}

calleeDemo();

//用于验证参数
function calleeValidateArgumentLength() {
    if (arguments.length == arguments.callee.length) {
        console.log("形参和实参长度一致");
    } else {
        console.log("实参长度：" + arguments.length);
        console.log("形参长度："+arguments.callee.length);
    }
}

calleeValidateArgumentLength(1, 2);

//递归计算
var sum = function (n) {
    if (n <= 0)
        return 1;
    else
        return n + arguments.callee(n - 1);
}

console.log(sum(100));

//一般的递归函数：
var sumCommon = function(n) {
    if (1 == n) return 1;
    else return n + sumCommon(n - 1);
}