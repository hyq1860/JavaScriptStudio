var schedule = require('node-schedule');
var proxy = require('./gather.js');
var validateProxy = require('./validateproxy.js');
//var url = "http://182.92.167.82:5001/proxy/getproxy";
var url = "http://127.0.0.1:5001/proxy/getproxy";
schedule.scheduleJob('0 */1 * * * *', function () {
    proxy.gatherProxy();
});
schedule.scheduleJob('0 */1 * * * *', function () {
    validateProxy.validateProxyTask(url);
});

