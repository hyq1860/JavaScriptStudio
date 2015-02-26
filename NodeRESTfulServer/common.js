function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isEmptyOrWhiteSpace(str) {
    return (str.length === 0 || !str.trim());
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function isNullOrEmpty(str) {
    return (str === undefined || str == null || str === "" || 0 === str.length);
}

function stringify (obj) {
    var seen = [];
    var json = JSON.stringify(obj, function (key, value) {
        if (typeof value === 'object') {
            if (!seen.indexOf(value)) {
                return '__cycle__' + (typeof value) + '[' + key + ']';
            }
            seen.push(value);
        }
        return value;
    }, 4);
    return json;
};

//对向深拷贝
function deepClone(obj, stack) {
    stack = stack || [];
    var t;
    if (obj == null) {
        return t;
    }
    if (util.isArray(obj)) {// 数组
        var instance = deepClone.getStack(obj, stack);
        if (instance) {
            return instance;
        }
        var len = obj.length;
        t = new Array(len);
        stack.push([obj, t]);
        for (var i = 0; i < len; i++) {
            t[i] = deepClone(obj[i]);
        }
    } else if (typeof obj == "object") {
        var instance = deepClone.getStack(obj, stack);
        if (instance) {
            return instance;
        }
        t = {};
        stack.push([obj, t]);
        for (var k in obj) {
            t[k] = deepClone(obj[k]);
        }
    } else {
        t = obj;
    }
    return t;
}
deepClone.getStack = function (obj, stack) {
    for (var i = stack.length; i--;) {
        if (stack[i][0] === obj) {
            return stack[i][1];
        }
    }
    return null;
};

exports.isEmpty = isEmpty;
exports.isEmptyOrWhiteSpace = isEmptyOrWhiteSpace;
exports.isBlank = isBlank;
exports.isNullOrEmpty = isNullOrEmpty;
exports.stringify = stringify;