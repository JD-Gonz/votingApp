'use strict';

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var dotenv = require('dotenv');
var routes = require('./app/routes.js');
var mongoose = require("mongoose");

var app = express();

require('./app/config/passport')(passport);

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGO_URI);
mongoose.set("debug", true);

app.use(express.static(__dirname + '/public'));

app.use(session({
	secret: 'secretVotingApp',
	resave: false,
	saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

dotenv.load();

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});