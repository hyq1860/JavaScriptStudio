var Nightmare = require('nightmare');

//超时机制demo
/*
var timeoutMessageReceived = false;
new Nightmare({
    timeout: 1000
})
.on('timeout', function (msg) {
    timeoutMessageReceived = true;
})
.goto('http://www.baidu.com/')
.wait('bbb')
.run(function () {
    console.log(timeoutMessageReceived);
    
});
*/


//console
/*
var fired = false;
new Nightmare()
        .on('consoleMessage', function () {
    fired = true;
})
.goto('http://www.baidu.com')
.evaluate(function () {
    console.log('message');
})
.run(function () {
    console.log(fired);
});

 */


/*
//alert
var firedAlert = false;
new Nightmare()
.on('alert', function () {
    firedAlert = true;
})
.goto('http://www.baidu.com')
.evaluate(function () {
    alert('ohno');
})
.run(function () {
    console.log(firedAlert);
});
*/

var firedError = false;
new Nightmare()
.on('error', function () {
    firedError = true;
})
.goto('http://www.baidu.com')
.evaluate(function () {
    return aaa;
})
.run(function () {
    console.log(firedError);
});