/* global angular app */
'use strict';

app.filter('searchPolls', function(){
  return function(arr, searchString){
    if(!searchString){
      return arr;
    }
    var result = [];
    searchString = searchString.toLowerCase();
    angular.forEach(arr, function(item){
      if(item.title.toLowerCase().indexOf(searchString) !== -1) {
        result.push(item);
      }
    });
    return result;
  };
});

app.filter('orderByVotes', function (VoteSvc) {
  return function (polls) {
    var pollArr = [];
    angular.forEach(polls, function(poll){
      pollArr.push(poll);
    });
    pollArr.sort(function (a, b) {
      return VoteSvc.getTotal(b.options) - VoteSvc.getTotal(a.options);
    });
    return pollArr;
  };
});
