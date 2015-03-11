var async = require('async');
var arr = [{ name: 'Jack', delay: 2000 },
{ name: 'Mike', delay: 1000 },
{ name: 'Freewind', delay: 3000 }];
/**
* 所有操作并发执行，且全部未出错，最终得到的err为undefined。注意最终callback只有一个参数err。
*/
// 1.1
async.each(arr, function (item, callback) {
    console.log('1.1 enter: ' + item.name);
    setTimeout(function () {
        console.log('1.1 handle: ' + item.name);

        setTimeout(function() {
            console.log("ceshi:"+item.name);
        }, 1000);

    }, item.delay);
}, function (err) {
    if (err) {
        console.log('1.1 err: ' + err);
    }
});