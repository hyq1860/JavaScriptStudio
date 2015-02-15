var request = require('request');
var fs = require('fs');
var currentFilePath = fs.realpathSync('.');
if (!fs.existsSync(currentFilePath + "/download")) {
    fs.mkdirSync(currentFilePath + "/download");
}

request('http://www.baidu.com/img/bd_logo1.png')
.on('error',function(error) {
        console.log(error);
    }).pipe(fs.createWriteStream(currentFilePath + '/download/' + 'doodle.png'))