var schedule = require('node-schedule');

var rule01 = new schedule.RecurrenceRule();
rule01.minute = 51;
var task01 = schedule.scheduleJob(rule01, function () {
    console.log('每小时的50分钟执行一次');
});
/*
每隔 15 分钟执行：
rule.minute = [0, 15, 45];

同理， 每隔 30 分钟执行：
rule.minute = [0, 30];  
*/
var rule02 = new schedule.RecurrenceRule();
//rule02.minute = [0, 1];

var times = [];
for (var i = 1; i < 60; i++) {
    times.push(i);
}
rule02.second = times;
var task02 = schedule.scheduleJob(rule02, function () {
    console.log('minute = [0,1]');
});

//一个星期中的某些天的某个时刻，例如：每周四，周五，周六，周天的11点
var rule03 = new schedule.RecurrenceRule();
rule03.dayOfWeek = [0, new schedule.Range(1, 6)];
rule03.hour = 11;
rule03.minute = 33;

var task03 = schedule.scheduleJob(rule03, function () {
    console.log('一个星期中的某些天的某个时刻，例如：每周四，周五，周六，周天的11点');
});

//确定时间，例如：2012年11月21日，5:30
/*
year - 四位数的年份， 如果取值为0 - 99， 则在其之上加上1900
month - 0(代表一月) - 11(代表十二月) 之间的月份
day - 1 - 31之间的日期
hours - 0(代表午夜) - 23之间的小时数
minutes - 0 - 59之间的分钟数
seconds - 0 - 59之间的秒数
microseconds - 0 - 999之间的毫秒数
 * http://www.dreamdu.com/javascript/object_date/
 */
var date = new Date(2015, 2, 24, 11, 47, 0);
//console.log(date.toString());
var task04 = schedule.scheduleJob(date, function () {
    console.log('2015, 3, 24, 11, 37, 0');
});



//'* * * * * *' - runs every second
//'*/5 * * * * *' - runs every 5 seconds
//'10,20,30 * * * * *' - run at 10th, 20th and 30th second of every minute
//'0 * * * * *' - runs every minute
//'0 0 * * * *' - runs every hour(at 0 minutes and 0 seconds)


schedule.scheduleJob('*/5 * * * * *', function () {
    console.log('每五秒跑一次');
});

schedule.scheduleJob('0 */1 * * * *', function() {
    console.log('每分钟跑一次');
});