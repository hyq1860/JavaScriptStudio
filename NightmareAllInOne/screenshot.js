var Nightmare = require('nightmare');
var Screenshot = require('nightmare-screenshot');
var nightmare = new Nightmare();
nightmare
    .viewport(1024, 700)
    .goto("http://www.baidu.com")
    .use(Screenshot.screenshotSelector('D:\\1.jpg', '.s_form_wrapper'));
nightmare.run();