var request = require('request');

var data = [
    { url: "http://www.baidu.com", html: null },
    { url: "http://www.sogou.com", html: null },
    { url: "http://www.google.com.hk", html: null }
];

data.forEach(function (key) {
    
    console.log("crawling " + key.url + "....");
    request.get(key.url, function (err, res, body) {
        if (!err) {
            
            key.html = body;
            console.log("finisded " + key.url + " len:" + body.length);
        }
    });
     
});