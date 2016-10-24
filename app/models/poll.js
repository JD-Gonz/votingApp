'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
  title: String,
  creatorId: String,
  options: Object
});

module.exports = mongoose.model('Poll', pollSchema);