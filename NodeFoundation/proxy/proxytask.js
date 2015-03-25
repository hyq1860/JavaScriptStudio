var schedule = require('node-schedule');
var proxy = require('./gatherproxy.js');
schedule.scheduleJob('0 */1 * * * *', function () {
    proxy.gatherProxy();
});