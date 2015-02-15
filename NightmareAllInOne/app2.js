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


//Start a loop.
for (i = 11577580; i < 11577880; i++) {
    //var ttime1 = (new Date()).getTime();
    myScrape
        .on('resourceRequested', function(requestData, networkRequest) {
            var url = requestData.url;
            if (url.indexOf('.css') > 0) {
                return;
            }
        })
        .goto('http://item.jd.com/' + i + '.html')
        .evaluate(function() {
                var domPrice = document.querySelector('#J_price_trigger'); //document.querySelector('#jd-price');
                if (domPrice != null) {
                    return domPrice.innerHTML;
                }
                var offline = document.querySelector(".itemover-title>h3>strong");
                var meihuo = "";
                if (offline != null) {
                    meihuo = offline.innerHTML;
                }
                var offline2 = document.querySelector(".m-itemover-title>h3>strong");
                if (offline2 != null) {
                    meihuo = offline2.innerHTML;
                }
                return meihuo;
            },
            function(result) {
                console.log(result);
            });
    //console.log(((new Date()).getTime() - ttime1) / 1000.000 + "秒");
}
myScrape.run();