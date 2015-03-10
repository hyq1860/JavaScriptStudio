function f1() {
    var n = 999;
    function f2() {
        console.log(n);
    }

    return f2;
}
/*
 Javascript语言特有的"链式作用域"结构（chain scope），
 * 子对象会一级一级地向上寻找所有父对象的变量。
 * 所以，父对象的所有变量，对子对象都是可见的，反之则不成立。
 */
var result = f1();
result();


