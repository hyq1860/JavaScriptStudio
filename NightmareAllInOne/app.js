var Nightmare = require('nightmare');

var myScrape = new Nightmare(
    {
        loadImages: false,
        timeout: 2000,
        weak: false,

    }
);


//Start a loop.
for (i = 671315; i < 671320; i++) {
    myScrape
	.on('resourceRequested ',function(requestData, networkRequest){
	//console.log(requestData.url);
	
	var url = requestData.url;
	if(requestData.url.indexOf('.css')>0)
	{networkRequest.abort();}
        if (
            url.indexOf('cdn-apple') > 0 ||
            url.indexOf('fonts') > 0 ||
            url.indexOf('data:image') === 0 ||
            url.indexOf('securemetrics') > 0) return;
        console.log(requestData.method + ':' + url);
        if (requestData.method === 'POST') console.log(requestData);
	})
	.goto('http://item.jd.com/'+i+'.html')
	.wait()
    .evaluate(function(){
		var domPrice=document.querySelector('#jd-price');
		if(domPrice!=null)
		{
			return domPrice.innerHTML;
		}
		return "0";
	},
	function(result){
		console.log(result);
	});
}
myScrape.run();