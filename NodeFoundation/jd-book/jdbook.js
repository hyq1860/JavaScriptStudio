//npm install jd-book
var jdBook = require('jd-book');
var url = 'http://item.jd.com/958912.html';
var show = function (data) {
    if (!data.err)
        console.log(data.book);
}
jdBook.getbook(url, show);