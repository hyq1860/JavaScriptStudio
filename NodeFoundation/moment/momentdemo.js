var moment = require('moment');
//console.log(moment());
console.log(moment().format("YYYY-MM-DD HH:mm:SS"));
console.log(moment().format());
console.log(moment().startOf('day').fromNow());
console.log(moment().startOf('hour').fromNow());
console.log(moment("20141231", "YYYYMMDD").fromNow());

var obj = {
    subscribe_time: 1382694957,
    time: 1429694978
}
console.log((new Date(obj.subscribe_time * 1000)).toUTCString());
console.log((new Date(obj.subscribe_time * 1000)).toDateString(""));

var day = moment(obj.subscribe_time*1000);
console.log(day.format('l'));

console.log(moment(obj.time * 1000).format('l'));

console.log(moment("2015-04-22 15:25:49.293").unix());

