﻿var Nightmare = require('nightmare');
var uuid = require('node-uuid');
var mysql = require('./mysqldb');
var fs = require('fs');
var db = require('./db');
var myScrape = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 1000,
        //phantomPath: 'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\'
    }
);
function gatherJdAllSort() {
    var cate = new Array();
    //频道集合
    var channelDoms = $('.m');
    
    channelDoms.each(function (i1, object1) {
        //频道item(父)
        var channelItemDoms = $(object1).find('.mt').eq(0).find('a');
        //一级分类（子）
        var childItemDom = $(object1).find('.mc').eq(0);
        //二级分类（孙）grandson
        if (channelItemDoms.length > 0) {
            cate[i1.toString()] = { title: "", hrefs: [], child: [] };
            channelItemDoms.each(function (i11, object11) {
                //父
                if (channelItemDoms.length - 1 == i11) {
                    cate[i1.toString()].title += $(object11).text();
                } else {
                    cate[i1.toString()].title += $(object11).text() + "|";
                }
                
                cate[i1.toString()].hrefs.push($(object11).attr("href"));
                
                //子
                var childItemDoms = childItemDom.find('dl');
                
                
                childItemDoms.each(function (i2, object2) {
                    var childA = $(object2).find('dt').eq(0).find('a');
                    cate[i1.toString()].child[i2] = {};
                    if (childA == null) {
                        cate[i1.toString()].child[i2].title = $(object2).text();
                        cate[i1.toString()].child[i2].href = "";
                    } else {
                        cate[i1.toString()].child[i2].title = $(object2).find('a').eq(0).text();
                        cate[i1.toString()].child[i2].href = $(object2).find('a').eq(0).attr('href');
                    }
                    
                    cate[i1.toString()].child[i2].child = [];
                    
                    //孙
                    var sunItemDoms = $(object2).find('dd').eq(0).find('a');
                    sunItemDoms.each(function (i3, object3) {
                        cate[i1.toString()].child[i2].child[i3] = {};
                        cate[i1.toString()].child[i2].child[i3].title = $(object3).text();
                        cate[i1.toString()].child[i2].child[i3].href = $(object3).attr("href");
                    });
                });

            });
        }
        
    });
    
    return cate;
}

var urls = [];
myScrape
/*.on('resourceRequested', function (requestData, networkRequest) {
        var url = requestData.url;
        if (url.indexOf('.css') > 0) {
            return;
        }
    })*/
    .goto('http://www.jd.com/allSort.aspx')
    //.inject('js', 'jquery-2.1.1.min.js')
    .wait()
    .evaluate(gatherJdAllSort,
        function (result) {
    //console.log("result:"+result);
    
    for (var i = 0; i < result.length; i++) {
        
        //var hrefs = result[i].hrefs;
        var items = result[i].child;
        
        for (var k = 0; k < items.length; k++) {
            //console.log("*"+result[i].title);
            var href = "";
            for (var j = 0; j < result[i].hrefs.length; j++) {
                //console.log("*"+result[i].hrefs[j]);
                href += result[i].hrefs[j] + "|";
            }
            //console.log("**"+items[k].title);
            //console.log("**" +items[k].href);
            for (var l = 0; l < items[k].child.length; l++) {
                //console.log("***" + items[k].child[l].title);
                console.log("***" + items[k].child[l].href);
                //urls.push(items[k].child[l].href);
                urls.push({ channel: result[i].title, href: href, category: items[k].title, categoryUrl: items[k].href, item: items[k].child[l].title, itemUrl: items[k].child[l].href, pageInfo: '' });
                        //console.log(urls.length);
            }

        }
    }
    gatherList(urls);

});
//console.log(((new Date()).getTime() - ttime1) / 1000.000 + "秒");



myScrape.run(function (error, nightmare) {
    if (error) {
        console.log(error);
    }
});
//var datas = [];
var j = 0;
function gatherList(dataList) {
    //myScrape2.datas = [];
    for (var i = 0; i < dataList.length; i++) {
        var url = dataList[i].itemUrl;
        
        if (url.indexOf('list.jd') > -1) {
            //datas.push(dataList[i]);
            console.log(url);
            myScrape
                /*.on('resourceRequested', function (requestData, networkRequest) {
                    var url = requestData.url;
                    if (url.indexOf('.css') > 0) {
                        return;
                    }
                })*/
                .goto(url)
                .wait(200)
                .evaluate(
                function (params) {
                    //总页数
                    //&sort=sort_totalsales15_desc&page=1
                    //return document.title+":"+jQuery('.pagin').eq(0).find('span').eq(0).text();
                    //return document.title; //jQuery('.pagin').eq(0).find('span').eq(0).text();
                    var tempPageInfo = "";
                    try {
                        tempPageInfo = $('.pagin').eq(0).find('span').eq(0).text();
                        
                        if (tempPageInfo == "" || tempPageInfo == null) {
                            tempPageInfo = $('.fp-text').eq(0).text();
                        }
                        
                        tempPageInfo = $('.p-skip').find('b').text();

                        return {pageInfo: tempPageInfo,data: params }
                    } catch (e) {
                        
                        return { pageInfo: tempPageInfo, data: params,err:"错误" }
                    } 
                    return { pageInfo: tempPageInfo, data: params };
                },
                    function (result) {
                    //channel: result[i].title,href: href,category: items[k].title,categoryUrl: items[k].href,item: items[k].child[l].title,itemUrl: items[k].child[l].href,pageInfo:''
                    console.log(result);
                    //console.log(result.data.itemUrl.substring(19));
                    //fs.writeFileSync(result.data.itemUrl.substring(19), result.html);
                        //console.log(datas[j] + "::::" + j);
                        //var data = datas[j];
                    
                    //db.exist(result.data.itemUrl, function () {
                        //db.insertJDCategory(result.data.channel, result.data.href, result.data.category, result.data.categoryUrl, result.data.item, result.data.itemUrl, result.pageInfo);
                        //console.log(j);
                    //});
                    
                    
                    mysql.exec("SELECT count(1) as Total FROM JDCategory where ItemUrl=?", [result.data.itemUrl], function (err, r) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (r.length == 0||r[0].Total==0) {
                                mysql.exec("insert into JDCategory(LogicId,Channel, Href, Category, CategoryUrl, Item, ItemUrl, PageInfo) VALUES(?,?,?,?,?,?,?,?)", [uuid.v1(),result.data.channel, result.data.href, result.data.category, result.data.categoryUrl, result.data.item, result.data.itemUrl, result.pageInfo], function (err1, r1) {
                                    if (err1) {
                                        console.log(err1);
                                    }
                                });
                            }
                        }
                    });
                        //console.log(urls[i] == null);
                        //console.log(data.item + "::::" + data.itemUrl + ":" + result1) ;
                    }, dataList[i]
            );
        }
    }
    myScrape.run(function(error,nightmare) {
        if (error) {
            console.log(error);
        }
    });
}
