var fs = require('fs');
var Nightmare = require('nightmare');
new Nightmare({
    weak: false,
    timeout: 10000
    })
  .goto('http://item.jd.com/1279453.html')
    .evaluate(function () {
        return { html: document.documentElement.innerHTML };
    }, function (html) {
    var temphtml = html;
    fs.writeFileSync('./baidu.html', temphtml.html,'UTF-8');
})
.run();