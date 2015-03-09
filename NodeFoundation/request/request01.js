var async = require('async');
var request = require('request');
var qs = require('querystring');

var r = request.defaults({ '8080': 'http://218.78.210.190' });
var cheerio = require('cheerio');
var urls = [
  // a list of 100 urls
];

// Your form fields 
var params = {
    field_A : "value a",
    field_B : "value b",
}



//http://www.zhihu.com/question/21090450

//http://p.3.cn/prices/get?skuid=J_1217534295&type=1&area=1_72_2799&callback=cnp

//http://p.3.cn/prices/mgets?skuids=J_1028448,J_1278686,J_1278664,J_1134530,J_1183079,J_998692,J_816753,J_1134535,J_1344955256,J_1088101993,J_1183905131,J_1112961977,J_1217534295,J_1060249604,J_1089931791,J_1078998177,J_1107529743,J_1076270968,J_1176640790,J_1426161568,J_1376517526,J_1457138750,J_1090590901,J_1409635524,J_1038469616,J_1176666585,J_1335976198,J_1434288351,J_1183645917,J_1038558157&area=1_72_2799_0&type=1

//http://jprice.360buy.com/pageadword/971464-1-1-1_72_4137_0.html

//http://skymoneyc.com/2014/08/15/jd-crawl.html

//http://p.3.cn/prices/mgets?skuIds=J_971464,J_971468&area=1_72_4137_0
for (var i = 0; i < 1; i++) {
    // Append query string to your url
    urls.push("http://p.3.cn/prices/get?skuid=J_1217534295&type=1&area=1_72_2799"+ qs.stringify(params));
}

function makeRequest(url, callback) {
    /* make a http request */
    r(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body); // Show the HTML for the Google homepage.
            //$ = cheerio.load(body);
            var data = JSON.parse(body);
            console.log(data[0].p);
            callback();
        } else {
            callback();
        }
    });
    //callback(); // when done, callback
}

async.eachLimit(urls, 1, makeRequest, function (err) {
    if (err) throw err;
});

console.log("1");


/*
 * cookie 
 * refer
 * */


