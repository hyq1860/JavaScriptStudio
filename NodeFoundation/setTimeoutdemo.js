var t = setTimeout(function() {
    console.log("setTimeout");
}, 10000);
console.log(t);
setTimeout(function() {
    clearTimeout(t);
}, 200000);
