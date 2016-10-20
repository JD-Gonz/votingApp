'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  facebook: {
  	id: String,
  	token: String,
  	name: String
  },
  twitter: {
    id: String,
    token: String,
    name: String
  }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);