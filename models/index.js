'use strict';

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/votingApp");

mongoose.set("debug", true);

module.exports.User = require("./user");