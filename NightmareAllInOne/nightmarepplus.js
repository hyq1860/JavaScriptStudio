//https://cnodejs.org/topic/4fbae57dd46624c476072445
//http://rob.conery.io/2012/04/05/cleaning-up-deep-callback-nesting-with-nodes-eventemitter/
var Nightmare = require('nightmare');
var util = require("util");
function NightmarePlus() {
    Nightmare.call(this);
}

util.inherits(NightmarePlus, Nightmare);
exports = module.exports = NightmarePlus;