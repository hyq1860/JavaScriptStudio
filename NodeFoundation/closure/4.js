function f1() {
    var n = 999;
    nAdd = function () { n += 1; };

    function f2() {
        console.log(n);
    }

    return f2;
}
//函数内部定义的方法和变量，要等到函数执行过以后，才会真正定义
var result = f1();
result();
nAdd();
result();