var request = require('request');
var cookieRequest = function (userRequest, userResponse, url, callback) {
    var options = {
        url: url,
        headers: {}
    };
    options.headers.Cookie = userRequest.header('Cookie'); // 将用户的 Cookie 传递给后台服务器
    
    request(options, function (error, response, body) {
        userResponse.setHeader('Cookie', response.headers.cookie);
        callback.apply(null, arguments);
    });
};