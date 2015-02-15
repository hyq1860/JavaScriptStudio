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