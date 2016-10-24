/* global next */
'use strict';

var User = require('../models/user.js');
var Poll = require('../models/poll.js');

function PollHandler () {

	this.getPolls = function (req, res) {
		Poll
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result.nbrClicks);
			});
	};

	this.addPoll = function (req, res) {
		Poll
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result.nbrClicks);
			});
	};

	this.updatePoll = function (req, res) {
		Poll
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result.nbrClicks);
			});
	};
	
	this.deletePoll = function (req, res) {
		Poll
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result.nbrClicks);
			});
	};
	
	this.signUpUser = function (req, res) {
		User
			.findOne({ 'username': req.user.email }) 
			.exec(function(err, user) {
	    	if (user) {
	        res.json(null);
	        return err;
	      } else {
	        var newUser = new db.User();
	        newUser.email = req.user.email.toLowerCase();
	        newUser.firstName = req.user.fName;
	        newUser.lastName = req.user.lName;
	        newUser.password = newUser.generateHash(req.user.password);
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
  }; 

}

module.exports = PollHandler;