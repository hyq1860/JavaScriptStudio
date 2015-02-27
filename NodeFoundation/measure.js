//http://blog.tompawlak.org/measure-execution-time-nodejs-javascript

var start1 = new Date();

setTimeout(function (argument) {
    // execution time simulated with setTimeout function
    var end1 = new Date() - start1;
    console.info("Execution time: %dms", end1);
}, 1000);

var start2 = new Date();
var hrstart = process.hrtime();

setTimeout(function (argument) {
    // execution time simulated with setTimeout function
    var end = new Date() - start2;
    var hrend = process.hrtime(hrstart);
    
    console.info("Execution time: %dms", end);
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
}, 1);