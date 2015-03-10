//spider先关路由
//http://melon.github.io/blog/2014/12/08/nodejs-agent-and-size-limit-of-get-method/
var request = require('request');
var debug = require('debug')('spider');
module.exports = function(app) {
    app.get('/spider/', function(req, res) {
        //res.send('spider');
            debug("spider:get");
            var r = null;
            if (req.method === 'POST') {
                r = request.post({ uri: url, json: req.body });
            } else {
                r = request("http://182.92.167.82:5001/api/data");
            }

            req.pipe(r).pipe(res);
            //req.pipe(request('http://127.0.0.1:8081/api/data')).pipe(res);
        })
        .post('/spider/', function(req, res) {
        req.pipe(
            request.post('http://182.92.167.82:50011/api/data/', { form: req.body }, function (err, httpResponse, body) {
                if (err) {
                    debug("错误信息：" + err);
                }
            }))
            .pipe(res);
            //req.pipe(request('http://127.0.0.1:8081/api/data')).pipe(res);
            //res.json(JSON.stringify(req.body));
        });
};

//request pipe异常处理
//http://stackoverflow.com/questions/20196223/error-handling-on-request-piping
/*
app.post('/server1', function (req, res, next) {
    var request = require('request');
    var pipe = req.pipe(request.post('/server2'));
    var response = [];
    
    pipe.on('data', function (chunk) {
        response.push(chunk);
    });
    
    pipe.on('end', function () {
        var res2 = Buffer.concat(response);
        console.log(res2);
    // don't forget to end the 'res' response after this!

  });
});
 * */
/*
app.all( '/proxy/*', function( req, res ){
  req.pipe( request({
      url: config.backendUrl + req.params[0],
      qs: req.query,
      method: req.method
  }, function(error, response, body){
    if (error.code === 'ECONNREFUSED'){
      console.error('Refused connection');
    } else { 
      throw error; 
    }
  })).pipe( res );
});
 */