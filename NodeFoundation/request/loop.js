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

request.get("http://app.data.qq.com/?umod=astro&act=astro&a=aries&t=19&jsonp=0&func=aa", function (err, res, body) {
        if (!err) {
var data=JSON.parse(body);
            data.forEach(function(key){
console.log(key.astro);
});
            //console.log(body);
        }
    });