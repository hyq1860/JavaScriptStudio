var kue = require('kue');
var queue = kue.createQueue();
var fs = require('fs');



queue.process('email', function (job, done) {
    email(job.data, done);
});

function email(data, done) {
    if (false) {
        //done('invalid to address') is possible but discouraged
        return done(new Error('invalid to address'));
    }
    // email send stuff...
    fs.writeFile("D:\\github\\JavaScriptStudio\\NodeFoundation\\kue\\test.txt", JSON.stringify(data));
    //console.log(address);
    done();
};

kue.app.listen(3000);

//postman
//127.0.0.1:3000/job

//type email
//data 1111