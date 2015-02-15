var Nightmare = require('nightmare');
var db = require('./db');
var myScrape = new Nightmare(
    {
    loadImages: false,
    weak: false,
    timeout: 100,
    proxy: '218.78.210.190:8080',
    output_encoding: 'gb2312'
        //phantomPath:'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\'
}
);

var async = require('async');

var request = require('request');
var fs = require('fs');
var currentFilePath = fs.realpathSync('.');
if (!fs.existsSync(currentFilePath + "/download")) {
    fs.mkdirSync(currentFilePath + "/download");
}

function insert(row, callback) {
    var id = db.md5(row.title);
    db.insertCaoliuList(id, row.title, row.href, callback);
}

var k = 0;
var rows1 = [];

db.getCaoLiu(function (rows) {
    
    for (var i = 0; i < rows.length; i++) {
        myScrape
        .useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13')
        .goto("http://wo.yao.cl/" + rows[i].Href)
        .inject('js', 'jquery-2.1.1.min.js')
        .evaluate(function (params) {
            var i = 0;
            var hrefs = $("img");
            var titles = [];
            hrefs.each(function (index, object) {
                var self = $(object);
                var href = self.attr("src");
                titles.push({ href: href, id: params.Id });

            });
            i++;
            return titles;
        }, function (res) {
            var iamge = "";
            for (var j = 0; j < res.length; j++) {
                iamge += res[j].href+"|";
                /*console.log(res[j].id);
                iamge
                request(res[j].href)
                .on('error', function (error) {
                    console.log(error);
                }).pipe(fs.createWriteStream(currentFilePath + '/download/' + res[j].id + "_" + j + '.png'));*/
            }
            db.updateCaoliu(res[0].id, iamge);
        
            /*
        for (var i = 0; i < res.length; i++) {
            var data = res[i];
            var id = db.md5(data.title);
            db.insertCaoliuList(id, data.title, data.href);
        }
         */
        }, rows[i]);
    }

}, myScrape);
