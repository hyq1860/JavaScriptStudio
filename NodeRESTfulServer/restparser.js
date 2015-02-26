var common = require('./common');

function parse(input) {
    if(common.isNullOrEmpty(input)) return {};
    //È¥³ýURLÄ©¶ËµÄÐ±¸Ü	
    var str = removeSlashAtStartAndEnd(input);
    
    var array = str.split('/');
    if (array == null || array.length < 1) {
        return {};
    }
	
    return {
        controller: array[0],
        action: array[1]
    };
}

function removeSlashAtStartAndEnd(str) {
    if (str.charAt(0) == '/') {
        str=str.substring(1, str.length);
    }

    if (str.charAt(str.length - 1) == '/') {
        str= str.substring(0, str.length - 1);
    }
    return str;
}
exports.parse = parse;