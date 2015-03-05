//spider先关路由
module.exports=function(app) {
    app.get('/spider/',function(req,res) {
        res.send('spider');
    });
}