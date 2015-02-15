//https://gist.github.com/adatta02/9478217
//http://www.ituring.com.cn/article/54547
//http://shout.setfive.com/2014/02/27/javascript-using-phantomjs-node-with-deferreds/

var Q = require("q");
var phantom = require("phantom");

function DomainScraper() {
    var self = this;
    self.url = "";
    //this.scrapeResults = [];
    
    //this.addResult = function (result) {
    //    this.scrapeResults.push(result);
    //    FS.writeFile("nocluster_results.json", JSON.stringify(this.scrapeResults));
    //};
    
    self.createPhantom = function (port) {
        if (isNaN(port) || isNullOrUndefined(port)) {
            port = 1234;
        }
        var df = Q.defer();
        //var phInitStart = new Date().getTime();
        phantom.create("--load-images=no", "--disk-cache=yes", "--web-security=no", "--ignore-ssl-errors=yes", { port: port }, function (ph) {
            df.resolve(ph);
            //var phInitEnd = new Date().getTime();
            //$("#status").append("<br/>init ph花了:" + (phInitEnd - phInitStart));
        }, {
            dnodeOpts: {
                weak: false
            }
        });
        return df.promise;
    };
    
    self.createPage = function (ph) {
        var df = Q.defer();
        var pageInitStart = new Date().getTime();
        ph.createPage(function (page, err) {
            df.resolve(page);
            //var pageInitEnd = new Date().getTime();
            //self.page = page;
            //$("#status").append("<br/>init page花了:" + (pageInitEnd - pageInitStart));
        });
        return df.promise;
    };
    
    self.openPage = function (page, url) {
        var df = Q.defer();
        page.open(url, function (status) {
            var resourceUrl = "";
            
            df.resolve({ page: page, status: status });
            //$("#resource").append(resourceUrl);
        });
        return df.promise;
    };
    
    self.evaluate = function (page) {
        var df = Q.defer();
        page.onResourceRequested(
                function (requestData, request) {
                    //if ((/http:\/\/.+?\.css/gi).test(requestData['url']) || requestData.headers['Content-Type'] == 'text/css') {
                    //    console.log('The url of the request is matching. Aborting: ' + requestData['url']);
                    //    request.abort();
                    //}
                    //console.log(JSON.stringify(request));
        },
                function (requestData) {
                    //console.log(requestData.toString());
        }
);
        page.evaluate(function (evaluateStatus) {
            return { document: document.title, status: evaluateStatus };
        }, function (result) {
            df.resolve(result);
        });
        return df.promise;
    }
    
    self.startScraping = function (page) {
        var pageRenderStart = new Date().getTime();
        //$("#status").append("<br/>startScraping");
        if (self.url == "") {
            self.ph.exit();
            return "";
        }
        
        var domainScraper = this;
        //var url = "http://" + this.domainList.pop();
        var url = this.url;
        //console.log("Processing: " + url);
        //.createPage(domainScraper.ph)
        domainScraper.openPage(page, url)
		//.then(function () {
		//    //page.set("viewportSize", { width: 1600, height: 790 });
		//    //var page = domainScraper.page;

        //        return domainScraper.openPage(page, url);
        //    })
        .then(function (obj) {
            return domainScraper.evaluate(obj.page, obj.status);
        })
        .then(function (obj) {
            //var result = { status: obj.status, url: url };
            //domainScraper.addResult(result);
            
            //if (obj.status == "success") {
            //    //obj.page.render(result.fileName);
            //    console.log("Rendered " + url);
            //}
            //console.log()
            var pageRenderEnd = new Date().getTime();
            $("#info").append("<br/>花了：" + (pageRenderEnd - pageRenderStart) + ":" + obj.document);
            return obj;
        })
		.done(function () {
            
            domainScraper.startScraping(page);
            self.ph.exit();
        });

    };
    
    this.scrape = function (url) {
        this.url = url;
        var domainScraper = this;
        
        this.createPhantom().then(function (ph) {
            domainScraper.ph = ph;
            domainScraper.createPage(domainScraper.ph).then(function (page) {
                domainScraper.page = page;
                $("#status").append("<br/>set page");
                domainScraper.startScraping(page);
            });
        });

    };
};

exports.DomainScraper = DomainScraper;