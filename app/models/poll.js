'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Option = new Schema({
  option : String,
  votes : Number
});

var pollSchema = new Schema({
  creatorId: String,
  title: String,
  question: String,
  customOption: Boolean,
  options:[Option]
});

module.exports = mongoose.model('Poll', pollSchema);