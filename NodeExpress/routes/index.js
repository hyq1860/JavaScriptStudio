//spider先关路由
//http://melon.github.io/blog/2014/12/08/nodejs-agent-and-size-limit-of-get-method/
var dao = require('../dao/mysqldao');
var debug = require('debug')('product');
module.exports = function (app) {
    app.get('/product/', function(req, res) {
            dao.getProducts().then(function(data) {

                //向页面模板传递参数，可以传递字符串和对象，注意格式
                //var products = JSON.stringify(data);
                res.render('index', { datas: data });
            });
        }).
        get('/product/getproduct', function(req, res) {
            dao.getProducts().then(function(data) {
                res.json(data);
            });
        }).get("/", function(req, res) {
            res.render('index');
        });
};

