function f2() {
    //函数内部声明变量的时候，一定要使用var命令。
    //如果不用的话， 你实际上声明了一个全局变量！
    g = 1000;
}

f2();
console.log(g);

function f1() {
    var n = 999;
}

f1();
//外部不能访问函数内部的变量
console.log(n);

