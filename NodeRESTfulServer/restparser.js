function parse(input) {
    if(null == input || '' == input) return {};
    //È¥³ýURLÄ©¶ËµÄÐ±¸Ü	
    var str = removeSlashAtStartAndEnd(input);
    var slashIndex = str.indexOf('/');
    
    //controller
    //action
    /*
    if (slashIndex == -1 || slashIndex == str.length - 9)
        return {};

     */
    var array = str.split('/');
    var controller = array[0];
    var action = array[1];
	
    return {
        controller: controller,
        action: action
    };
}

function removeSlashAtEnd(str){
	if(str.charAt(str.length -1) == '/'){
		return str.substring(0, str.length -1);
	}
	return str;
}

function removeSlashAtStart(str) {
    if (str.charAt(0) == '/') {
        return str.substring(0, 1);
    }
    return str;
}

function removeSlashAtStartAndEnd(str) {
    if (str.charAt(0) == '/') {
        str=str.substring(1, str.length - 1);
    }

    if (str.charAt(str.length - 1) == '/') {
        str= str.substring(0, str.length - 1);
    }
    return str;
}
exports.parse = parse;