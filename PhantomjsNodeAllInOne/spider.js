//引入phantomjs-node包
var phantom = require('phantom');

//var browserDict = new Array();
//var pageDict = new Array();
var workerBrowser = null;
var workerBrowserPId = null;
var workerPage = null;
var browserCount = 1;
var pageCount = 1;

function init(callback) {
    phantom.create("--load-images=no", "--disk-cache=yes", "--web-security=no", "--ignore-ssl-errors=yes", { port: 12345, onExit: exitCallback }, function (ph) {
        workerBrowser = ph;
        //进程编号
        workerBrowserPId = ph.process.pid;
        //console.log("phantomjs进程id："+workerBrowserPId);
        //var isPageOneFinished = false;
        //var isPageTwoFinished = false;
        workerBrowser.createPage(function (page) {
            
            workerPage = page;
            //isPageOneFinished = true;
            //console.log("callback1");
            //if (isPageOneFinished && isPageTwoFinished) {
                //callback();
                    //console.log("callback1");
            //}
            callback();
        });
        
        //ph.createPage(function (page1) {
            
        //    pageDict[1] = page1;
        //    isPageTwoFinished = true;
            
        //    if (isPageOneFinished && isPageTwoFinished) {
        //        //callback();
        //            //console.log("callback2");
        //    }
        //});

    }, {
        dnodeOpts: {
            weak: false
        }
    });
}
function exitCallback() {
    console.log("crash");
}
function browser(spiderArgs, callback) {
    //分析url的id 根据url的奇偶数分配页签
    //var pageId = spiderArgs.Id % 2 == 0 ? 0 : 1;
    //var page = pageDict[0];
    //var pageOpenStart = new Date().getTime();
    
    
    var process = spiderArgs[0].Process;
    //var gather = spiderArgs.Gather;
    //console.log(gather);
    
    workerPage.open(spiderArgs[0].Url, function (status) {
        
        //var jsUrl = "";
        //if (spiderArgs[0].Url.indexOf("jd") > 0) {
        //    jsUrl = "http://182.92.167.82/js/jd.js";
        //}
        
        workerPage.injectJs("js/jd.js", function () {
            workerPage.evaluate(function () {
                return gatherJdDatail();
            }, function (result) {
                //if (typeof process === "function") {
                    
                    process(result);
                    callback();
                //}
            });
        });

                


    });




}

//设置浏览器进程数
function setBrowserCount(browserCount) {
    browserCount = browserCount;
}

//设置每个浏览器创建的page数
function setPageCount(pageCount) {
    //pageCount = pageCount;
}

function getPage() {
    return workerPage;
}
function getBrowser() {
    return browser;
}
function getPhantomjsPid() {
    return workerBrowserPId;
}
//
exports.init = init;
exports.browser = browser;
//exports.setBrowserCount = setBrowserCount;
//exports.setPageCount = setPageCount;
exports.getPage = getPage;
exports.getBrowser = getBrowser;
exports.getPhantomjsPid = getPhantomjsPid;