var forever = require('forever-monitor');

var child = new (forever.Monitor)('proxytask.js', {
    max: 3,
    silent: true,
    args: []
});

child.on('exit', function (info) {
    console.log('after 3 restarts:'+info);
});

child.on('stdout', function (info) {
    console.log('stdout:'+info);
});

child.on('stderr', function (info) {
    console.log('stderr:' + info);
});

child.start();