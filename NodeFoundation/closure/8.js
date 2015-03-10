//Emulating private methods with closures
//模拟私有方法
var counter = (function () {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function () {
            changeBy(1);
        },
        decrement: function () {
            changeBy(-1);
        },
        value: function () {
            return privateCounter;
        }
    };
})();

console.log(counter.value()); /* Alerts 0 */
counter.increment();
counter.increment();
console.log(counter.value()); /* Alerts 2 */
counter.decrement();
console.log(counter.value()); /* Alerts 1 */