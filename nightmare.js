var Nightmare = require('nightmare')
var cheerio = require("cheerio")
var fs = require('fs');
var async = require("async")
var login = require('./login-credentials.js')

var nightmare = Nightmare();
var email = login.getEmail();
var password = login.getPassword();

var beginNightmare = function(url){
	console.log('email = ', email)
	console.log('password = ', password)
	nightmare
	.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
	.goto(url)
	.type('#u', email)
	.type('#p', password)
	.click('#indexForm > fieldset > button')
	.wait(5000)
	.screenshot('./files/after-login.png')
	.goto('https://www.rakuten-card.co.jp/e-navi/members/statement/index.xhtml?tabNo=0')
	.wait(2000)
	.screenshot('./files/usage-details.png')
 	.end()
	.then(function(){
  	console.log("done");
	})
}	

module.exports = {
  beginNightmare
}
