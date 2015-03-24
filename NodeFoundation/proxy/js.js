var data="";
$('#list > table > tbody > tr').each(function (index, item) {
        
        $(item).find('td').eq(0).each(function (i, e) {
            if (i == 0) {
                
                $(e).children().each(function (i1, e1) {
                    //console.log($(e1).attr('style'));
                    if ($(e1).attr('style')===undefined || ($(e1).attr('style').indexOf('none')==-1)) {
                        data += $(e1).text();
                    }

                   //data += $(e1).text()+"_";

                });
            }
            else if (i == 1) {
                
                data += ":"+$(e).text().split(';')[1];
            }
            else if (i == 2) {
                data += ":"+$(e).text();
            }   
                
        });
        data += "\n";
        
    });
    console.log(data);