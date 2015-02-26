//formidable
var formidable = require('formidable');
var urlParser = require('url').parse;
var util = require('util');
//queryString = require('qs'), 
//�Զ����ڲ��¼�
var _events = [''];
//����
var debug = require('debug')('nodejs-server');
function router(req, res, resource, callback){
	var method = req.method.toUpperCase();
	//��HTTP����ӳ�䵽�Զ����¼�
	//var event = emitEvent(method, req.resource);
    debug('resource: ' + JSON.stringify(resource));
	if(supportEvent(resource)){
		//ִ��HTTP����
	    return execute(req, resource, callback);
	}else{
		return 'No supported event found!';
	}
}

function execute(req, resource, callback){
	req.params = req.params || {};
	if(req.method === 'POST' || req.method === 'PUT'){
		//����POST / PUT�����е�������
		var form = new formidable.IncomingForm();
	    form.on('field', function(field, value) {
	        req.params[field] = value;
	    }).on('end', function() {
	        //�����������ؽ����������Ӧ��Module��������
	        return invoke(req, resource, callback);
	    });

	    form.parse(req);
	}else{
		//����GET / DELETE����ֱ�ӵ�����Ӧ��Module��������
		var urlParams = urlParser(req.url, true).query;
		clone(req.params, urlParams);
		return invoke(req, resource, callback);
	}
}

function invoke(req, resource, callback){
	//���ض�Ӧ����Դ����Module
	var module = require( './model/' + resource.controller+"_controller"),
	model = new module.dao(),
	fn = model[resource.action];
	fn(req.resource.id, function(result){
        debug('Execute result');
		var stringfyResult = JSON.stringify(result);
		callback(stringfyResult);
	});
}

function supportEvent(event) {
    return true;
	var result = false;
	_events.forEach(function(_event){
		if(event === _event){
			result = true;
		}
	});
	return result;
}

function clone(obj1, obj2){
	for(var key in obj2){
		obj1[key] = obj2[key];
	}
}
exports.router = router;