var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
var Schema = mongoose.Schema;

// default behavior
var testSchema = new Schema({ name: String });
testSchema.statics.findByName = function (name, cb) {
    this.find({ name: new RegExp(name, 'i') }, cb);
}
var Page = mongoose.model('Page', testSchema);



//var p = new Page({ name: 'mongodb.org' });
//console.log(p); // { _id: '50341373e894ad16347efe01', name: 'mongodb.org' }

// disabled _id
//var schema = new Schema({ name: String }, { _id: false });

// Don't set _id to false after schema construction as in
// var schema = new Schema({ name: String });
// schema.set('_id', false);

//var Page = mongoose.model('Page', schema);
var p = new Page({ name: 'mongodb.org' });
console.log(p); // { name: 'mongodb.org' }

// MongoDB will create the _id when inserted
Page.findByName(p, function (err, doc) {
    if (err) {
        console.log(err);
    }

    if (doc&&doc.length==0) {
        p.save(function (err1) {
            if (err1) {
                console.log(err1);
            }
   
            console.log(doc); // { name: 'mongodb.org', _id: '50341373e894ad16347efe12' }
        });
    } else {
        console.log('已经存在');
    }
});
