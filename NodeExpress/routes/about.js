module.exports=function(app) {
    app.get('/about', function(req, res) {
        res.sendfile('./views-hbs/about.html');
    });
}