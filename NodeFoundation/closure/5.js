var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc: function() {
        return function () {
            //this作用域的问题
            return this.name;

        };
    }

};

console.log(object.getNameFunc()());