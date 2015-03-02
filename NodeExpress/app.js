// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');

//template engine
var ejs = require('ejs');
//ejs.open = '{{';
//ejs.close = '}}';

//注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
app.engine('.html', require('ejs').__express);
//设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
app.set('view engine', 'html');
//设置模板文件文件夹,__dirname为全局变量,表示网站根目录
app.set('views', __dirname + '\\views');

app.use(express.static(__dirname + '\\public'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    var users = [
        { name: 'tobi', email: 'tobi@learnboost.com' },
        { name: 'loki', email: 'loki@learnboost.com' },
        { name: 'jane', email: 'jane@learnboost.com' }
    ];
    //向页面模板传递参数，可以传递字符串和对象，注意格式
    res.render('index', {
        users: users,
        title: "EJS example",
        header: "Some users"
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

app.use('/book/:id', function(req, res, next) {
    console.log('ID:', req.params.id);
    res.end(req.params.id);
    next();
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);