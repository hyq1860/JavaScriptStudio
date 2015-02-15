var Nightmare = require('nightmare');

var myScrape = new Nightmare(
    {
        loadImages: false,
        webSecurity: false,
        weak: false,
        timeout: 5000,
        port: 10005
    }
);
myScrape.on('resourceRequested', function(requestData, networkRequest) {
        var url = requestData.url;
        if (url.indexOf('.css') > 0) {
            return;
        }
    })
    .goto('http://image.baidu.com/channel/star')
    .inject('js', 'jquery-2.1.1.min.js')
    .evaluate(function () {
        var imageUrl="";
        $('.topn-star-img').each(function(index,element) {
            imageUrl += $(element).next().text()+$(element).children().attr("src");
        });
            return imageUrl;       
        },
        function(result) {
            console.log(result);
        });
    //console.log(((new Date()).getTime() - ttime1) / 1000.000 + "秒");

myScrape.run();
