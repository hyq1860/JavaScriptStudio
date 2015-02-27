//http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript

function random(low, high) {
    return Math.random() * (high - low) + low;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function leftPad(str, length) {
    str = str == null ? '' : String(str);
    length = ~~length;
    pad = '';
    padLength = length - str.length;
    
    while (padLength--) {
        pad += '0';
    }
    
    return pad + str;
}

var numbers = new Array(10);
for (var i = 0; i < numbers.length; i++) {
    numbers[i] = randomIntInc(1, 10);
    console.log(numbers[i]);
}

var numbers = new Array(10);
for (var i = 0; i < numbers.length; i++) {
    numbers[i] = leftPad(randomIntInc(1, 10), 3);
    console.log(numbers[i]);
}