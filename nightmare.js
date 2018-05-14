var Nightmare = require('nightmare')
var cheerio = require("cheerio")
var fs = require('fs');
var async = require("async")
var login = require('./login-credentials.js')

var nightmare = Nightmare();
var email = login.getEmail();
var password = login.getPassword();

var beginNightmare = function(url){
	nightmare
	.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
	.goto(url)
	.type('#u', email)
	.type('#p', password)
	.click('#indexForm > fieldset > button')
	.wait(5000)
	.screenshot('./files/after-login.png')
	.goto('https://www.rakuten-card.co.jp/e-navi/members/statement/index.xhtml?tabNo=7')
	.wait(2000)
	.evaluate(function() {
		return document.documentElement.innerHTML;
	})
	.then(function(html) {
		var $ = cheerio.load(html);
		var expensesTable = $('span[id="tableStyle01 textStyle01 thStyle01"]').html()
		fs.appendFile('expensesTable.html', expensesTable, function(err) {
			if (err) console.log('error = ', err);
			else console.log('Saved file')
		})
	});
}	

module.exports = {
  beginNightmare
}