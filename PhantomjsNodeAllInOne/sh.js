var spawn = require('child_process').spawn,
    server = null;


function startServer() {
    console.log('start server');
    var options = { stdio: ['ipc'] };
    server = spawn('node', ['app.js'], options);
    console.log('node js pid is ' + server.pid);
    server.on('close', function (code, signal) {
        console.log(code);
        console.log(signal);
        server.kill(signal);
        server = startServer();
    });
    server.on('error', function (code, signal) {
        console.log(code);
        console.log(signal);
        server.kill(signal);
        server = startServer();
    });
    server.on('message', function (data) {
        console.log(data.toString());
    });
    return server;
};

startServer();

