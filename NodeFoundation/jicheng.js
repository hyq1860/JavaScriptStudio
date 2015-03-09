var util = require('util');
var events = require('events');

var User=function(options) {
    var self = this;
    events.EventEmitter.call(this);

    self.name = options.name;
    self.age = options.age;
    
    //do some async operation

    setImmediate(function() {
        self.emit('ready');
    });
}

util.inherits(User, events.EventEmitter);


var alsotang = new User({ name: 'alsotang', age: 3 });
alsotang.on('ready', function () {
    // do what you want
    console.log('I am ready');
})