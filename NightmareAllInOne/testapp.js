process.on('message', function (data) {
    console.log('父进程发来消息:', data);
});

setInterval(function() {
    process.send({ Timestamp: new Date() });
}, 2000);
