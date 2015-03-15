
//http://table.finance.yahoo.com/table.csv?a=0&b=1&c=2012&d=3&e=19&f=2012&s=600000.ss

var async = require('async');
var request = require('request');
var qs = require('querystring');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');

var dao = require('./mysqldao');
dao.getListHtml("http://list.jd.com/670-729-7372.html?page=9").then(function(result) {
    //console.log(result);
        var $=cheerio.load(result[0].Content);
    //var html = iconv.decode(body, 'utf-8');
    var flag = false;
    var items = $('.gl-item');
    if (items.length == 0) {
        items = $('.list-h > li'); //http://list.jd.com/list.html?cat=737,1277,3979 普通的
    }
    if (items.length == 0) {
        items = $('#plist > .item'); //http://list.jd.com/1713-3295-6954.html 书籍的
        flag = true;
    }
    var data = [];
        items.each(function(index, object) {
            var imageUrl = "";
            var productName = "";
            var price = "";
            var remark = "";
            var sku = "";
            var self = $(object);
            //图片
            var ahref = self.find('.p-img').find('a');
            //名称
            var name = self.find('.p-name').eq(0).find('a').find('em');
            //价格
            var priceDom = self.find('.p-price');
            //sku
            sku = priceDom.attr("data-sku");
            var url = ahref.attr('href');
            productName = name.text();

            price = priceDom.find('strong').eq(0).text().replace('￥', '');
            //imageUrl = self.find('.p-img').find('a').find('img')[0].outerHTML;
            //严重注意 延迟加载 尽然没有获取到src
            imageUrl = self.find('.p-img').find('a').find('img').attr("data-lazy-img");
            if (flag) {
                remark = self.find('.summary-grade').find('a').text().replace('(已有', '').replace('评价)', '');
            } else {
                remark = self.find('.extra').find('a').text().replace('(已有', '').replace('评价)', '');
            }
            if (remark == "") {
                remark = self.find(".p-commit").find('a').text();
            }

            data.push({ name: productName, price: price, remark: remark, sku: sku, img: imageUrl, url: url });
        });
    })
.then(function(err) {
    console.log(err);
});
/*
request.get({
    url : "http://table.finance.yahoo.com/table.csv?a=0&b=1&c=2012&d=3&e=19&f=2012&s=600000.ss" ,
    encoding : null //让body 直接是buffer
}, function (err, response, body) {
    var html = iconv.decode(body, 'utf-8');
    console.log(html);
});

 */