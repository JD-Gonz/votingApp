'use strict';

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var dotenv = require('dotenv');
var routes = require('./routes.js');

var app = express();
app.use(express.static(__dirname + '/public'));


require('./config/passport')(passport);

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