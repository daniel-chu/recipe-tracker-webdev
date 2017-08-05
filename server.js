require('dotenv').config();

var app = require('./express');
var express = app.express;

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/src/public'));

require("./src/app.js");

app.listen(process.env.PORT || 5000);
