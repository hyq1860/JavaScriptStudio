var Nightmare = require('nightmare');

var myScrape = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 100,
        proxy: '127.0.0.1:8087',
        output_encoding: 'gb2312'
        //phantomPath:'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\'
    }
);


myScrape
    .goto("http://quote.eastmoney.com/f1.html?code=000002&market=2")
    .evaluate(function () {
        return jsTimeSharingData;
}, function (result) {
    for (var i=0; i < result.data.length; i++) {
        var array = result.data[i].split(',');
        console.log(array[0]);
        console.log(array[1]);
        console.log(array[2]);
        console.log(array[3]);
    }
        
});
//http://quotes.money.163.com/trade/cjmx_000002.html#06d02
//myScrape
//    .goto("http://hqdigi2.eastmoney.com/EM_Quote2010NumericApplication/CompatiblePage.aspx?Type=OB&stk=0000022&Reference=xml&limit=0&page=1&rt=0.9733460071005027")
//    .evaluate(function () {
//    return { html: document };
//}, function (result) {
//    console.log(result);
//});


myScrape.run();
