var log4js = require('log4js');
log4js.configure({
    appenders: [
        {
            type: 'file',
            filename: 'logs/log.txt',
            pattern: '-yyyy-MM-dd',
            maxLogSize: 10240,
            //backups:5,
            alwaysIncludePattern: false
        }
    ]
});
//var logger = log4js.getLogger(name);
//logger.setLevel('INFO');

exports.logger=function(name) {
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
}