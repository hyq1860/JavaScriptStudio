//goto() argument not updated once queued
//https://github.com/segmentio/nightmare/issues/124

//Nightmare with login, then loop and then run(). #90
//https://github.com/segmentio/nightmare/issues/90
//nodejs爬虫
//http://git.oschina.net/dreamidea/neocrawler
//var dao = require('./mysqldao');
var logger = require('./log4js').logger('jdgather');
var statrDate = new Date();
var moment = require('moment');
var debug = require('debug')('spider');
var Nightmare = require('nightmare');
var request = require('request');
var uuid = require('node-uuid');

var myScrape = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 1000,
        //phantomPath: 'D:\\Sync\\Node\\phantomjs-1.9.7-windows\\'
    }
);
myScrape.useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13');
var underscore = require("underscore")._;

var request = require('request');
var baseUrl = 'http://182.92.167.82:5001';
//var baseUrl = 'http://127.0.0.1:8080';
var taskUrl = baseUrl+"/spider/gettask";
request(taskUrl, function(error, response, body) {
    if (!error) {
        var data = JSON.parse(body);
        debug("data.length:" + data.length);
        underscore.each(data, function (item, index) {
            debug("item:" + item);
            //console.log(index + ":" + item);
            //var total = parseInt(item.PageInfo);
            var startPageIndex = item.SpiderPageIndex - 1;
            if (startPageIndex <= 0) {
                startPageIndex = 1;
            }
            for (var i = startPageIndex; i <= item.PageInfo; i++) {
                myScrape
                .goto(item.ItemUrl + "?page=" + i)
                .wait(Math.random() * 3000)
                .evaluate(function (params, pageIndex) {
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
                    
                    return { parent: params, pageIndex: pageIndex, html: document.documentElement.innerHTML, data: data };
                }, function (result) {
                    //发送心跳
                    try {
                        process.send({ Timestamp: new Date(), PhantomjdPid: myScrape.getPhantomjsPid() });
                    } catch (e) {
                        logger.error(e);
                    }
                    try {
                        //console.log(result.parent);
                        //console.log(result.pageIndex + "数据");
                        //if (result != null && result.data != null && result.data.length > 0) {
                        //logger.info("url:"+ result.data[0].url+"\n"+"数据length："+ result.data.length);
                        //}
                        
                        //dao.saveHtml({ Url: result.parent.ItemUrl + "?page=" + result.pageIndex, Source: 1, Type: 'list', Content: result.html, InDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") });
                        
                        var products = [];
                        
                        for (var i = 0; i < result.data.length; i++) {
                            var item = result.data[i];
                            
                            //console.log(item.price);
                            try {
                                if (item.price.indexOf('￥') > 0) {
                                    logger.error(item);
                                }
                                if (isNaN(parseFloat(item.price, 10))) {
                                    item.price = 0;
                                }
                            } catch (e) {
                                logger.error(e);
                                item.price = 0;
                            }
                            
                            //console.log(item.pageIndex);
                            //db.replaceIntoProductNew(db.guid(), item.sku, "jd", item.name, item.price, item.img, result.parent.Id, '', item.remark);
                            //dao.addProduct({ LogicId: uuid.v1(), Sku: item.sku, Source: 1, Name: item.name, Price: parseFloat(item.price), ListImage: item.img, Category: result.parent.LogicId });
                            //debug(item.sku+"\n"+ item.name);
                            products.push([uuid.v1(), item.sku, 1, item.name, item.price, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), item.img, result.parent.LogicId]);
                        }
                        request.post({ url: baseUrl+'/spider', form: { products: products, categoryId: result.parent.Id, pageIndex: result.pageIndex } }, function (err, httpResponse, body) {
                            if (err) {
                                debug("request spider:" + err);
                            } else {
                                debug(body);
                            }
                        });
                    //request.post('http://127.0.0.1:8080/spider').form({ products: products });
                    //dao.addProducts(products);
                    //dao.updateJDCategory(result.parent.Id, result.pageIndex);
                    } catch (e) {
                        logger.error("result:" + e);
                    //process.send({ Timestamp: statrDate, PhantomjdPid: myScrape.getPhantomjsPid() });
                    }
                }, item, i);
            }
        });
        myScrape.run(function (err, nightmare) {
            if (err) {
                logger.info(err);
                debug(err);
            }
            //dao.updateJDCategoryTask();
            
            request(baseUrl+"/spider/addcategorytask", function(error, response, data) {
                if (error) {
                    debug("addcategorytask" + error);
                } else {
                    debug("addcategorytask成功");
                }
            });
            
            debug('Done!');
        });
    }
});


/*
dao.getCategory().then(function (data) {
    debug("data.length:"+ data.length);
    underscore.each(data, function(item, index) {
        debug("item:" + item);
        //console.log(index + ":" + item);
        //var total = parseInt(item.PageInfo);
        var startPageIndex = item.SpiderPageIndex - 1;
        if (startPageIndex <= 0) {
            startPageIndex = 1;
        }
        for (var i = startPageIndex; i <= item.PageInfo; i++) {
            myScrape
                .goto(item.ItemUrl + "?page=" + i)
                .wait(Math.random() * 3000)
                .evaluate(function(params, pageIndex) {
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

                    return { parent: params, pageIndex: pageIndex,html: document.documentElement.innerHTML, data: data };
                }, function(result) {
                    //发送心跳
                    try {
                        process.send({ Timestamp: new Date(), PhantomjdPid: myScrape.getPhantomjsPid() });
                    } catch (e) {
                        logger.error(e);
                }
                try {
                    //console.log(result.parent);
                    //console.log(result.pageIndex + "数据");
                    //if (result != null && result.data != null && result.data.length > 0) {
                        //logger.info("url:"+ result.data[0].url+"\n"+"数据length："+ result.data.length);
                    //}

                    dao.saveHtml({ Url: result.parent.ItemUrl+"?page="+ result.pageIndex, Source: 1, Type: 'list', Content: result.html, InDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") });

                    var products = [];

                    for (var i = 0; i < result.data.length; i++) {
                        var item = result.data[i];

                        //console.log(item.price);
                        try {
                            if (item.price.indexOf('￥') > 0) {
                                logger.error(item);
                            }
                            if (isNaN(parseFloat(item.price, 10))) {
                                item.price = 0;
                            }
                        } catch (e) {
                            logger.error(e);
                            item.price = 0;
                        }

                        //console.log(item.pageIndex);
                        //db.replaceIntoProductNew(db.guid(), item.sku, "jd", item.name, item.price, item.img, result.parent.Id, '', item.remark);
                        //dao.addProduct({ LogicId: uuid.v1(), Sku: item.sku, Source: 1, Name: item.name, Price: parseFloat(item.price), ListImage: item.img, Category: result.parent.LogicId });
                        //debug(item.sku+"\n"+ item.name);
                        products.push([uuid.v1(), item.sku, 1, item.name, item.price, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), item.img, result.parent.LogicId]);
                    }
                    request.post({ url: 'http://127.0.0.1:8080/spider', form: { products: products,categoryId: result.parent.Id,pageIndex: result.pageIndex } }, function(err, httpResponse, body) {
                        if (err) {
                            debug("request spider:" + err);
                        } else {
                            debug(body);
                        }
                    });
                    //request.post('http://127.0.0.1:8080/spider').form({ products: products });
                    //dao.addProducts(products);
                    //dao.updateJDCategory(result.parent.Id, result.pageIndex);
                } catch (e) {
                    logger.error("result:"+e);
                    //process.send({ Timestamp: statrDate, PhantomjdPid: myScrape.getPhantomjsPid() });
                }
            }, item, i);
        }
    });
    myScrape.run(function (err, nightmare) {
        if (err) {
            logger.info(err);
            debug(err);
        }
        dao.updateJDCategoryTask();
        debug('Done!');
    });

}, function (err) {
    if (err) {
        debug(err);
        logger.info(err);
    }
});
*/
