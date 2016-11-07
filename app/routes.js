'use strict';

var DBHandler = require('./controllers/dbHandler.js');

module.exports = function(app, passport) {
  function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('#/login');
		}
	}
	
	var dbHandler = new DBHandler();
	
  app.get("/loggedin", function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.post("/login", passport.authenticate('local-login'), function(req, res) {
    res.json(req.user);
  });

  app.post("/logout", function(req, res) {
    req.logOut();
    res.sendStatus(200);
  });
  
  app.post("/signup", dbHandler.signUpUser);
  
  app.get("/api/polls", dbHandler.getPolls);
  
  app.route('/api/:id/polls')
  	.get(isLoggedIn, dbHandler.getUserPolls)
  	.post(isLoggedIn, dbHandler.addPoll);
  	
	app.route('/api/user/:id')
  	.put(isLoggedIn, dbHandler.updateUser)
  	.delete(isLoggedIn, dbHandler.deleteUser);
  
  app.route('/api/poll/:id')
  	.get(dbHandler.getPoll)
  	.put(dbHandler.updatePoll)
  	.delete(isLoggedIn, dbHandler.deletePoll);
  
  app.get('/auth/facebook', function authenticateFacebook (req, res, next) {
    req.session.returnTo = '/#' + req.query.returnTo; 
    next ();
  },
  passport.authenticate ('facebook'));

  app.get('/auth/facebook/callback', function (req, res, next) {
    var authenticator = passport.authenticate ('facebook', {
      successRedirect: req.session.returnTo,
      failureRedirect: '/'
    });
    delete req.session.returnTo;
    authenticator (req, res, next);
  });
  
  app.get('/auth/twitter', function authenticateFacebook (req, res, next) {
    req.session.returnTo = '/#' + req.query.returnTo; 
    next ();
  },
  passport.authenticate ('twitter'));
  
  app.get('/auth/twitter/callback', function (req, res, next) {
    var authenticator = passport.authenticate('twitter', { 
      successRedirect: req.session.returnTo,
      failureRedirect: '/'
    }); 
    delete req.session.returnTo;
    authenticator (req, res, next);
  });
};