//goto() argument not updated once queued
//https://github.com/segmentio/nightmare/issues/124

//Nightmare with login, then loop and then run(). #90
//https://github.com/segmentio/nightmare/issues/90
//nodejs爬虫
//http://git.oschina.net/dreamidea/neocrawler
var debug = require('debug')('spider');
var Nightmare = require('nightmare');
var db = require('./db');
var myScrape = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 100,
        //phantomPath: 'D:\\Sync\\Node\\phantomjs-1.9.7-windows\\'
    }
);
myScrape.useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13');
var underscore = require("underscore")._;

var db = require('./db');
var datas = db.getAllByCondition(function (err, all) {
    if (err) {
        debug('db.getAllByCondition:' + err);
        return;
    }
    underscore.each(all, function (item, index) {
        //console.log(index + ":" + item);
        //var total = parseInt(item.PageInfo);
        var startPageIndex = item.SpiderPageIndex - 1;
        if (startPageIndex <= 0) {
            startPageIndex = 1;
        }
        for (var i = startPageIndex; i <= item.PageInfo; i++) {
            myScrape
                .goto(item.ItemUrl + "?page=" + i)
                .wait(100)
                .evaluate(function (params,pageIndex) {
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
                items.each(function (index, object) {
                    var imageUrl = "";
                    var productName = "";
                    var price = "";
                    var remark = "";
                    var sku = "";
                    var self = $(object);
                    //图片
                    var ahref = self.find('.p-img').find('a');
                    //名称
                    var name = self.find('.p-name').find('a').find('em');
                    //价格
                    var priceDom = self.find('.p-price');
                    //sku
                    sku = priceDom.attr("data-sku");
                    var url = ahref.attr('href');
                    productName = name.text();
                    
                    price = priceDom.find('strong').text().replace('￥', '');
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
                    
                    data.push({ name: productName, price: price, remark: remark,sku:sku,img: imageUrl,url:url});
                });
                
                return {parent:params,pageIndex: pageIndex,data:data};
            }, function (result) {
                //console.log(result.parent);
                console.log(result.pageIndex);
                
                for (var i = 0; i < result.data.length; i++) {
                    var item = result.data[i];
                    //console.log(item.pageIndex);
                    db.replaceIntoProductNew(db.guid(),item.sku, "jd", item.name, item.price, item.img, result.parent.Id, '', item.remark);
                }
                db.updateJDCategoryNew(result.parent.Id, result.pageIndex);
                
            },item,i);
        }
    });
    myScrape.run(function (err, nightmare) {
        if (err) return console.log(err);
        console.log('Done!');
    });
});





