var child_process = require("child_process");
//child_process.exec("taskkill /IM phantomjs.exe /f /t");
//child_process.spawn("taskkill", ["/IM", 'phantomjs.exe', '/F', '/T']);

child_process.exec('taskkill /PID ' + 11044 + ' /f /t', function (err, stdout, stderr) {
    if (err) {
        debug("杀死进程haha" + err);
    } else {
        debug("杀死进程成功");
    }
});

