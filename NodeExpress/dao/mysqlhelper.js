var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '182.92.167.82',
    user: 'root',
    password: '5mckMf09MD4n',
    database: 'anthor',
    port: 3306
});
conn.connect();
conn.query('SELECT * from test', function (err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].name);
});
conn.end();