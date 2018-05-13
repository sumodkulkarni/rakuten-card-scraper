var express = require("express")
var nightmare = require('./nightmare.js')

var app = express();
var port = 8000;

var url = 'https://www.rakuten-card.co.jp/';

nightmare.beginNightmare(url)

app.listen(port);
console.log("server is listening on port " + port)
