/*
console.log(1);
setTimeout(function() {
    console.log(2);
}, 1000);
console.log(3);
*/

console.log(4);
setTimeout(function () {
    console.log(5);
}, 0);
console.log(6);


process.nextTick(function() {
    console.log(7);
    process.nextTick(function() {console.log(8)});
})