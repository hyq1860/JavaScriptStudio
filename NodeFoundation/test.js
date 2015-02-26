var benchmark = function () {
    
    var initloops = 1e7, foo, loops = initloops, t0, t1;
    t0 = Date.now();
    while (loops--) { if (typeof foo === 'undefined') { } }
    t1 = Date.now();
    console.log('typeof: ' + (t1 - t0));
    
    loops = initloops;
    t0 = Date.now();
    while (loops--) { if (foo === undefined) { } }
    t1 = Date.now();
    console.log('equals : ' + (t1 - t0));
};
function isNullOrEmpty(str) {
    return (str === undefined || str == null || str === "" || 0 === str.length);
}
benchmark();
isNullOrEmpty(null);
var code = benchmark.toString().split('\n');
var glob = "console.log('global context');\n" + code.slice(1, code.length - 1).join('\n');
var clos = "console.log('function context');\n(" + code.join('\n') + '());';