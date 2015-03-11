var moment = require('moment');
//console.log(moment());
console.log(moment().format("YYYY-MM-DD HH:mm:SS"));
console.log(moment().format());
console.log(moment().startOf('day').fromNow());
console.log(moment().startOf('hour').fromNow());
console.log(moment("20141231","YYYYMMDD").fromNow());