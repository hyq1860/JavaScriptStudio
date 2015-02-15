//https://github.com/alsotang/async_demo
//https://github.com/vmeurisse/phantomCrawl

var async = require('async');
var t = require('./t');
var log = t.log;
var spider = require('./spider');
/**/
var db = require('./db');

process.on('message', function (data) {
    console.log('父进程发来消息:', data);
});
/**
* cargo也是一个串行的消息队列，类似于queue，通过限制了worker数量，不再一次性全部执行。
* 当worker数量不够用时，新加入的任务将会排队等候，直到有新的worker可用。
*
* cargo的不同之处在于，cargo每次会加载满额的任务做为任务单元，只有任务单元中全部执行完成后，才会加载新的任务单元。
*/
// cargo(worker, [payload])
/**
* 创建cargo实例
*/
var cargo = async.cargo(function (url, callback) {
    spider.browser(url, callback);
}, 1);
/**
* 监听：如果某次push操作后，任务数将达到或超过worker数量时，将调用该函数
*/
cargo.saturated = function () {
    //log('all workers to be used');
}
/**
* 监听：当最后一个任务交给worker时，将调用该函数
*/
var i = 0;
var key = 0;
function callback() {
    i = db.getSku();
    key = db.getId();
    key++;
    cargo.empty = function () {
        //log('no more tasks wating');
        cargo.push({
            Url: "http://item.jd.com/" + i + ".html",
            Process: Test
        }, function (err) {
            //t.wait(5000);
            if (err) {
                console.log(err);
            }
            i++;
            
        });
    
    }
    
    cargo.push({
        Url: "http://item.jd.com/" + i + ".html",
        Process: Test
    }, function (err) {
        //t.wait(100);
        if (err) {
            console.log(err);
        }
        i++;
    //log('finished processing A');
    });
    /**
* 监听：当所有任务都执行完以后，将调用该函数
*/
cargo.drain = function () {
    log('all tasks have been processed');
    
    }
}
//初始化
spider.init(function () {
    process.send({ PhantomjsPid: spider.getPhantomjsPid() });
    //数据库
    db.run(callback);
});




//function GetRandomNum(Min, Max) {
//    var Range = Max - Min;
//    var Rand = Math.random();
//    return (Min + Math.round(Rand * Range));
//}   

/**
* 增加新任务
*/

function Test(data) {
    var price = parseFloat(data.price.replace("￥", ""));
    if (isNaN(price)) {
        price = 0;
    }
    var thirdPartySku = data.url.replace("/", "").replace(".html", "");
    if (data.name != "") {
        db.insert(key, thirdPartySku, "1", data.name, price, data.imageUrl);
        key++;
        process.send({ Heart: new Date() });
    }
    
    //log(data.url);
}





//console.log("haha");






/*
var phantom = require('phantom');

function gatherJdDatail() {
    var price = document.getElementById("jd-price");
    return price.innerHTML;
}
phantom.create(function (ph) {
    
    ph.createPage(function (page) {
        var url = "http://item.jd.com/1209642.html";
        page.open(url, function (status) {
            var jsUrl = "";
            if (url.indexOf("jd") > 0) {
                jsUrl = "http://182.92.167.82/js/jd.js";
            }
            page.includeJs(jsUrl, function () {
                page.evaluate(function () {
                    return gatherJdDatail();
                }, function (result) {
                    console.log('Page title is ' + result);
                    ph.exit();
                });
            });
        });
    });
}, {
    dnodeOpts: {
        weak: false
    }
});

*/

//process.on('uncaughtException', function (err) {
//    //打印出错误
//    console.log(err);
//    //打印出错误的调用栈方便调试
//    console.log(err.stack);
//});

