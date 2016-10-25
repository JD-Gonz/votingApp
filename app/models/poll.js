'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
  creatorId: String,
  title: String,
  question: String,
  customOption: Boolean,
  options: Array
});

module.exports = mongoose.model('Poll', pollSchema);