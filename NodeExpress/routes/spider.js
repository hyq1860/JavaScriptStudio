//spider先关路由
var request = require('request');
module.exports = function(app) {
    app.get('/spider/', function(req, res) {
            //res.send('spider');
            var r = null;
            if (req.method === 'POST') {
                r = request.post({ uri: url, json: req.body });
            } else {
                r = request(url);
            }

            req.pipe(r).pipe(res);
            req.pipe(request('http://127.0.0.1:8081/api/data')).pipe(res);
        })
        .post('/spider/', function(req, res) {
            req.pipe(request.post('http://127.0.0.1:8081/api/data', { form: req.body })).pipe(res);
            //req.pipe(request('http://127.0.0.1:8081/api/data')).pipe(res);
            //res.json(JSON.stringify(req.body));
        });
};