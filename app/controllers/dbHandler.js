/* global next */
'use strict';

var User = require('../models/user.js');
var Poll = require('../models/poll.js');

function PollHandler () {

	this.getPoll = function (req, res) {
		Poll
			.findOne({ 'title': req.poll.title })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
			});
	};
	
	this.getUserPolls = function (req, res) {
		Poll
			.find({})
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};
	
	this.getPolls = function (req, res) {
		Poll
			.find({})
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};
	
	this.addPoll = function (req, res) {
		Poll
			.insertOne(req.poll)
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};

	this.updatePoll = function (req, res) {
		Poll
			.findOneAndUpdate({ '_id': req.user._id }, req.user)
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
			});
	};
	
	this.deletePoll = function (req, res) {
		Poll
			.deleteOne({ '_id': req.user._id })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
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
	        var newUser = new User();
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