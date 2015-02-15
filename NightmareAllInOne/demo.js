var Nightmare = require('nightmare');
var db = require('./db');
var myScrape = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 100,
        //phantomPath:'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\'
    }
);
var cate = [];
function gatherJdProduct(row) {
    var k = 0;
    var array = row.PageInfo.toString().split('/');
    var total = parseInt(array[1]);

    for (var i = 1; i <= total; i++) {
        cate.push(row.Id);
        myScrape.useragent('firefox').goto(row.ItemUrl + "?page=" + i)
            .wait()
            .evaluate(function (param1) {
                var i = 0;
                //return document.title;
                var flag = false;
                var items = $('.gl-item');
                if (items.length == 0) {
                    items = $('.list-h > li'); //http://list.jd.com/list.html?cat=737,1277,3979
                }
                if (items.length==0) {
                    items = $('#plist > .item');//http://list.jd.com/1713-3295-6954.html
                    
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
                        remark=self.find('.summary-grade').find('a').text().replace('(已有', '').replace('评价)', '');
                    } else {
                        remark=self.find('.extra').find('a').text().replace('(已有', '').replace('评价)', '');
                    }

                urls.push({ name: productName, price: price, remark: remark, url: url, listImage: imageUrl, info: param1[i] });
                    i++;
                });

                return urls;
            },
                function (result) {
                    
                    for (var j = 0; j < result.length; j++) {
                        console.log(result[j].name + "::" + result[j].price + "::" + result[j].remark + "::" + result[j].url);
                        console.log(result[j].info);
                        //db.insert(result[j].url, "jd", result[j].name, result[j].price, result[j].listImage, cate[k].Id, '', result[j].remark);
                    }
                    k++;
                    //console.log(result);
                }, cate);
    }
}

db.getList(gatherJdProduct, myScrape);




