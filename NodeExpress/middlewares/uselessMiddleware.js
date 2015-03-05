//中间件demo示例
//var debug = require('debug')('uselessMiddlemare');
function useless(req,res,next) {
    //console.log("我是个什么都没做的中间件");
    //res.send('我是个什么都没做的中间件');
    //debug("我是个什么都没做的中间件");
    //交给下一个中间件处理
    next();
}
exports.useless = useless;