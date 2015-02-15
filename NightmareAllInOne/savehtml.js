var fs = require('fs');
var Nightmare = require('nightmare');
var web = new Nightmare({
    weak: false,
    timeout: 10000
});
web.goto('http://item.jd.com/1279453.html')
    .evaluate(function () {
        return { html: document.documentElement.innerHTML };
}, function (html) {
        var pid = web.pid();
        var temphtml = html;
        fs.writeFileSync('./baidu.html', temphtml.html, 'UTF-8');
    })
.run();