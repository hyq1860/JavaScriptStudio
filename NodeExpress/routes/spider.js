//spider先关路由
//http://melon.github.io/blog/2014/12/08/nodejs-agent-and-size-limit-of-get-method/
var request = require('request');
var dao = require('../dao/mysqldao');
var focusProductDao = require('../dao/focusproductdao');
var debug = require('debug')('spider');
module.exports = function(app) {
    app.get('/spider/gettask', function(req, res) {
            dao.getCategory().then(function(data) {
                res.json(data);
            });
        }).
        get('/spider/getproduct', function(req, res) {
            dao.getProducts().then(function(data) {
                res.json(data);
            });
        }).
        get('/spider/skipJdCategory', function(req, res) {
            dao.skipJdCategory(req.params.id).then(function(data) {
                res.json({ success: true });
            });
        })
        .get('/spider/addcategorytask', function(req, res) {
            dao.updateJDCategoryTask();
            res.json({ success: true });
        })
        .post('/spider/', function(req, res) {
            dao.addProducts(req.body.products);
            dao.updateJDCategory(req.body.categoryId, req.body.pageIndex);
            res.json({ success: true });
        })
        .post('/spider/focusproduct', function(req, res) {
            focusProductDao.addFocusProducts(req.body.focusproducts).then(function() {
                res.json({ success: true });
            }, function(error) {
                res.json({
                    success: false,
                    msg: error
                });
            });
        });
};

