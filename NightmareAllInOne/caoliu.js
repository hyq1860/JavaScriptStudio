var Nightmare = require('nightmare');
var db = require('./db');
var myScrape = new Nightmare(
    {
    loadImages: false,
    weak: false,
    timeout: 100,
    proxy: '127.0.0.1:8087',
    output_encoding:'gb2312'
        //phantomPath:'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\'
}
);

var async = require('async');

function insert(row, callback) {
    var id = db.md5(row.title);
    db.insertCaoliuList(id, row.title, row.href, callback);
}

for (var index = 1; index < 100; index++) {
    myScrape
.useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13')
.goto('http://wo.yao.cl/thread0806.php?fid=4&search=&page='+ index)
.inject('js', 'jquery-2.1.1.min.js')
.evaluate(function () {
        var hrefs = $("a");
        var titles = [];
        hrefs.each(function (index, object) {
            var self = $(object);
            if (self.attr("id") == "") {
                var title = self.text();
                var href = self.attr("href");
                if (title[0] == "[" && title!="" && href!="") {
                    titles.push({ title: title, href: href });
                }
            }
        });
        return titles;
    }, function (res) {
        async.eachLimit(res, 1, insert, function (err) {
            if (err) throw err;
        });
        /*
        for (var i = 0; i < res.length; i++) {
            var data = res[i];
            var id = db.md5(data.title);
            db.insertCaoliuList(id, data.title, data.href);
        }
         */
    })
}

myScrape.run();
