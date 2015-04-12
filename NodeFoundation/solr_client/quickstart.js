var solr = require('solr-client');
var querystring = require("querystring");
// Create a client
//var client = solr.createClient();
var client = solr.createClient('127.0.0.1', '8983', 'new_core_1', '/solr');
//http://stackoverflow.com/questions/6554039/how-do-i-url-encode-something-in-node-js
var key = querystring.escape('笔记本 联想');
var query = 'q=name:' + key + '&wt=json&indent=true';

client.get('select', query, function (err, obj) {
    if (err) {
        console.log(err);
    } else {
        console.log(obj);
    }
});