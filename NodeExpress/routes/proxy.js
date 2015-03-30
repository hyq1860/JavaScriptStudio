//spider先关路由
//http://melon.github.io/blog/2014/12/08/nodejs-agent-and-size-limit-of-get-method/
var request = require('request');
var dao = require('../dao/proxydao');
var debug = require('debug')('proxy');
module.exports = function(app) {
    app.get('/proxy/getproxy', function(req, res) {
            dao.getProxys().then(function(data) {
                res.json(data);
            });
        })
        .get('/proxy/getproxysites', function(req, res) {
            dao.getProxySites().then(function(data) {
                res.json(data);
            });
        })
        .post('/proxy/saveProxySource', function(req, res) {
            dao.saveProxySource(req.body.ProxySource, function(error) {
                if (error) {
                    res.end(error);
                } else {
                    res.json({ success: true });
                }
            });

        })
        .post('/proxy/', function(req, res) {
            dao.addProxys(req.body.proxys, function(error) {
                if (error) {
                    res.end(error);
                } else {
                    res.json({ success: true });
                }
            });

        })
        .post('/proxy/update', function(req, res) {
            dao.updateProxy(req.body.params, function(error) {
                if (error) {
                    res.end(error);
                } else {
                    res.json({ success: true });
                }
            });

        });
};

