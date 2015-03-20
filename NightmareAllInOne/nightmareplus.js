//https://github.com/segmentio/nightmare/issues/162
//How can I make the phantom instance to load the website without loading their js files just like NoScript?
/*
nightmare
  .noJS(true)
  .viewport(1920, 1080)
  .goto('http://angularjs.org')
  .screenshot('./test.jpg')
  .wait()
  .run(function (err, nightmare) {
    if (err) console(err);
    console.log('done!!');
});
 */
/**
 * Enable/Disable JavaScript.
 *
 * @param {Boolean} useragent
 * @param {Function} done
 */

exports.noJS = function (value, done) {
    debug('.noJS() to ' + value);
    this.page.set('settings.javascriptEnabled', !value, done);
};