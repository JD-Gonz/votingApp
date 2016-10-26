/* global angular app */
'use strict';

app.factory("VoteService", function() {
  this.vote = function(poll, choice, userOption){
    if (choice === "customOption") {
      poll.options.push({"option":userOption.trim(), "votes": 1});
    } else {
      angular.forEach(poll.options, function(option) {
        if (option.option === choice) {
          option.votes++;
        }
      });
    }
    return poll;
  };
  
  this.createOptions = function(poll){
    var optionsObject = [];
    angular.forEach(poll.options.split(','), function(value) {
      this.push({"option":value.trim(), "votes": 0});
    }, optionsObject);
    return optionsObject;
  };
  
  return {
      vote: this.vote,
      createOptions: this.createOptions
  };
});