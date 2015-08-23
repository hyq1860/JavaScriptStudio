var log4js = require('log4js');
log4js.configure({
    appenders: [
        {
            type: 'dateFile',
            filename: 'blah.log',
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: false
        }
    ],
    replaceConsole: true
});
//var logger = log4js.getLogger(name);
//logger.setLevel('INFO');

exports.logger=function(name) {
    var logger = log4js.getLogger(name);
    logger.setLevel('ERROR');
    return logger;
}