var schedule = require('node-schedule');
//防止任务重入
var taskManager = {};
taskManager[0] = false;
schedule.scheduleJob('*/1 * * * * *', function () {
    if (!taskManager[0]) {
        taskManager[0] = true;
        setTimeout(function () {
            console.log('每秒执行一次，一次耗时2秒');
            taskManager[0] = false;
        }, 2000);
    }

});

