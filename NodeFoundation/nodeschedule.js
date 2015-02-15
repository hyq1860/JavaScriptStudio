//定时任务
//npm install node-schedule
//http://www.cnblogs.com/ajun/p/3548259.html
var schedule = require("node-schedule");
//月是0——11，用当月减1的标准日期，2月要填写1
var date = new Date(2015, 1, 15, 14, 08, 55);

var j = schedule.scheduleJob(date, function () {
    console.log("执行任务");
});