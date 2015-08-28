var schedule = require('node-schedule');
var i = 0;
var fetch = require('node-fetch');
//交易明细
fetch('http://qt.gtimg.cn/r=0.027100978798468955q=sh601933')
    .then(function (res) {
    return res.text();
}).then(function (body) {
    console.log(body);
});
schedule.scheduleJob('*/5 * * * * *', function () {
            //process.mainModule.exports.callback0();
            //$("#task").html('每2秒跑一次' + process.mainModule.exports.callback0());
            //
    fetch('http://qt.gtimg.cn/r=0.027100978798468955q=sh601933')
    .then(function (res) {
        return res.text();
    }).then(function (body) {
        console.log(body);
    });
});