require('dotenv').config();

var app = require('./express');
var express = app.express;

var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var favicon = require('serve-favicon');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/src/public'));
app.use(favicon(__dirname + '/src/public/assets/images/favicon.ico'));

require("./src/app.js");

app.listen(process.env.PORT || 5000);