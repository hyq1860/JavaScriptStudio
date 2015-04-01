var config = {};
var cheerio = require('cheerio');
var moment = require('moment');
config[1]=function(data) {
    var $ = cheerio.load(data.Html);
    var proxys = [];
    $('#list > table > tbody > tr').each(function (index, item) {
        var proxy = { IP: "", Port: null, Anonymous: null, Type: null, Speed: null, Flag: null, InDate: null, EditDate: null };
        $(item).find('td').each(function (i, e) {
            switch (i) {
                case 0:
                    $(e).children().each(function (i1, e1) {
                        if ($(e1).attr('style') !== undefined && $(e1).attr('style').indexOf('none') == -1 || $(e1).attr('style') === undefined) {
                            proxy.IP += $(e1).text();
                        }
                    });
                    break;
                case 1:
                    proxy.Port = $(e).text().split(';')[1];
                    break;
                case 2:
                    proxy.Anonymous = $(e).text();
                    break;
                case 3:
                    proxy.Type = $(e).text();
                    break;
                case 4:
                    break;
                case 5:
                    break;
            }
            

        });
        proxy.InDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        proxy.EditDate = proxy.InDate;
        proxy.Speed = 0, proxy.Flag = 1;
        proxys.push([proxy.IP, proxy.Port, proxy.Anonymous, proxy.Type, proxy.Speed, proxy.Flag, proxy.InDate, proxy.EditDate]);
    });
    return proxys;
}
config[2] = function (data) {
    var $ = cheerio.load(data.Html);
    var trs = $('table>tbody>tr');
    var proxys = [];
    trs.each(function (index, item) {
        var proxy = {};
        $(item).find('td').each(function(i, e) {
            switch (i) {
                case 0:
                    proxy.IP = $(e).text();
                    break;
                case 1:
                    proxy.Port = $(e).text();
                    break;
                case 2:
                    proxy.Anonymous = "";
                    break;
                case 3:
                    proxy.Type = "";
                    break;
                case 4:
                    break;
                case 5:
                    break;
            }
        });
        proxy.InDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        proxy.EditDate = proxy.InDate;
        proxy.Speed = 0, proxy.Flag = 1;
        proxys.push([proxy.IP, proxy.Port, proxy.Anonymous, proxy.Type, proxy.Speed, proxy.Flag, proxy.InDate, proxy.EditDate]);
    });
    return proxys;
}

module.exports = config;