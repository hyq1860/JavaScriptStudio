console.log(process.cwd());

var path = require('path');
var moment = require('moment');
console.log(path.resolve('.'));
//路径拼接
console.log(path.join('2015','2','15'));
//console.log(path.resolve(opts.folder + '/' + file).replace(process.cwd(), '.'));