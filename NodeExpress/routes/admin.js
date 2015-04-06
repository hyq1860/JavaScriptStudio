//spider先关路由
//http://melon.github.io/blog/2014/12/08/nodejs-agent-and-size-limit-of-get-method/
var request = require('request');
var dao = require('../dao/proxydao');
var productDao = require('../dao/mysqldao');
var debug = require('debug')('hbs');
module.exports = function (app) {
    app.get('/admin/', function(req, res) {
        productDao.getProducts(1,10).then(function(data) {

            //向页面模板传递参数，可以传递字符串和对象，注意格式
            //var products = JSON.stringify(data);
            //res.render('index', { datas: data });
            res.render('product', { layout:false, datas: data });
        });
    })
    .get('/admin/productpaging/:id',function(req, res) {
        productDao.getProducts(req.params.id,20).then(function (data) {
            
            //向页面模板传递参数，可以传递字符串和对象，注意格式
            //var products = JSON.stringify(data);
            //res.render('index', { datas: data });
            res.json(data);
        });
    });
    ;
};