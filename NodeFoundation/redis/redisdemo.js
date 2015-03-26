//https://github.com/mranney/node_redis

var redis = require("redis"),
    client = redis.createClient({ detect_buffers: true });

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("foo_rand000000000000", "OK");

// This will return a JavaScript String
client.get("foo_rand000000000000", function (err, reply) {
    console.log(reply.toString()); // Will print `OK`
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});