// BASE SETUP
// =============================================================================
//'use strict';
//nodejs请求后端服务器的webapi
//var request = require('request');
//设置为生产环境
process.env.NODE_ENV = "development";//"production";

// call the packages we need
var express = require('express');        // call express
// set our port
var port = process.env.PORT || 5001;   
var app = express();                 // define our app using express

var bodyParser = require('body-parser');
//var multer = require('multer');
var path = require('path');
var request = require('request');

//template engine
/*
var ejs = require('ejs');
//ejs.open = '{{';
//ejs.close = '}}';

//注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
app.engine('.html', require('ejs').__express);
//设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
app.set('view engine', 'html');

//设置模板文件文件夹,__dirname为全局变量,表示网站根目录

app.set('views', __dirname + '\\views-ejs');
*/

/*handlebars engine 开始*/
//http://codyrushing.com/using-handlebars-helpers-on-both-client-and-server/
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
    layoutsDir: "views-hbs/layouts/",
    partialsDir: ['views-hbs/partials/'],
    defaultLayout:'main-jqm',
    extname: '.html',
    helpers: {
        json:function (context){ return JSON.stringify(context);}
    }

});

//
app.engine('.html', hbs.engine);
app.set('view engine', '.html');
app.set('views', __dirname + '\\views-hbs');
/*handlebars engine 结束*/

//静态文件
//app.use(express.static(path.join(__dirname, 'public')));
//统一加上前缀
//app.use("/static", express.static(path.join(__dirname, 'public')));  
// 静态文件目录
var staticDir = path.join(__dirname, 'public');
app.use('/public', express.static(staticDir, { maxAge: 31557600000 }));


//http://stackoverflow.com/questions/9092253/how-to-cache-with-manifest-node-js-site
//http://alistapart.com/article/application-cache-is-a-douchebag 
//chrome://appcache-internals/ 可以在chrome中查看缓存的东西
app.get("/manifest.appcache", function(req, res){
  res.header("Content-Type", "text/cache-manifest");
  res.end("CACHE MANIFEST");
});


// configure app to use bodyParser()
// this will let us get the data from a POST

//for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//for parsing application/json
app.use(bodyParser.json());

//multipart/form-data
//注意此中间件加了 会有一些问题 空闲在追究
//app.use(multer);
     

// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
/*
router.get('/', function (req, res) {
    //向页面模板传递参数，可以传递字符串和对象，注意格式
    res.render('index', {
        title: "handlebars example",
        header: "Some users"
    });
});
 */
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
/*
router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {
    
          // create a new instance of the Bear model
    var name=req.body.name;  // set the bears name (comes from the request)
    res.end(name);
});
*/

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/', router);

//自定义路由 外部
require('./routes/spider')(app);
require('./routes/proxy')(app);
require('./routes/about')(app);
require('./routes/index')(app);
//hbs路由示例
require('./routes/hbs')(app);
//后台管理
require('./routes/admin')(app);

//测试中间件
//var uselessMiddleware = require('./middlewares/uselessMiddleware');
//all方法表示，所有请求都必须通过该中间件，参数中的“*”表示对所有路径有效
//app.all("*", uselessMiddleware.useless);

/*
app.use('/book/:id', function(req, res) {
    console.log('ID:', req.params.id);
    res.end(req.params.id);
    //next();
});
*/

// 加载数据模块
var blogEngine = require('./blog');
app.get('/item/:id', function (req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('item', { title: entry.title, blog: entry });
});

app.get('/list/', function (req, res) {
    res.render('list', { layout: false,title: "最近文章", entries: blogEngine.getBlogEntries() });
});

app.get('/listb/', function (req, res) {
    res.render('list', {
        title: "最近文章", 
        entries: blogEngine.getBlogEntries(),
        // Overrides which layout to use, instead of the defaul "main" layout.
        layout: 'master',
    });
});

app.get('/api/', function (req, res) {
    request('http://182.92.167.82:5001/api/data', function (error, response, body) {
        var data = JSON.parse(body);
        res.json(data);
    });
});

//异常错误信息友好提示
if ('development' === app.get('env')) {
    app.use(function(err,req,res,next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error:err
        });
    });
}

// START THE SERVER
// =============================================================================
app.listen(port, function (err) {
    if (err) {
        console.log('express listen on port ' + err);
    }
    console.log('express listen on port ' + port);
});
