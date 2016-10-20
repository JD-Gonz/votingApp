/* global next */
'use strict';

var db = require("./models");
var PollHandler = require('./controllers/pollHandler.server.js');

module.exports = function(app, passport) {
  function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	var pollHandler = new PollHandler();
  
  app.post("/login", passport.authenticate('local-login'), function(req, res) {
    res.json(req.user);
  });

  app.post("/logout", function(req, res) {
    req.logOut();
    res.send(200);
  });

  app.get("/loggedin", function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.post("/signup", function(req, res) {
    db.User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (user) {
        res.json(null);
        return err;
      } else {
        var newUser = new db.User();
        newUser.username = req.body.username.toLowerCase();
        newUser.password = newUser.generateHash(req.body.password);
        newUser.save(function(err, user) {
          if (err) {return err;}
          req.login(user, function(err) {
            if (err) {
              return next(err);
            }
            res.json(user);
          });
        });
      }
    });
  }); 
  
  // app.route('/api/:id/clicks')
		// .get(isLoggedIn, pollHandler.getPolls)
		// .post(isLoggedIn, pollHandler.updatePoll)
		// .delete(isLoggedIn, pollHandler.resetClicks);

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