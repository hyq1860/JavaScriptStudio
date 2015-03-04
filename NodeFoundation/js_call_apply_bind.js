/*
caller 
返回一个对函数的引用，该函数调用了当前函数。
functionName.caller
functionName 对象是所执行函数的名称。

对于函数来说，caller 属性只有在函数执行时才有定义。
如果函数是由顶层调用的，那么 caller 包含的就是 null 。
如果在字符串上下文中使用 caller 属性，那么结果和 functionName.toString 一样，也就是说，显示的是函数的反编译文本。
 */
function functionCallerDemo() {
    if (functionCallerDemo.caller) {
        var a = functionCallerDemo.caller.toString();
        console.log(a);
    } else {
        console.log('this is a top function');
    }
}

functionCallerDemo();

function topFunction() {
    functionCallerDemo();
}

topFunction();


//
var frog = {
    name : '张三',
    say  : function () {
        console.log(this.name);
    }
}

var rabbit = {
    name : '李四'
}

frog.say.call(rabbit);

frog.say.call(frog);


//把参数转化成真正的数组对象
function test02() {
    var arr = [].slice.call(arguments);
    console.log(arguments.slice, arr.slice);
    //  undefined function slice() { [native code] }
}
test02(1, 2, 3, 4)