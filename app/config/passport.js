'use strict';

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require("passport-twitter").Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./oauth');
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

	passport.use('local-login', new LocalStrategy({
  	  usernameField: 'email',
      passwordField: 'password'
    },
	  function(username, password, done) {
	    User.findOne({
	      email: username.toLowerCase()
	    }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);   
          }
          if (!user.validPassword(password)) {
            return done(null, false);   
          }
          return done(null, user);
      });
    }
  ));

  passport.use(new FacebookStrategy({
     clientID: configAuth.facebookAuth.clientID,
     clientSecret: configAuth.facebookAuth.clientSecret,
     callbackURL: configAuth.facebookAuth.callbackURL
  },

  function(token, refreshToken, profile, done) {
     process.nextTick(function() {
         User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
           if (err) {
             return done(err);
           }
           if (user) {
               return done(null, user);
           } else {
             var newUser = new User();
             newUser.facebook.id    = profile.id;                  
             newUser.facebook.token = token;
             newUser.facebook.name  = profile.displayName;
  
             newUser.save(function(err) {
                 if (err) {
                   throw err;
                 }
                 return done(null, newUser);
             });
           }
         });
     });
  }));
  
  passport.use(new TwitterStrategy({
     consumerKey: configAuth.twitterAuth.consumerKey,
     consumerSecret: configAuth.twitterAuth.consumerSecret,
     callbackURL: configAuth.twitterAuth.callbackURL
  },

  function(token, refreshToken, profile, done) {
     process.nextTick(function() {
         User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
           if (err) {
             return done(err);
           }
           if (user) {
               return done(null, user);
           } else {
             var newUser = new User();
             newUser.twitter.id = profile.id;                  
             newUser.twitter.token = token;
             newUser.twitter.name = profile.displayName;
  
             newUser.save(function(err) {
                 if (err) {
                   throw err;
                 }
                 return done(null, newUser);
             });
           }
         });
     });
  }));
};
