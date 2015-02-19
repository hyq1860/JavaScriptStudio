//formidable
var formidable = require('formidable'), urlParser = require('url').parse, util = require('util');
//queryString = require('qs'), 
//�Զ����ڲ��¼�
var _events = ['list', 'retrieve', 'putCollection', 'update', 'create', 'postMember', 'deleteCollection', 'deleteMember'];

function router(req, res, resource, callback){
	var method = req.method.toUpperCase();
	//��HTTP����ӳ�䵽�Զ����¼�
	//var event = emitEvent(method, req.resource);
	console.log('resource: ' + resource);
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
	fn = model[resource];
	fn(req.resource.id, req.params, function(result){
		console.log('Execute result');
		console.log(result);
		var stringfyResult = JSON.stringify(result);
		callback(stringfyResult);
	});
}
function emitEvent(method, resource){
	 var  localEvent;
	 switch(method){
		case 'GET' : 
				localEvent = resource.id == 0 ? 'list' : 'retrieve'; break;
		case 'PUT' : 
				localEvent = resource.id == 0 ? 'putCollection' : 'update'; break;
		case 'POST' : 
				localEvent = resource.id == 0 ? 'create' : 'postMember'; break;
		case 'DELETE' : 
				localEvent = resource.id == 0 ? 'deleteCollection' : 'deleteMember'; break;	
	 }
	 return localEvent;
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