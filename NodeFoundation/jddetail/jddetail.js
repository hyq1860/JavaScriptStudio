var request = require('request');
var cheerio = require("cheerio");
var underscore = require("underscore")._;
var baseUrl = "http://182.92.167.82:5001/";
request(baseUrl+"spider/getproduct", function(error, response,body) {
    var result = {
        error: null,
        Data: {}
    }
    if (error)
        result.error = error;
    
    if (!error && response.statusCode == 404) {
        result.err = '404:not found';
    }
    
    var jsonData = JSON.parse(body);
    var url = "http://p.3.cn/prices/mgets?skuids=";
    underscore.each(jsonData, function (item, index) {
        if (index == jsonData.length - 1) {
            url += "J_" + item.Sku + "&type=1";
        } else {
            url += "J_" + item.Sku+",";
        }
    });
    request(url, function(error, response, body) {
        var data = JSON.parse(body);
        console.log(data);
    });
    console.log(url);
    //http://p.3.cn/prices/mgets?skuids=J_1028448,J_1278686,J_1278664,J_1134530,J_1183079,J_998692,J_816753,J_1134535,J_1344955256,J_1088101993,J_1183905131,J_1112961977,J_1217534295,J_1060249604,J_1089931791,J_1078998177,J_1107529743,J_1076270968,J_1176640790,J_1426161568,J_1376517526,J_1457138750,J_1090590901,J_1409635524,J_1038469616,J_1176666585,J_1335976198,J_1434288351,J_1183645917,J_1038558157&area=1_72_2799_0&type=1
    /*
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var data_str = $("script")[0].children[0].data.trim();
        
    }
     */
    //callback(result);
});


//库存
//http://search.jd.com/stock?skus=1217499%2C1217524%2C1217508%2C1300779%2C1217501%2C1057746%2C1217534%2C1221861%2C1217510%2C1217526%2C1160548%2C1279804%2C1023433%2C1260571%2C1286133%2C1217500%2C1217525%2C1057741%2C1278427%2C1185017%2C1217539%2C1217533%2C1217509%2C1299781%2C1301916%2C1318701%2C1301870%2C981821%2C1160245%2C1209642%2C1190394%2C1039043%2C1300419%2C1221854%2C1124332%2C1205405%2C1298447%2C1101144%2C1279453%2C1258204%2C1190400%2C1153414%2C919669%2C1023437%2C1057740%2C1443057838%2C1101135%2C917461%2C1178704%2C1264715%2C1138529%2C1097547%2C975641%2C1185016%2C1084276%2C1079888%2C1124331%2C1175898%2C1068358%2C1041685&district=1_72_2799&callback=get_stock_cb&callback=jQuery2515110&_=1427163716242

//价格
//http://p.3.cn/prices/mgets?skuids=J_1028448,J_1278686,J_1278664,J_1134530,J_1183079,J_998692,J_816753,J_1134535,J_1344955256,J_1088101993,J_1183905131,J_1112961977,J_1217534295,J_1060249604,J_1089931791,J_1078998177,J_1107529743,J_1076270968,J_1176640790,J_1426161568,J_1376517526,J_1457138750,J_1090590901,J_1409635524,J_1038469616,J_1176666585,J_1335976198,J_1434288351,J_1183645917,J_1038558157&area=1_72_2799_0&type=1


//http://zhushou.huihui.cn/productSense?jsonp=youdaogouwupi1427163720183&browser=firefox&version=4.0.0&vendor=youdao&av=3.0&extensionid=248e95b7-ed3a-3b37-98ab-aaeca58fb8c2&email=&pop=&k=00cc009562a36792007862a3679290728c07007862a367920078306888a4611d00784f4f689400788c1c4f4f00786bbb551988a48d7f306900854f044e7400b6007e00c3009500c400d000cb00d000b6007e00bc009500c400cb&nl=true&m=d8d8e8b9a8d7b8d8e8b9a8d7f8091919c9b8d7cc9bbbe9b8d74c5ccc0c68ccbc1c4ce9a8d75c7cbb68cb2c68ccbc1c4ce9a8d7e9a8d799b8d78ccccc0c&t=1427163720185