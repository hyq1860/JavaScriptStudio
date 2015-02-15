var Spider = require("./qphantom.js");
var ds = new Spider.DomainScraper();
var result = ds.scrape("http://www.baidu.com/");
ds.scrape("http://www.baidu.com/");
