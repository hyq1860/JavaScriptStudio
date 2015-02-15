var async = require('async');
var count7 = 0;
async.forever(
function (cb) {
    console.log('1.7 count: ', count7);
    count7++;
    setTimeout(cb, 1000);
},
function (err) {
    console.log('1.7 err: ', err);
}
);