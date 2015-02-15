//goto() argument not updated once queued
//https://github.com/segmentio/nightmare/issues/124

//Nightmare with login, then loop and then run(). #90
//https://github.com/segmentio/nightmare/issues/90

var Nightmare = require('nightmare');
var db = require('./db');
var myScrape = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 100,
    }
);

var underscore = require("underscore")._;
function gatherJdProduct(row) {
    var total = parseInt(row.PageInfo);
    
    for (var i = 1; i <= total; i++) {
        
        //var cloneRow = underscore.clone(row);
        myScrape
            .goto(row.ItemUrl + "?page=" + i);
    }
    for (var j = 1; j <= total; j++) {
        myScrape.wait()
        .evaluate(function (params) {
            var flag = false;
            var items = $('.gl-item');
            if (items.length == 0) {
                items = $('.list-h > li'); //http://list.jd.com/list.html?cat=737,1277,3979
            }
            if (items.length == 0) {
                items = $('#plist > .item'); //http://list.jd.com/1713-3295-6954.html
                
                flag = true;
            }
            var urls = [];
            items.each(function (index, object) {
                var self = $(object);
                var ahref = self.find('.p-img').find('a');
                var name = self.find('.p-name').find('a');
                name.remove('font');
                var priceDom = self.find('.p-price');
                var imageUrl = "";
                var productName = "";
                var price = "";
                var remark = "";
                var url = ahref.attr('href');
                productName = name.text();
                
                price = priceDom.find('strong').text().replace('￥', '');
                imageUrl = ahref.find('img').attr('src');
                
                if (flag) {
                    remark = self.find('.summary-grade').find('a').text().replace('(已有', '').replace('评价)', '');
                } else {
                    remark = self.find('.extra').find('a').text().replace('(已有', '').replace('评价)', '');
                }
                
                urls.push({ name: productName, price: price, remark: remark, url: url, listImage: imageUrl, data: params });
            });
            
            return urls;
        },
            function (result) {
            
            for (var k = 0; k < result.length; k++) {
                console.log(result[k].data);
                    //console.log(result[j].data + "::"+ result[j].name + "::" + result[j].price + "::" + result[j].remark + "::" + result[j].url);

                    //db.insert(result[j].url, "jd", result[j].name, result[j].price, result[j].listImage, cate[k].Id, '', result[j].remark);
            }
                //console.log(result);
        }, row);
    }

}

db.getList(gatherJdProduct, myScrape);




