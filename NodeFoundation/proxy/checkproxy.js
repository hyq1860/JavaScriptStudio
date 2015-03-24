//npm install jschardet -save
//https://cnodejs.org/topic/53142ef833dbcb076d007230
//encoding : null //让body 直接是buffer
var request = require('request');
//var iconv = require('iconv-lite');
//var cheerio = require('cheerio');

var jschardet = require("jschardet");
request('http://1111.ip138.com/ic.asp', { encoding : null,'proxy': 'http://202.108.50.75:82' },function(error,response,body) {
    if (!error && response.statusCode == 200) {
        //var buf = new Buffer(body, 'binary');//这一步不可省略
        //var html = iconv.decode(body, 'gb2312');//将GBK编码的字符转换成utf8的
        //var $ = cheerio.load(html);
    } else {
        if (error) {
            console.log(error);
        }
    }
});