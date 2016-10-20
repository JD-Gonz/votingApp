'use strict';

var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({
  title: String,
  creatorId: String,
  options: Object
});

module.exports = mongoose.model('Poll', pollSchema);