//http://haiyupeter.iteye.com/blog/1735686
/**
 * node程序启动入口模块
 * 1：设置允许环境当前路径cwd为该文件目录
 * 2：启动守护进程，运行主服务
 * 3：监听关闭事件，关闭主服务并退出
 * 示例：node bootstarp.js -m testapp.js
 * node bootstarp.js -m loopparams.js
 * node bootstarp.js -m jdgatherproduct.js
 * node bootstarp.js -m jdgatherproduct-server.js
 */
//日志
var debug = require("debug")("bootstrap");
debug("start bootstrap");

var path = require("path");
var addDeamon = require("./daemon.js").addDeamon;

var file = require.main.filename;
path = path.dirname(file);

process.chdir(path);

var modulesNames = [], args = [], deamons = [];

if (process.argv && process.argv.length) {
    for (var i = 0, len = process.argv.length; i < len; i++) {
        debug("argv item:"+process.argv[i]);
        if (process.argv[i] == '-m') {
            var names = process.argv[++i];
            if (names) {
                modulesNames = modulesNames.concat(names.split("|"));
            }
        } else if (process.argv[i] == '-pid') {//过滤掉ppid参数
            i++;
            continue;
        } else {
            args.push(process.argv[i]);
        }
    }
}
// 可以在此处设置默认载入默认模块
if (modulesNames.length == 0) {
    debug('please defined the modules like: node bootstrap.js -m main1.js -m main2.js');
    return;
    // modulesNames.push('main');
}

debug("modulesNames:"+modulesNames);

modulesNames.forEach(function (moduleName) {
    deamons.push(addDeamon(moduleName, args));
});

process.on("exit", function () {
    debug("parent exit");
    deamons.forEach(function (deamon) {
        try {
            deamon.stop();
        } catch (e) {
            debug(e);
        }
    });
});

process.on("SIGQUIT", function () {
    debug("request for exit");
    deamons.forEach(function (deamon) {
        try {
            deamon.stop();
        } catch (e) {
            debug(e);
        }
    });
    process.exit(0);
});

process.on("uncaughtException", function (error) {
    debug("bootstarp.js:"+error);
}); 